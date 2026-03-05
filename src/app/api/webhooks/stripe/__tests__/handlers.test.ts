import { describe, it, expect, vi, beforeEach } from "vitest"
import type { Stripe } from "stripe"

vi.mock("@/server/db", () => ({
  db: {
    member: { findUnique: vi.fn(), update: vi.fn() },
    membershipPeriod: { create: vi.fn() },
  },
}))

vi.mock("@/server/email", () => ({
  sendMembershipSignupEmail: vi.fn(),
}))

import {
  handleInvoicePaymentSucceeded,
  handleSubscriptionCreated,
  handleSubscriptionUpdated,
  handleSubscriptionDeleted,
} from "../handlers"
import { db } from "@/server/db"
import { sendMembershipSignupEmail } from "@/server/email"

const mockMemberFindUnique = vi.mocked(db.member.findUnique)
const mockMemberUpdate = vi.mocked(db.member.update)
const mockMembershipPeriodCreate = vi.mocked(db.membershipPeriod.create)
const mockSendEmail = vi.mocked(sendMembershipSignupEmail)

// ─── Factories ───────────────────────────────────────────────────────────────

// period_start = 2024-01-01T00:00:00Z (1704067200)
// period_end   = 2025-01-01T00:00:00Z (1735689600)  → year = 2025
const DEFAULT_PERIOD_START = 1704067200
const DEFAULT_PERIOD_END = 1735689600

function makeInvoice(
  overrides: Partial<{
    customer: string | null
    subscription: string | null
    id: string
    amount_paid: number
    billing_reason: string | null
    lines: { data: { period: { start: number; end: number } }[] }
  }> = {},
): Stripe.Invoice {
  return {
    customer: "cus_test123",
    subscription: "sub_test456",
    id: "in_test789",
    amount_paid: 2400,
    billing_reason: "subscription_create",
    lines: {
      data: [{ period: { start: DEFAULT_PERIOD_START, end: DEFAULT_PERIOD_END } }],
    },
    ...overrides,
  } as unknown as Stripe.Invoice
}

function makeSubscription(
  overrides: Partial<{
    customer: string | object
    status: string
    id: string
  }> = {},
): Stripe.Subscription {
  return {
    customer: "cus_test123",
    status: "active",
    id: "sub_test456",
    ...overrides,
  } as unknown as Stripe.Subscription
}

// ─── handleInvoicePaymentSucceeded ───────────────────────────────────────────

describe("handleInvoicePaymentSucceeded", () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("creates a MembershipPeriod row on successful invoice", async () => {
    const member = { id: "mem_abc", email: "test@example.com" }
    mockMemberFindUnique.mockResolvedValue(member as never)
    mockMembershipPeriodCreate.mockResolvedValue({} as never)

    await handleInvoicePaymentSucceeded(makeInvoice())

    expect(mockMembershipPeriodCreate).toHaveBeenCalledWith({
      data: expect.objectContaining({
        memberId: "mem_abc",
        year: 2025,
        stripeInvoiceId: "in_test789",
        stripeSubscriptionId: "sub_test456",
        amountPaid: 2400,
        billingReason: "subscription_create",
      }),
    })
  })

  it("skips when customer is missing from invoice", async () => {
    await handleInvoicePaymentSucceeded(makeInvoice({ customer: null }))

    expect(mockMemberFindUnique).not.toHaveBeenCalled()
    expect(mockMembershipPeriodCreate).not.toHaveBeenCalled()
  })

  it("skips when no Member found for that stripeCustomerId", async () => {
    mockMemberFindUnique.mockResolvedValue(null)

    await handleInvoicePaymentSucceeded(makeInvoice())

    expect(mockMembershipPeriodCreate).not.toHaveBeenCalled()
  })

  it("skips when invoice has no line items", async () => {
    const member = { id: "mem_abc" }
    mockMemberFindUnique.mockResolvedValue(member as never)

    await handleInvoicePaymentSucceeded(makeInvoice({ lines: { data: [] } }))

    expect(mockMembershipPeriodCreate).not.toHaveBeenCalled()
  })

  it("sets year from UTC year of period_end (2026-01-01T00:00:00Z → year 2026)", async () => {
    const member = { id: "mem_abc" }
    mockMemberFindUnique.mockResolvedValue(member as never)
    mockMembershipPeriodCreate.mockResolvedValue({} as never)

    // period_end = 2026-01-01T00:00:00Z (Unix: 1767225600)
    await handleInvoicePaymentSucceeded(
      makeInvoice({ lines: { data: [{ period: { start: 1735689600, end: 1767225600 } }] } }),
    )

    expect(mockMembershipPeriodCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ year: 2026 }),
      }),
    )
  })

  it("sets billingReason to 'unknown' when billing_reason is null", async () => {
    const member = { id: "mem_abc" }
    mockMemberFindUnique.mockResolvedValue(member as never)
    mockMembershipPeriodCreate.mockResolvedValue({} as never)

    await handleInvoicePaymentSucceeded(makeInvoice({ billing_reason: null }))

    expect(mockMembershipPeriodCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ billingReason: "unknown" }),
      }),
    )
  })
})

// ─── handleSubscriptionCreated ────────────────────────────────────────────────

describe("handleSubscriptionCreated", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockMemberUpdate.mockResolvedValue({} as never)
  })

  it("sets stripeSubscriptionId and status=PENDING on the member", async () => {
    await handleSubscriptionCreated(makeSubscription({ customer: "cus_abc", id: "sub_abc" }))

    expect(mockMemberUpdate).toHaveBeenCalledWith({
      where: { stripeCustomerId: "cus_abc" },
      data: { stripeSubscriptionId: "sub_abc", status: "PENDING" },
    })
  })

  it("skips when customer is not a string (object customer)", async () => {
    await handleSubscriptionCreated(makeSubscription({ customer: { id: "cus_obj" } }))

    expect(mockMemberUpdate).not.toHaveBeenCalled()
  })
})

// ─── handleSubscriptionUpdated ────────────────────────────────────────────────

describe("handleSubscriptionUpdated", () => {
  const activeMemberRecord = { email: "mario@example.com", name: "Mario" }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it("sets status=COMPLETED when subscription becomes active", async () => {
    mockMemberUpdate.mockResolvedValue(activeMemberRecord as never)

    await handleSubscriptionUpdated(makeSubscription({ customer: "cus_abc", status: "active" }))

    expect(mockMemberUpdate).toHaveBeenCalledWith({
      where: { stripeCustomerId: "cus_abc" },
      data: { status: "COMPLETED" },
    })
  })

  it("sets status=PENDING when subscription is not active", async () => {
    mockMemberUpdate.mockResolvedValue({ email: null, name: "Mario" } as never)

    await handleSubscriptionUpdated(makeSubscription({ customer: "cus_abc", status: "past_due" }))

    expect(mockMemberUpdate).toHaveBeenCalledWith({
      where: { stripeCustomerId: "cus_abc" },
      data: { status: "PENDING" },
    })
  })

  it("sends welcome email when subscription becomes active", async () => {
    mockMemberUpdate.mockResolvedValue(activeMemberRecord as never)
    mockSendEmail.mockResolvedValue(undefined as never)

    await handleSubscriptionUpdated(makeSubscription({ customer: "cus_abc", status: "active" }))

    expect(mockSendEmail).toHaveBeenCalledWith("Mario", "mario@example.com")
  })

  it("does not send email when subscription is not active", async () => {
    mockMemberUpdate.mockResolvedValue(activeMemberRecord as never)

    await handleSubscriptionUpdated(makeSubscription({ customer: "cus_abc", status: "past_due" }))

    expect(mockSendEmail).not.toHaveBeenCalled()
  })

  it("swallows email send failures without throwing", async () => {
    mockMemberUpdate.mockResolvedValue(activeMemberRecord as never)
    mockSendEmail.mockRejectedValue(new Error("SMTP unavailable"))

    await expect(
      handleSubscriptionUpdated(makeSubscription({ customer: "cus_abc", status: "active" })),
    ).resolves.toBeUndefined()
  })

  it("skips when customer is not a string (object customer)", async () => {
    await handleSubscriptionUpdated(makeSubscription({ customer: { id: "cus_obj" }, status: "active" }))

    expect(mockMemberUpdate).not.toHaveBeenCalled()
  })
})

// ─── handleSubscriptionDeleted ────────────────────────────────────────────────

describe("handleSubscriptionDeleted", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockMemberUpdate.mockResolvedValue({} as never)
  })

  it("sets status=REJECTED and clears stripeSubscriptionId", async () => {
    await handleSubscriptionDeleted(makeSubscription({ customer: "cus_abc" }))

    expect(mockMemberUpdate).toHaveBeenCalledWith({
      where: { stripeCustomerId: "cus_abc" },
      data: { status: "REJECTED", stripeSubscriptionId: null },
    })
  })

  it("skips when customer is not a string (object customer)", async () => {
    await handleSubscriptionDeleted(makeSubscription({ customer: { id: "cus_obj" } }))

    expect(mockMemberUpdate).not.toHaveBeenCalled()
  })
})
