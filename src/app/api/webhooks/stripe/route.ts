import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import type { Stripe } from "stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get("stripe-signature") || "";

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || "",
    );
  } catch (err) {
    const error = err as Error;
    console.error(`Webhook signature verification failed: ${error.message}`);
    return Response.json({ error: error.message }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "checkout.session.completed":
        await handleCheckoutCompleted(
          event.data.object as Stripe.Checkout.Session,
        );
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return Response.json({ received: true });
  } catch (err) {
    const error = err as Error;
    console.error(`Error processing webhook: ${error.message}`);
    return Response.json(
      { error: "Error processing webhook" },
      { status: 500 },
    );
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  // Here you would typically:
  // 1. Create a new member record in your database
  // 2. Send welcome email
  // 3. Set up any additional member resources
  console.log("Subscription created:", subscription.id);
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  // Handle subscription updates:
  // 1. Update member status
  // 2. Handle payment method changes
  // 3. Handle plan changes
  console.log("Subscription updated:", subscription.id);
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  // Handle subscription cancellation:
  // 1. Update member status
  // 2. Send cancellation email
  // 3. Clean up member resources
  console.log("Subscription deleted:", subscription.id);
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  // Handle successful checkout:
  // 1. Verify payment status
  // 2. Create initial member record
  // 3. Send confirmation email
  console.log("Checkout completed:", session.id);
}
