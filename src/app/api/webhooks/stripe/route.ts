import { getStripe, isStripeAvailable } from "@/lib/stripe"
import { headers } from "next/headers"
import type { Stripe } from "stripe"
import { db } from "@/server/db"

export async function POST(req: Request) {
  if (!isStripeAvailable()) {
    return Response.json({ error: "PaymentGateway is not available" }, { status: 500 })
  }

  const stripe = getStripe()
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get("stripe-signature") ?? ""

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET ?? "")
  } catch (err) {
    const error = err as Error
    console.error(`Webhook signature verification failed: ${error.message}`)
    return Response.json({ error: error.message }, { status: 400 })
  }

  try {
    switch (event.type) {
      case "customer.subscription.created":
        await handleSubscriptionCreated(event.data.object)
        break
      case "customer.subscription.updated":
        await handleSubscriptionUpdated(event.data.object)
        break
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(event.data.object)
        break
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return Response.json({ received: true })
  } catch (err) {
    const error = err as Error
    console.error(`Error processing webhook: ${error.message}`)
    return Response.json({ error: "Error processing webhook" }, { status: 500 })
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const { customer, metadata } = subscription
  if (typeof customer !== "string") return

  // If this subscription should have its billing cycle updated
  if (metadata?.shouldUpdateBillingCycle === "true" && metadata.nextBillingDate) {
    const nextBillingDate = parseInt(metadata.nextBillingDate)

    try {
      const stripe = getStripe()
      await stripe.subscriptions.update(subscription.id, {
        proration_behavior: "none",
        billing_cycle_anchor:
          nextBillingDate as unknown as Stripe.SubscriptionUpdateParams.BillingCycleAnchor,
      })
    } catch (error) {
      console.error("Failed to update subscription billing cycle:", error)
    }
  }

  await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      stripeSubscriptionId: subscription.id,
      status: "COMPLETED",
    },
  })
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { customer, status } = subscription
  if (typeof customer !== "string") return

  // Update member status based on subscription status
  await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      status: status === "active" ? "COMPLETED" : "PENDING",
    },
  })
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { customer } = subscription
  if (typeof customer !== "string") return

  // Mark member as inactive when subscription is cancelled
  await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      status: "PENDING",
      stripeSubscriptionId: null,
    },
  })
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  if (session.mode !== "subscription") return

  const { customer, metadata } = session
  if (!metadata?.memberId || typeof customer !== "string") return

  // Update member with subscription details
  await db.member.update({
    where: { id: metadata.memberId },
    data: {
      stripeCustomerId: customer,
      status: "COMPLETED",
    },
  })
}
