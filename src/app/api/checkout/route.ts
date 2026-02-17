import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY!);
}

function getPriceId(locale?: string): string {
  if (locale === "pt-BR") {
    return process.env.STRIPE_FALAVRA_PRICE_ID_BRL || process.env.STRIPE_FALAVRA_PRICE_ID_USD!;
  }
  return process.env.STRIPE_FALAVRA_PRICE_ID_USD!;
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const { email, locale } = await request.json();

    if (email && (typeof email !== "string" || !email.includes("@") || email.length > 254)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (locale && !["en", "pt-BR"].includes(locale)) {
      return NextResponse.json({ error: "Invalid locale" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: getPriceId(locale),
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      customer_email: email || undefined,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://falavra.com"}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || "https://falavra.com"}/pricing`,
      metadata: {
        product: "falavra-pro",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
