import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"

// ─── Module mocks ─────────────────────────────────────────────────────────────

// Mutable env object so VERCEL_ENV can be overridden per-test
const mockEnv = vi.hoisted(() => ({
  VERCEL_ENV: undefined as string | undefined,
  NODE_ENV: "test" as const,
}))

vi.mock("@/env", () => ({ env: mockEnv }))

vi.mock("@/server/db", () => ({
  db: {
    member: { deleteMany: vi.fn() },
    health: { create: vi.fn() },
  },
}))

// Replace NextResponse with plain Web API Response so the route works in Node.js
vi.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) =>
      new Response(JSON.stringify(body), {
        status: (init as { status?: number } | undefined)?.status ?? 200,
        headers: { "content-type": "application/json" },
      }),
  },
}))

import { GET } from "../route"
import { db } from "@/server/db"

const mockDeleteMany = vi.mocked(db.member.deleteMany)
const mockHealthCreate = vi.mocked(db.health.create)

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeRequest(headers: Record<string, string> = {}) {
  return new Request("http://localhost/api/cron/health-check", { headers }) as never
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe("GET /api/cron/health-check", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockEnv.VERCEL_ENV = undefined
    process.env.CRON_SECRET = "test-secret"
    mockDeleteMany.mockResolvedValue({ count: 3 } as never)
    mockHealthCreate.mockResolvedValue({ id: 1 } as never)
  })

  afterEach(() => {
    delete process.env.CRON_SECRET
  })

  // ── Delete logic ────────────────────────────────────────────────────────────

  it("deletes only PENDING members and returns the deleted count", async () => {
    vi.useFakeTimers({ now: new Date("2026-03-03T12:00:00Z").getTime() })
    mockDeleteMany.mockResolvedValue({ count: 5 } as never)

    const response = await GET(makeRequest())
    const body = (await response.json()) as { success: boolean; deletedRecords: number }

    expect(mockDeleteMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ status: "PENDING" }),
      }),
    )
    expect(body.deletedRecords).toBe(5)
    expect(body.success).toBe(true)
    expect(response.status).toBe(200)

    vi.useRealTimers()
  })

  it("passes a createdAt.lt date filter to deleteMany (cutoff is ~14 days ago)", async () => {
    vi.useFakeTimers({ now: new Date("2026-03-03T12:00:00Z").getTime() })

    await GET(makeRequest())

    const callArg = mockDeleteMany.mock.calls[0]![0] as {
      where: { createdAt: { lt: Date } }
    }
    const cutoff = callArg.where.createdAt.lt
    expect(cutoff).toBeInstanceOf(Date)
    // cutoff must be 14 days before the fake "now" (2026-02-17T12:00:00Z)
    expect(cutoff.toISOString()).toBe(new Date("2026-02-17T12:00:00.000Z").toISOString())

    vi.useRealTimers()
  })

  it("logs the deletion result to the Health table", async () => {
    mockDeleteMany.mockResolvedValue({ count: 7 } as never)
    mockHealthCreate.mockResolvedValue({ id: 42 } as never)

    const response = await GET(makeRequest())
    const body = (await response.json()) as { healthLogId: number }

    expect(mockHealthCreate).toHaveBeenCalledWith({ data: { deletedRecords: 7 } })
    expect(body.healthLogId).toBe(42)
  })

  // ── Auth ─────────────────────────────────────────────────────────────────────

  it("requires no auth header in non-production environments", async () => {
    mockEnv.VERCEL_ENV = undefined // dev / test

    const response = await GET(makeRequest()) // no Authorization header

    expect(response.status).toBe(200)
    expect(mockDeleteMany).toHaveBeenCalled()
  })

  it("returns 401 in production when Authorization header is absent", async () => {
    mockEnv.VERCEL_ENV = "production"

    const response = await GET(makeRequest())

    expect(response.status).toBe(401)
    expect(mockDeleteMany).not.toHaveBeenCalled()
  })

  it("returns 401 in production when the token is wrong", async () => {
    mockEnv.VERCEL_ENV = "production"
    process.env.CRON_SECRET = "real-secret"

    const response = await GET(makeRequest({ authorization: "Bearer wrong-token" }))

    expect(response.status).toBe(401)
    expect(mockDeleteMany).not.toHaveBeenCalled()
  })

  it("succeeds in production with the correct Bearer token", async () => {
    mockEnv.VERCEL_ENV = "production"
    process.env.CRON_SECRET = "real-secret"

    const response = await GET(makeRequest({ authorization: "Bearer real-secret" }))
    const body = (await response.json()) as { success: boolean }

    expect(response.status).toBe(200)
    expect(body.success).toBe(true)
  })

  // ── Error handling ───────────────────────────────────────────────────────────

  it("returns 500 and logs the error message when deleteMany throws", async () => {
    mockDeleteMany.mockRejectedValue(new Error("DB connection refused"))

    const response = await GET(makeRequest())
    const body = (await response.json()) as { error: string }

    expect(response.status).toBe(500)
    expect(body.error).toBe("Health check failed")
    expect(mockHealthCreate).toHaveBeenCalledWith({
      data: { deletedRecords: 0, error: "DB connection refused" },
    })
  })

  it("still returns 500 when both deleteMany and health.create throw", async () => {
    mockDeleteMany.mockRejectedValue(new Error("DB down"))
    mockHealthCreate.mockRejectedValue(new Error("Also DB down"))

    const response = await GET(makeRequest())
    const body = (await response.json()) as { error: string }

    // Must not throw an unhandled rejection
    expect(response.status).toBe(500)
    expect(body.error).toBe("Health check failed")
  })
})
