// Import PrismaClient for database operations
import { PrismaClient } from "@prisma/client"
import { env } from "@/env"

// Create a new PrismaClient instance with environment-specific logging
const createPrismaClient = (): PrismaClient =>
  new PrismaClient({
    log: env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

// Type the global properly
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Export with explicit PrismaClient type
export const db: PrismaClient = globalForPrisma.prisma ?? createPrismaClient()

// Store the PrismaClient instance on global object in non-production environments
// This ensures we don't exhaust database connections during development
if (env.NODE_ENV !== "production") globalForPrisma.prisma = db
