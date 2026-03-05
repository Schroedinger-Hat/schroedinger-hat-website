# Membership Feature

Schrödinger Hat is a nonprofit Italian association. This document covers the full membership lifecycle: creation, payment, webhook processing, annual renewal, and cleanup. It is intended as a reference for anyone working on this feature in the future.

**Price:** €24/year
**Tech stack involved:** Next.js App Router, tRPC, Stripe (subscriptions), Prisma + PostgreSQL, Resend (email), Vercel Cron

There is **no authentication layer** in this flow — it is entirely public. Membership state is tracked in the database and driven by Stripe subscription events.

---

## Data model

**File:** `prisma/schema.prisma`

```prisma
model Member {
    id                   String   @id @default(cuid())
    name                 String
    surname              String
    email                String   @unique
    codiceFiscale        String?
    nationality          String
    status               String   @default("PENDING") // PENDING | COMPLETED | REJECTED
    stripeCustomerId     String?  @unique
    stripeSubscriptionId String?
    createdAt            DateTime @default(now())
    updatedAt            DateTime @updatedAt
}
```

### Status values

| Status      | Meaning                                                                 |
| ----------- | ----------------------------------------------------------------------- |
| `PENDING`   | Record created, checkout not completed (or subscription not yet active) |
| `COMPLETED` | Stripe subscription is `active` — member is in good standing            |
| `REJECTED`  | Subscription cancelled or deleted — membership is no longer valid       |

### Italian compliance

The `codiceFiscale` field stores the Italian fiscal code. It is required for members with `nationality = "it"`, must be exactly 16 characters, and may only contain uppercase letters and digits (`/^[A-Z0-9]+$/`). Non-Italian members leave it null.

---

## Membership creation flow

**Key files:**

- Form: `src/app/(website)/association/join/components/membership-form-modal.tsx`
- Server mutation: `src/server/api/routers/stripe.ts` → `stripe.createCheckoutSession`
- Success page: `src/app/(website)/association/join/success/page.tsx`

### Step-by-step

1. User visits `/association/join` and opens the `MembershipFormModal`.
2. User fills in: `name`, `surname`, `email`, `nationality`, and `codiceFiscale` (required only for Italian nationals).
3. User accepts terms and submits → client calls the tRPC mutation `stripe.createCheckoutSession`.
4. **Server-side checks and setup:**
   - If a `COMPLETED` member already exists for that email → throw `CONFLICT` (prevents duplicates).
   - Upsert `Member` record with `status = PENDING`. On re-attempt (e.g., user abandoned checkout), personal data is updated but the record is reused.
   - If no `stripeCustomerId` exists: create a Stripe Customer and persist the ID.
   - Calculate the next billing date (see [Billing cycle algorithm](#billing-cycle-algorithm)).
   - Create a Stripe Checkout Session in `subscription` mode using `STRIPE_MEMBERSHIP_PRICE_ID`.
5. Server returns the Stripe-hosted checkout URL; client redirects the user there.
6. User enters payment details and completes checkout on Stripe's page.
7. Stripe fires webhook events (see [Webhook events](#webhook-events)).
8. User is redirected to `/association/join/success?session_id=...`, which retrieves their email from the Stripe session and shows a confirmation screen.

---

## Billing cycle algorithm

**File:** `src/server/api/routers/stripe.ts` → `calculateNextBillingDate()`

All memberships renew on **January 1st**. The algorithm determines which January 1st to use as the `billing_cycle_anchor` for the Stripe subscription:

```
signup month Oct–Dec  →  anchor = Jan 1st of (currentYear + 2)
signup month Jan–Sep  →  anchor = Jan 1st of (currentYear + 1)
```

The October–December buffer exists to avoid charging someone who signs up in late Q4 only weeks before the next Jan 1st renewal date.

`Date.UTC` is used explicitly to prevent timezone-related off-by-one errors.

```ts
function calculateNextBillingDate() {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth() + 1

  const targetYear = currentMonth >= 10 ? currentYear + 2 : currentYear + 1
  return Math.floor(new Date(Date.UTC(targetYear, 0, 1, 0, 0, 0)).getTime() / 1000)
}
```

`proration_behavior: "none"` is set on the subscription, meaning the user pays the full price at checkout and then again on every Jan 1st thereafter.

The subscription metadata includes:

```json
{
  "billingAlgorithmVersion": "2",
  "nextBillingYear": "2027",
  "memberId": "<cuid>"
}
```

`billingAlgorithmVersion: "2"` is used by the [migration script](#migration-script) to identify subscriptions already on the corrected algorithm.

---

## Webhook events

**File:** `src/app/api/webhooks/stripe/route.ts`

**Endpoint:** `POST /api/webhooks/stripe`

All incoming events are verified with `stripe.webhooks.constructEvent` using `STRIPE_WEBHOOK_SECRET` before processing.

### Handled events

| Event                           | Handler                     | Effect                                                                                                           |
| ------------------------------- | --------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `customer.subscription.created` | `handleSubscriptionCreated` | Sets `stripeSubscriptionId` on the member; keeps `status = PENDING`                                              |
| `customer.subscription.updated` | `handleSubscriptionUpdated` | Sets `status = COMPLETED` if `subscription.status === "active"`, else `PENDING`; sends welcome email on `active` |
| `customer.subscription.deleted` | `handleSubscriptionDeleted` | Sets `status = REJECTED`; clears `stripeSubscriptionId`                                                          |

> **Note:** `handleSubscriptionUpdated` sends the welcome email whenever `status` transitions to `active`. This fires during initial activation and could also fire on annual renewal if Stripe emits a `subscription.updated` event with `status: active` after a successful renewal payment. There is currently no deduplication guard on the email send.

---

## Email notifications

**Files:**

- `src/server/email.tsx` → `sendMembershipSignupEmail(firstName, email)`
- `src/emails/membership-signup.tsx` → React Email template

**Service:** Resend (`RESEND_API_KEY`)
**From:** `Schrödinger Hat <hello@schroedinger-hat.org>`

The welcome email is sent when `customer.subscription.updated` fires with `subscription.status === "active"`. It contains:

- Personalised welcome greeting
- Explanation of the two-step approval process (payment first, then review by association members)
- Expectation on membership number delivery (manual, within weeks)
- Links to events and shop

**No renewal email** is sent on subsequent annual renewals — only the initial activation email exists today.

---

## Renewal flow

Annual renewals are handled **entirely by Stripe** through its subscription billing engine. No application code needs to run proactively.

1. On Jan 1st, Stripe attempts to charge the customer's card on file.
2. **If payment succeeds:** Stripe fires `customer.subscription.updated` with `status: active` → member `status` stays (or returns to) `COMPLETED`.
3. **If payment fails:** Stripe retries according to its Smart Retries settings. If all retries fail, Stripe fires `customer.subscription.deleted` → member `status` set to `REJECTED`.

There is no application-level renewal UI, manual renewal process, or scheduled job for renewals. Everything is driven by the Stripe subscription and the webhook handler.

---

## Cleanup cron job

**File:** `src/app/api/cron/health-check/route.ts`
**Schedule:** `0 0 * * *` (daily at midnight UTC) — configured in `vercel.json`

This job deletes `Member` records that have been stuck in `PENDING` for more than 14 days. These are members who started checkout but never completed payment (abandoned checkouts).

Results are logged to the `Health` table:

```prisma
model Health {
    id             Int      @id @default(autoincrement())
    date           DateTime @default(now())
    deletedRecords Int
    error          String?  @db.Text
    createdAt      DateTime @default(now())
}
```

**Auth:** In production (`VERCEL_ENV === "production"`), requires `Authorization: Bearer <CRON_SECRET>`. Not enforced in development.

---

## Required environment variables

| Variable                                       | Required        | Description                                        |
| ---------------------------------------------- | --------------- | -------------------------------------------------- |
| `STRIPE_SECRET_KEY`                            | Production only | Stripe secret key                                  |
| `STRIPE_MEMBERSHIP_PRICE_ID`                   | Always          | Stripe Price ID for the annual membership product  |
| `STRIPE_WEBHOOK_SECRET`                        | Production only | Webhook endpoint signing secret                    |
| `RESEND_API_KEY`                               | Production only | Resend API key for sending emails                  |
| `DATABASE_URL`                                 | Always          | PostgreSQL connection string                       |
| `CRON_SECRET`                                  | Production only | Protects the cron endpoint from unauthorized calls |
| `VERCEL_URL` / `VERCEL_PROJECT_PRODUCTION_URL` | Deployment      | Used to build redirect URLs in checkout sessions   |

`STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, and `RESEND_API_KEY` are optional in development (the app runs without Stripe/email functionality when not set) but are required in production via `isRequiredInProduction` validators in `src/env.js`.

---

## Migration script

**File:** `src/scripts/migrate-billing-anchors.ts`
**Run with:** `tsx src/scripts/migrate-billing-anchors.ts`

This one-time script was written as part of the `bugfix/subscription-renewal` fix to backfill correct billing anchors onto subscriptions that were created with the previous (buggy) algorithm.

It iterates all active Stripe subscriptions, skips those already marked `billingAlgorithmVersion: "2"`, recalculates the correct anchor using the same algorithm as `calculateNextBillingDate()`, and updates each subscription in Stripe.

**It is idempotent** — safe to run multiple times. Always test against Stripe test mode before running on production.

---

## Key files reference

| File                                                                      | Purpose                                                     |
| ------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `prisma/schema.prisma`                                                    | `Member` and `Health` data models                           |
| `src/server/api/routers/stripe.ts`                                        | tRPC mutation: checkout session creation, billing algorithm |
| `src/app/api/webhooks/stripe/route.ts`                                    | Stripe webhook handler (subscription lifecycle)             |
| `src/app/(website)/association/join/components/membership-form-modal.tsx` | Membership signup form (client component)                   |
| `src/app/(website)/association/join/success/page.tsx`                     | Post-checkout confirmation page                             |
| `src/app/api/cron/health-check/route.ts`                                  | Daily cron: cleanup abandoned PENDING members               |
| `src/server/email.tsx`                                                    | Email sending utility (`sendMembershipSignupEmail`)         |
| `src/emails/membership-signup.tsx`                                        | Welcome email React template                                |
| `src/scripts/migrate-billing-anchors.ts`                                  | One-time billing anchor migration script                    |
| `src/lib/stripe.ts`                                                       | Stripe client initialisation                                |
| `src/env.js`                                                              | Environment variable schema and validation                  |
| `vercel.json`                                                             | Cron job schedule configuration                             |

---

## Known history and past bugs

### `bugfix/subscription-renewal` (merged March 2026)

**Bug 1 — Wrong month threshold:** The original algorithm used `currentMonth >= 9` (September) as the cutoff, which incorrectly pushed September signups to `currentYear + 2` instead of `currentYear + 1`. Fixed to `>= 10` (October).

**Bug 2 — Missing UTC:** The original `new Date(targetYear, 0, 1)` call used local time, causing the billing anchor to land on Dec 31st in UTC for servers in UTC+ timezones. Fixed to `Date.UTC(targetYear, 0, 1, 0, 0, 0)`.

**Removed — webhook billing cycle update:** An earlier version of the webhook handler attempted to re-update `billing_cycle_anchor` inside `handleSubscriptionUpdated` using a `shouldUpdateBillingCycle` metadata flag. This was incorrect: the anchor must be set at subscription creation time, not on updates. The code was removed.

**Added — migration script:** `src/scripts/migrate-billing-anchors.ts` was introduced to retroactively apply the corrected algorithm to all existing active subscriptions. Subscriptions are identified as already-migrated via `billingAlgorithmVersion: "2"` in their metadata.
