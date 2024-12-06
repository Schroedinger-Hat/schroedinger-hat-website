"use client"

import { Button } from "@/components/molecules/button"
import { api } from "@/trpc/react"
import Link from "next/link"

export function MembershipCheckoutButton() {
  const { mutate: createCheckout, isPending } = api.stripe.createCheckoutSession.useMutation({
    onSuccess: (data) => {
      if (data.url) {
        window.location.href = data.url
      }
    },
    onError: (error) => {
      console.error("Failed to create checkout session:", error)
      // You might want to show an error toast here
    },
  })

  const handleSubscribe = () => {
    createCheckout()
  }

  return (
    <Link href="/association/join">
      <Button variant="secondary" onClick={handleSubscribe} disabled={isPending} size="lg">
        {isPending ? "Loading..." : "Become a member"}
      </Button>
    </Link>
  )
}
