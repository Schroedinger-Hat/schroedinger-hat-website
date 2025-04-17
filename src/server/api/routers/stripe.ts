import { createTRPCRouter, publicProcedure } from "@/server/api/trpc"
import { env } from "@/env.js"
import { z } from "zod"
import { getStripe, isStripeAvailable } from "@/lib/stripe"
import { TRPCError } from "@trpc/server"

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    // browser should use relative url
    return ""
  }

  const port = process.env.PORT ?? 3000

  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return env.VERCEL_PROJECT_PRODUCTION_URL.includes("localhost") ? `http://localhost:${port}` : `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (env.VERCEL_URL) {
    return env.VERCEL_URL.includes("localhost") ? `http://localhost:${port}` : `https://${env.VERCEL_URL}`
  }

  // Fallback for local development
  return `http://localhost:${port}`
}

const membershipFormSchema = z.object({
  name: z.string().min(2),
  surname: z.string().min(2),
  email: z.string().email(),
  codiceFiscale: z
    .string()
    .length(16)
    .regex(/^[A-Z0-9]+$/)
    .optional(),
  nationality: z.string().min(2),
})

// Add this type
type CheckoutResult = { status: "success"; url: string } | { status: "error"; message: string }

function calculateNextBillingDate() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1 // JavaScript months are 0-based

  // If we're between September and December, start billing the year after next
  // Otherwise, start billing next year
  const targetYear = currentMonth >= 9 ? currentYear + 2 : currentYear + 1

  // Set to January 1st 00:00:00 of target year
  return Math.floor(new Date(targetYear, 0, 1).getTime() / 1000)
}

export const stripeRouter = createTRPCRouter({
  createCheckoutSession: publicProcedure
    .input(membershipFormSchema)
    .mutation(async ({ ctx, input }): Promise<CheckoutResult> => {
      try {
        if (!isStripeAvailable()) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "PaymentGateway is not available",
          })
        }

        // Get Stripe instance
        const stripe = getStripe()

        // Check for existing completed membership
        const existingMember = await ctx.db.member.findFirst({
          where: {
            email: input.email,
            status: "COMPLETED",
          },
        })

        if (existingMember) {
          throw new TRPCError({
            code: "CONFLICT",
            message: "A completed membership already exists for this Codice Fiscale",
          })
        }

        // Find or create pending member
        const member = await ctx.db.member.upsert({
          where: {
            email: input.email,
          },
          update: {
            name: input.name,
            surname: input.surname,
            email: input.email,
            nationality: input.nationality,
          },
          create: {
            name: input.name,
            surname: input.surname,
            email: input.email,
            codiceFiscale: input.codiceFiscale,
            nationality: input.nationality,
          },
        })

        const baseUrl = getBaseUrl()

        // Create or get Stripe customer
        let customerId = member.stripeCustomerId
        if (!customerId) {
          const customer = await stripe.customers.create({
            email: input.email,
            name: `${input.name} ${input.surname}`,
            metadata: {
              codiceFiscale: input.codiceFiscale ?? "",
              memberId: member.id,
            },
          })
          customerId = customer.id

          // Update member with Stripe customer ID
          await ctx.db.member.update({
            where: { id: member.id },
            data: { stripeCustomerId: customerId },
          })
        }

        // Calculate next billing cycle date
        const nextBillingDate = calculateNextBillingDate()

        // Create Stripe checkout session
        const session = await stripe.checkout.sessions.create({
          customer: customerId,
          payment_method_types: ["card"],
          line_items: [
            {
              price: env.STRIPE_MEMBERSHIP_PRICE_ID,
              quantity: 1,
            },
          ],
          mode: "subscription",
          success_url: `${baseUrl}/association/join/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${baseUrl}/association/join`,
          subscription_data: {
            metadata: {
              nextBillingYear: new Date(nextBillingDate * 1000).getFullYear(),
              shouldUpdateBillingCycle: "true",
              nextBillingDate: nextBillingDate.toString(),
            },
          },
          metadata: {
            memberId: member.id,
            codiceFiscale: input.codiceFiscale ?? "",
          },
        })

        return {
          status: "success",
          url: session.url ?? "/",
        }
      } catch (error) {
        console.error("Error creating checkout session:", error)
        if (error instanceof TRPCError) {
          throw error
        }
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        })
      }
    }),
})
