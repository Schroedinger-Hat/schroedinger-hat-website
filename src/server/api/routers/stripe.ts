import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { env } from "@/env";
import Stripe from "stripe";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-10-28.acacia",
});

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure.mutation(async () => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: env.STRIPE_MEMBERSHIP_PRICE_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${env.NEXT_PUBLIC_APP_URL}/associazione/diventa-socio`,
      });

      return { url: session.url };
    } catch (error) {
      console.error("Error creating checkout session:", error);
      throw new Error("Failed to create checkout session");
    }
  }),
});
