import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]),
    STRIPE_SECRET_KEY: z.string().min(1),
    STRIPE_MEMBERSHIP_PRICE_ID: z.string().min(1),
    VERCEL_URL: z.string().optional(),
  },

  /**
   * Client-side environment variables schema
   */
  client: {
    NEXT_PUBLIC_SANITY_PROJECT_ID: z.string().min(1),
    NEXT_PUBLIC_SANITY_DATASET: z.string().min(1),
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1),
    NEXT_PUBLIC_GA_ID: z.string().min(1),
  },

  /**
   * Manual destructuring of process.env
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_MEMBERSHIP_PRICE_ID: process.env.STRIPE_MEMBERSHIP_PRICE_ID,
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_GA_ID: process.env.NEXT_PUBLIC_GA_ID,
    VERCEL_URL: process.env.VERCEL_URL,
  },

  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
})
