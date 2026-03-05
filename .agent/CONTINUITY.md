# CONTINUITY

## [PLANS]

### 2026-03-03T16:48Z [USER]
Plan: Membership period history + re-subscription fix
- Add `MembershipPeriod` table to track all successful invoice payments
- Fix `codiceFiscale @unique` blocking REJECTED members from re-subscribing
- Set up Vitest test infrastructure
- Extract webhook handlers to testable module

## [DECISIONS]

### 2026-03-03T16:48Z [CODE]
Installed `vitest@3` (not @2) to avoid `esbuild@0.21.5` OSV advisory pulled in by vitest@2/vite@5.

### 2026-03-03T16:48Z [CODE]
Used `vi.useFakeTimers` in stripe router tests to avoid 100–500 ms delay from tRPC timing middleware (which runs in `NODE_ENV !== "production"`). Rejection tests attach the `.rejects` handler before `vi.runAllTimersAsync()` to prevent Node.js unhandled-rejection warnings.

### 2026-03-03T16:48Z [CODE]
Set `SKIP_ENV_VALIDATION=true` in `vitest.config.ts` env so env.js module imports succeed without DATABASE_URL / CRON_SECRET in the test environment.

## [PROGRESS]

### 2026-03-03T16:48Z [CODE]
All 6 tasks completed:
1. Vitest config + package.json scripts ✓
2. `MembershipPeriod` schema + migration SQL ✓
3. `handlers.ts` extracted; `handleInvoicePaymentSucceeded` added ✓
4. `route.ts` thin dispatcher with `invoice.payment_succeeded` case ✓
5. Re-subscription lookup fixed in `stripe.ts` (findUnique by email then CF) ✓
6. 12 unit tests, all passing ✓
7. `.features/membership.md` updated ✓

## [OUTCOMES]

### 2026-03-03T16:48Z [CODE]
Feature: membership-period-history + resubscription-fix

**Implemented:**
- `MembershipPeriod` model in Prisma schema + migration `20260303120000_add_membership_period`
- `handleInvoicePaymentSucceeded` in `handlers.ts` — creates one `MembershipPeriod` row per successful Stripe invoice (idempotent via `stripeInvoiceId @unique`)
- Re-subscription flow in `stripe.ts`: lookup by email then CF; block only `COMPLETED`; reuse `PENDING`/`REJECTED` records
- 12 unit tests covering all plan scenarios

**Manual verification still needed:**
- `npx prisma migrate deploy` to apply SQL migration against actual DB
- Fire `invoice.payment_succeeded` via Stripe CLI → verify row in `MembershipPeriod`
- Fire same event twice → second call is no-op (unique constraint idempotency)
- REJECTED member re-subscribes → existing record updated, checkout proceeds
