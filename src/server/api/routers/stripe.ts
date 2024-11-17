import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure.mutation(async () => {
    const headersList = await headers();
    const host = headersList.get("host") ?? "";
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

    return { url: session.url };
  }),
});
