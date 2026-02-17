import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase();
  const resend = getResend();

  try {
    const { email, locale } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    if (!normalizedEmail.includes("@") || normalizedEmail.length > 254) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        {
          email: normalizedEmail,
          locale: locale || "en",
          subscribed_at: new Date().toISOString(),
        },
        { onConflict: "email" }
      );

    if (dbError) {
      console.error("Newsletter DB error:", dbError);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    await resend.emails.send({
      from: "falavra <noreply@falavra.com>",
      to: normalizedEmail,
      subject:
        locale === "pt-BR"
          ? "Bem-vindo à newsletter do falavra!"
          : "Welcome to the falavra newsletter!",
      html:
        locale === "pt-BR"
          ? `
          <h1>Obrigado por se inscrever!</h1>
          <p>Você receberá atualizações sobre novos recursos, dicas e ofertas especiais do falavra.</p>
          <p>Enquanto isso, <a href="https://falavra.com">visite nosso site</a> para baixar o falavra.</p>
          <p style="color: #666; font-size: 12px; margin-top: 32px;">
            Você está recebendo este email porque se inscreveu na newsletter do falavra.
          </p>
        `
          : `
          <h1>Thanks for subscribing!</h1>
          <p>You'll receive updates about new features, tips, and special offers from falavra.</p>
          <p>In the meantime, <a href="https://falavra.com">visit our site</a> to download falavra.</p>
          <p style="color: #666; font-size: 12px; margin-top: 32px;">
            You're receiving this email because you subscribed to the falavra newsletter.
          </p>
        `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
