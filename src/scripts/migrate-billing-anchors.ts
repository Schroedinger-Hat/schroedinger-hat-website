/**
 * Migration script to fix billing cycle anchors for existing subscriptions
 *
 * This script:
 * 1. Fetches all active Stripe subscriptions
 * 2. Filters for subscriptions without billingAlgorithmVersion: "2"
 * 3. Calculates the correct billing cycle anchor based on creation date
 * 4. Updates each subscription with the correct anchor and version metadata
 *
 * Usage:
 *   tsx src/scripts/migrate-billing-anchors.ts
 *
 * IMPORTANT:
 * - Test in Stripe test mode first before running on production data
 * - The script is idempotent - safe to run multiple times
 * - Consider adding a --dry-run flag to preview changes before applying them
 */

import { getStripe } from "../lib/stripe"

async function migrateBillingAnchors() {
  const stripe = getStripe()

  // Fetch all subscriptions
  let hasMore = true
  let startingAfter: string | undefined
  let processedCount = 0
  let updatedCount = 0
  let errorCount = 0

  console.log("Starting billing anchor migration...")
  console.log("=".repeat(60))

  while (hasMore) {
    const subscriptions = await stripe.subscriptions.list({
      limit: 100,
      starting_after: startingAfter,
      status: "active",
    })

    for (const subscription of subscriptions.data) {
      processedCount++

      // Skip if already using version 2 algorithm
      if (subscription.metadata?.billingAlgorithmVersion === "2") {
        console.log(`[${processedCount}] Subscription ${subscription.id}: Already on v2, skipping`)
        continue
      }

      // Calculate correct billing date based on subscription creation
      const createdDate = new Date(subscription.created * 1000)
      const createdYear = createdDate.getFullYear()
      const createdMonth = createdDate.getMonth() + 1 // 0-based to 1-based

      // Apply the algorithm: Oct-Dec gets year+2, Jan-Sep gets year+1
      const targetYear = createdMonth >= 10 ? createdYear + 2 : createdYear + 1
      const correctBillingDate = Math.floor(new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0)).getTime() / 1000)

      console.log(
        `[${processedCount}] Subscription ${subscription.id}:\n` +
          `  Created: ${createdDate.toISOString()}\n` +
          `  Setting anchor to: Jan 1 ${targetYear}`,
      )

      try {
        // Update the subscription
        await stripe.subscriptions.update(subscription.id, {
          billing_cycle_anchor: correctBillingDate as any,
          proration_behavior: "none",
          metadata: {
            ...subscription.metadata,
            billingAlgorithmVersion: "2",
            nextBillingYear: targetYear.toString(),
          },
        })

        updatedCount++
        console.log(`  ✓ Updated successfully\n`)
      } catch (error) {
        errorCount++
        console.error(`  ✗ Failed to update:`, error)
        console.log()
      }
    }

    hasMore = subscriptions.has_more
    if (hasMore && subscriptions.data.length > 0) {
      startingAfter = subscriptions.data[subscriptions.data.length - 1]!.id
    }
  }

  console.log("=".repeat(60))
  console.log("=== Migration Complete ===")
  console.log(`Total processed: ${processedCount}`)
  console.log(`Updated: ${updatedCount}`)
  console.log(`Errors: ${errorCount}`)
  console.log(`Skipped (already v2): ${processedCount - updatedCount - errorCount}`)
  console.log("=".repeat(60))
}

// Run the migration
migrateBillingAnchors()
  .then(() => {
    console.log("\n✓ Migration script finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.error("\n✗ Migration script failed:", error)
    process.exit(1)
  })
