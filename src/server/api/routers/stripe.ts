import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-10-28.acacia",
});

const getBaseUrl = () => {
  if (env.VERCEL_URL) {
    return `https://${env.VERCEL_URL}`;
  }
  // Fallback for local development
  return "http://localhost:3000";
};

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure.mutation(async () => {
    try {
      const baseUrl = getBaseUrl();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: env.STRIPE_MEMBERSHIP_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/associazione/diventa-socio`,
      });

      return { url: session.url };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  }),
});
