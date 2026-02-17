import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

function generateLicenseKey(majorVersion: number = 1): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const segments = Array.from({ length: 4 }, () =>
    Array.from(
      { length: 4 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("")
  );
  return `FV${majorVersion}-${segments.join("-")}`;
}

export async function POST(request: NextRequest) {
  const stripe = getStripe();
  const supabase = getSupabase();
  const resend = getResend();

  const body = await request.text();
  const signature = request.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    console.error("Webhook signature verification failed");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`[stripe-webhook] Received event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    console.log(`[stripe-webhook] payment_status: ${session.payment_status}`);

    if (session.payment_status === "paid" || session.payment_status === "no_payment_required") {
      const email = session.customer_email!;
      const customerId = session.customer as string;
      const paymentIntentId = (session.payment_intent as string) || null;

      let licenseKey: string;
      let attempts = 0;
      do {
        licenseKey = generateLicenseKey(1);
        const { data } = await supabase
          .from("licenses")
          .select("id")
          .eq("license_key", licenseKey)
          .single();
        if (!data) break;
        attempts++;
      } while (attempts < 10);

      const { error } = await supabase.from("licenses").insert({
        license_key: licenseKey,
        email,
        major_version: 1,
        stripe_payment_intent_id: paymentIntentId,
        stripe_customer_id: customerId,
      });

      if (error) {
        console.error("Failed to create license:", error);
        return NextResponse.json(
          { error: "Failed to create license" },
          { status: 500 }
        );
      }

      try {
        await resend.emails.send({
          from: "falavra <noreply@falavra.com>",
          to: email,
          subject: "Your falavra License Key",
          html: `
            <h1>Thank you for purchasing falavra Pro!</h1>
            <p>Your license key is:</p>
            <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 24px; text-align: center; margin: 20px 0;">
              ${licenseKey}
            </div>
            <p>To activate:</p>
            <ol>
              <li>Open falavra</li>
              <li>Click Settings &rarr; Enter License Key</li>
              <li>Paste your key and click Activate</li>
            </ol>
            <p>This license is valid for falavra v1.x on up to 3 devices.</p>
            <p>Questions? Reply to this email.</p>
          `,
        });
        console.log(`[stripe-webhook] License email sent to ${email}`);
      } catch (emailError) {
        console.error("[stripe-webhook] Failed to send license email:", emailError);
      }

      console.log(`[stripe-webhook] License created for ${email}: ${licenseKey}`);
    }
  } else {
    console.log(`[stripe-webhook] Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
