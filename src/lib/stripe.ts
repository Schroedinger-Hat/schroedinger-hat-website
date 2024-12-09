import Stripe from "stripe"
import { env } from "@/env.js"

interface Env {
  STRIPE_SECRET_KEY?: string
  NODE_ENV?: string
}

const typedEnv = env as Partial<Env>

let stripeInstance: Stripe | null = null

export const getStripe = () => {
  if (!typedEnv.STRIPE_SECRET_KEY) {
    throw new Error("Called getStripe() but STRIPE_SECRET_KEY is not defined")
  }

  if (!stripeInstance) {
    stripeInstance = new Stripe(typedEnv.STRIPE_SECRET_KEY, {
      apiVersion: "2024-10-28.acacia",
    })
  }

  return stripeInstance
}

// Utility function to check if Stripe is available
export const isStripeAvailable = () => {
  return !!typedEnv.STRIPE_SECRET_KEY
}
