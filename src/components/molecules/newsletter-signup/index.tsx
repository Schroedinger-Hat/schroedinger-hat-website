"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Typography } from "@/components/atoms/typography/Typography"
import { useToast } from "@/components/ui/toast"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"

interface NewsletterSignupProps {
  buttonText?: string
  className?: string
  description?: string
  placeholderText?: string
  successMessage?: string
  title?: string
  ctaDarkBg?: boolean
}

type ApiResponse = {
  error?: string
  message?: string
  success?: boolean
}

export function NewsletterSignup({
  buttonText = "Subscribe",
  className = "",
  description,
  placeholderText = "Enter your email",
  successMessage = "Thank you for subscribing! You'll receive our updates soon.",
  title,
  ctaDarkBg,
}: NewsletterSignupProps) {
  const { addToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const formSchema = z.object({
    email: z.string().email(),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/email-octopus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: values.email }),
      })

      const data = (await response.json()) as ApiResponse

      if (!response.ok) {
        throw new Error(data.error ?? "Something went wrong")
      }

      addToast({
        variant: "success",
        children: (
          <div>
            <div>
              <p className="font-semibold">Success</p>
              <p className="text-sm">{successMessage}</p>
            </div>
          </div>
        ),
      })
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = error.message.includes("MEMBER_EXISTS_WITH_EMAIL_ADDRESS")
          ? "You're already subscribed with this email address."
          : error.message
        addToast({
          variant: "destructive",
          children: (
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{errorMessage}</p>
            </div>
          ),
        })
      }
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

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <div className="flex space-x-2 transition-colors">
                    <div className="relative flex-grow">
                      <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                        <Mail className="h-4 w-4 text-gray-400" />
                      </div>
                      <Input
                        type="email"
                        placeholder={placeholderText}
                        disabled={isSubmitting}
                        required
                        className="w-full pl-10"
                        {...field}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting || !form.formState.isValid}
                      className="whitespace-nowrap"
                      variant={ctaDarkBg ? "outline-dark-bg" : "outline"}
                    >
                      {isSubmitting ? "Subscribing..." : buttonText}
                    </Button>
                  </div>
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
}
