import { db } from "@/server/db"
import { sendMembershipSignupEmail } from "@/server/email"
import type { Stripe } from "stripe"

export async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  const { customer } = subscription
  if (typeof customer !== "string") return

  await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      stripeSubscriptionId: subscription.id,
      status: "PENDING",
    },
  })
}

export async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const { customer, status } = subscription
  if (typeof customer !== "string") return

  const member = await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      status: status === "active" ? "COMPLETED" : "PENDING",
    },
  })

  if (status === "active") {
    if (member.email) {
      try {
        await sendMembershipSignupEmail(member.name ?? "", member.email)
      } catch (error) {
        console.error("Failed to send welcome email:", error)
      }
    }
  }
}

export async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const { customer } = subscription
  if (typeof customer !== "string") return

  await db.member.update({
    where: { stripeCustomerId: customer },
    data: {
      status: "REJECTED",
      stripeSubscriptionId: null,
    },
  })
}

export async function handleInvoicePaymentSucceeded(invoice: Stripe.Invoice) {
  const customer =
    typeof invoice.customer === "string" ? invoice.customer : invoice.customer?.id
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id

  if (!customer || !subscriptionId) return

  const member = await db.member.findUnique({ where: { stripeCustomerId: customer } })
  if (!member) return

  const line = invoice.lines.data[0]
  if (!line) return

  const periodStart = new Date(line.period.start * 1000)
  const periodEnd = new Date(line.period.end * 1000)
  const year = periodEnd.getUTCFullYear()

  await db.membershipPeriod.create({
    data: {
      memberId: member.id,
      year,
      stripeInvoiceId: invoice.id,
      stripeSubscriptionId: subscriptionId,
      amountPaid: invoice.amount_paid,
      periodStart,
      periodEnd,
      billingReason: invoice.billing_reason ?? "unknown",
    },
  })
}
