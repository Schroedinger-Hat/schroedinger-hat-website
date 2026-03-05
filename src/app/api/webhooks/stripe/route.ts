import { getStripe, isStripeAvailable } from "@/lib/stripe"
import { headers } from "next/headers"
import type { Stripe } from "stripe"
import { env } from "@/env"
import {
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
  handleInvoicePaymentSucceeded,
} from "./handlers"

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
    event = stripe.webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET ?? "")
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
      case "invoice.payment_succeeded":
        await handleInvoicePaymentSucceeded(event.data.object)
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
