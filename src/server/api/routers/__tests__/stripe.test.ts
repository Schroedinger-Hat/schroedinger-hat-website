import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { TRPCError } from "@trpc/server"

vi.mock("@/lib/stripe", () => ({
  isStripeAvailable: vi.fn(),
  getStripe: vi.fn(),
}))

import { createCallerFactory } from "@/server/api/trpc"
import { stripeRouter } from "@/server/api/routers/stripe"
import { isStripeAvailable, getStripe } from "@/lib/stripe"

const createCaller = createCallerFactory(stripeRouter)

// Shared mock member shape
const baseMember = {
  id: "mem_123",
  name: "Mario",
  surname: "Rossi",
  email: "mario@example.com",
  codiceFiscale: "RSSMRA80A01H501U",
  status: "COMPLETED",
  stripeCustomerId: "cus_existing",
  stripeSubscriptionId: "sub_existing",
  nationality: "it",
  createdAt: new Date(),
  updatedAt: new Date(),
}

// Standard valid input for Italian member
const validInput = {
  name: "Mario",
  surname: "Rossi",
  email: "mario@example.com",
  codiceFiscale: "RSSMRA80A01H501U",
  nationality: "it",
}

// Typed mock db – only the methods used by createCheckoutSession
const mockDb = {
  member: {
    findUnique: vi.fn(),
    update: vi.fn(),
    create: vi.fn(),
  },
}

function makeCaller() {
  return createCaller({ db: mockDb as never, headers: new Headers() })
}

describe("createCheckoutSession – lookup and access logic", () => {
  beforeEach(() => {
    vi.useFakeTimers({ now: new Date("2026-03-03").getTime() })
    vi.resetAllMocks()

    // Stripe is available by default
    vi.mocked(isStripeAvailable).mockReturnValue(true)
    vi.mocked(getStripe).mockReturnValue({
      customers: { create: vi.fn().mockResolvedValue({ id: "cus_new" }) },
      checkout: {
        sessions: { create: vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/pay/test" }) },
      },
    } as never)

    // DB defaults – overridden per-test
    mockDb.member.update.mockResolvedValue(baseMember)
    mockDb.member.create.mockResolvedValue({ ...baseMember, id: "mem_new", status: "PENDING" })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function callMutation(input = validInput) {
    const promise = makeCaller().createCheckoutSession(input)
    await vi.runAllTimersAsync()
    return promise
  }

  it("blocks COMPLETED member found by email", async () => {
    mockDb.member.findUnique.mockResolvedValueOnce({ ...baseMember, status: "COMPLETED" })

    // Attach rejection handler before advancing fake timers to avoid Node.js warning
    const expectation = expect(makeCaller().createCheckoutSession(validInput)).rejects.toSatisfy(
      (e: unknown) => e instanceof TRPCError && e.code === "CONFLICT",
    )
    await vi.runAllTimersAsync()
    await expectation
  })

  it("blocks COMPLETED member found by CF when email is unknown", async () => {
    mockDb.member.findUnique
      .mockResolvedValueOnce(null) // email lookup → miss
      .mockResolvedValueOnce({ ...baseMember, status: "COMPLETED" }) // CF lookup → hit

    const expectation = expect(makeCaller().createCheckoutSession(validInput)).rejects.toSatisfy(
      (e: unknown) => e instanceof TRPCError && e.code === "CONFLICT",
    )
    await vi.runAllTimersAsync()
    await expectation
  })

  it("allows REJECTED member to re-subscribe using the same email", async () => {
    const rejected = { ...baseMember, status: "REJECTED" }
    mockDb.member.findUnique.mockResolvedValueOnce(rejected)
    mockDb.member.update.mockResolvedValue(rejected)

    const result = await callMutation()

    expect(result.status).toBe("success")
    expect(mockDb.member.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: rejected.id } }),
    )
    expect(mockDb.member.create).not.toHaveBeenCalled()
  })

  it("allows REJECTED member to re-subscribe with a different email but same CF", async () => {
    const rejected = { ...baseMember, status: "REJECTED", email: "old@example.com" }
    mockDb.member.findUnique
      .mockResolvedValueOnce(null) // email lookup → miss
      .mockResolvedValueOnce(rejected) // CF lookup → hit

    mockDb.member.update.mockResolvedValue(rejected)

    const result = await callMutation()

    expect(result.status).toBe("success")
    expect(mockDb.member.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: rejected.id } }),
    )
    expect(mockDb.member.create).not.toHaveBeenCalled()
  })

  it("allows PENDING member to re-attempt checkout", async () => {
    const pending = { ...baseMember, status: "PENDING" }
    mockDb.member.findUnique.mockResolvedValueOnce(pending)
    mockDb.member.update.mockResolvedValue(pending)

    const result = await callMutation()

    expect(result.status).toBe("success")
    expect(mockDb.member.update).toHaveBeenCalledWith(
      expect.objectContaining({ where: { id: pending.id } }),
    )
    expect(mockDb.member.create).not.toHaveBeenCalled()
  })

  it("creates a new member when no existing record is found", async () => {
    const newMember = { ...baseMember, id: "mem_new", status: "PENDING", stripeCustomerId: null }
    mockDb.member.findUnique.mockResolvedValue(null)
    mockDb.member.create.mockResolvedValue(newMember)
    // update is called once to persist the new Stripe customer ID
    mockDb.member.update.mockResolvedValue({ ...newMember, stripeCustomerId: "cus_new" })

    const result = await callMutation()

    expect(result.status).toBe("success")
    expect(mockDb.member.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          name: "Mario",
          surname: "Rossi",
          email: "mario@example.com",
        }),
      }),
    )
  })
})

// ─── Billing cycle algorithm ──────────────────────────────────────────────────

describe("billing cycle algorithm (calculateNextBillingDate)", () => {
  // calculateNextBillingDate is private; we verify via the billing_cycle_anchor
  // that reaches stripe.checkout.sessions.create.
  let mockSessionsCreate: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.resetAllMocks()
    vi.mocked(isStripeAvailable).mockReturnValue(true)

    mockSessionsCreate = vi.fn().mockResolvedValue({ url: "https://checkout.stripe.com/pay/test" })
    vi.mocked(getStripe).mockReturnValue({
      customers: { create: vi.fn().mockResolvedValue({ id: "cus_new" }) },
      checkout: { sessions: { create: mockSessionsCreate } },
    } as never)

    // Always use the new-member path so billing_cycle_anchor is always set
    mockDb.member.findUnique.mockResolvedValue(null)
    mockDb.member.create.mockResolvedValue({
      ...baseMember,
      id: "mem_new",
      status: "PENDING",
      stripeCustomerId: null,
    })
    mockDb.member.update.mockResolvedValue({ ...baseMember, id: "mem_new", stripeCustomerId: "cus_new" })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  async function getAnchorFor(signupDate: string): Promise<number> {
    vi.useFakeTimers({ now: new Date(signupDate).getTime() })
    const promise = makeCaller().createCheckoutSession(validInput)
    await vi.runAllTimersAsync()
    await promise
    const args = mockSessionsCreate.mock.calls[0]![0] as {
      subscription_data: { billing_cycle_anchor: number }
    }
    return args.subscription_data.billing_cycle_anchor
  }

  it("Jan–Sep signup → anchor is Jan 1st of the following year", async () => {
    const anchor = await getAnchorFor("2026-03-15T10:00:00Z")
    // March 2026 → targetYear = 2027
    expect(anchor).toBe(Math.floor(Date.UTC(2027, 0, 1) / 1000))
  })

  it("October signup → anchor skips to Jan 1st two years out (buffer)", async () => {
    const anchor = await getAnchorFor("2026-10-01T00:00:00Z")
    // October 2026 → targetYear = 2028 (>= 10 threshold)
    expect(anchor).toBe(Math.floor(Date.UTC(2028, 0, 1) / 1000))
  })

  it("December signup → anchor skips to Jan 1st two years out (buffer)", async () => {
    const anchor = await getAnchorFor("2026-12-31T23:59:59Z")
    // December 2026 → targetYear = 2028
    expect(anchor).toBe(Math.floor(Date.UTC(2028, 0, 1) / 1000))
  })

  it("September signup → anchor is Jan 1st of the following year (boundary, NOT buffered)", async () => {
    const anchor = await getAnchorFor("2026-09-30T23:59:59Z")
    // September 2026 → targetYear = 2027 (9 < 10 threshold)
    expect(anchor).toBe(Math.floor(Date.UTC(2027, 0, 1) / 1000))
  })

  it("anchor is always midnight UTC (not local time)", async () => {
    const anchor = await getAnchorFor("2026-06-15T00:00:00Z")
    const anchorDate = new Date(anchor * 1000)
    expect(anchorDate.toISOString()).toBe("2027-01-01T00:00:00.000Z")
  })
})
