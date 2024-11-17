import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export async function POST() {
  try {
    const headersList = await headers();
    const host = headersList.get("host") || "";
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "sepa_debit"],
      line_items: [
        {
          price: process.env.STRIPE_MEMBERSHIP_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${protocol}://${host}/associazione/diventa-socio/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${protocol}://${host}/associazione/diventa-socio/cancel`,
      metadata: {
        type: "membership",
      },
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return Response.json(
      { error: "Error creating checkout session" },
      { status: 500 },
    );
  }
}
