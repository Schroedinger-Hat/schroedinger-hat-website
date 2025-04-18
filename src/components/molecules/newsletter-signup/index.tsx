"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/atoms/typography/Typography"

interface NewsletterSignupProps {
  title?: string
  description?: string
  successMessage?: string
  buttonText?: string
  placeholderText?: string
  className?: string
}

type ApiResponse = {
  success?: boolean
  message?: string
  error?: string
}

export function NewsletterSignup({
  title = "Subscribe to our newsletter",
  description = "Get the latest news and updates from Schrödinger Hat.",
  successMessage = "Thank you for subscribing! You'll receive our updates soon.",
  buttonText = "Subscribe",
  placeholderText = "Enter your email",
  className = "",
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    content: string
  } | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!email?.includes("@")) {
      setMessage({
        type: "error",
        content: "Please enter a valid email address.",
      })
      return
    }

    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch("/api/email-octopus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json() as ApiResponse

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong")
      }

      // Clear email and show success message
      setEmail("")
      setMessage({
        type: "success",
        content: successMessage,
      })
    } catch (error) {
      let errorMessage = "Failed to subscribe. Please try again."
      
      if (error instanceof Error) {
        // If the error is about member already existing
        if (error.message.includes("MEMBER_EXISTS_WITH_EMAIL_ADDRESS")) {
          errorMessage = "You're already subscribed with this email address."
        } else {
          errorMessage = error.message
        }
      }
      
      setMessage({
        type: "error",
        content: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`w-full max-w-md ${className}`}>
      {title && (
        <Typography as="h3" variant="h3" className="mb-2">
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="p" className="mb-4">
          {description}
        </Typography>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Mail className="h-4 w-4 text-gray-400" />
            </div>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              disabled={isSubmitting}
              required
              className="w-full pl-10"
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="whitespace-nowrap"
          >
            {isSubmitting ? "Subscribing..." : buttonText}
          </Button>
        </div>

        {message && (
          <div
            className={`text-sm mt-2 ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.content}
          </div>
        )}
      </form>
    </div>
  )
} 