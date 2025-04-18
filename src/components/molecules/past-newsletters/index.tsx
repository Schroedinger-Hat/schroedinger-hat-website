"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, ExternalLink } from "lucide-react"
import { Typography } from "@/components/atoms/typography/Typography"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { Heading } from "@/components/atoms/typography/Heading"
import { Button } from "@/components/ui/button"
import type {
  NewsletterContent,
  NewsletterErrorApiResponse,
  NewsletterSuccessApiResponse,
} from "@/app/api/email-octopus/newsletters/route"

export function PastNewsletters() {
  const [newsletters, setNewsletters] = useState<NewsletterContent[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/email-octopus/newsletters")

        if (!response.ok) {
          const errorData = (await response.json()) as NewsletterErrorApiResponse
          throw new Error(errorData.error ?? "Failed to fetch newsletters")
        }

        const data = (await response.json()) as NewsletterSuccessApiResponse
        if (data.newsletters) {
          setNewsletters(data.newsletters)
        } else {
          setNewsletters([])
        }
      } catch (err) {
        console.error("Error fetching newsletters:", err)
        setError(err instanceof Error ? err.message : "Failed to load newsletters")
      } finally {
        setIsLoading(false)
      }
    }

    void fetchNewsletters()
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="w-full space-y-4">
        <Heading level={3}>Recent Newsletters</Heading>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200" />
            </div>
            <div className="h-9 w-24 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border bg-red-50 p-4 text-red-700">
        <Paragraph>Unable to load past newsletters: {error}</Paragraph>
      </div>
    )
  }

  if (newsletters.length === 0) {
    return (
      <div className="rounded-lg border bg-gray-50 p-4">
        <Paragraph>No past newsletters available.</Paragraph>
      </div>
    )
  }

  return (
    <div className="w-full space-y-4">
      <Heading level={3}>Recent Newsletters</Heading>
      <div className="space-y-3">
        {newsletters.map((newsletter) => (
          <div
            key={newsletter.id}
            className="flex flex-col items-start justify-between gap-3 rounded-lg border p-4 transition-colors hover:border-black hover:bg-gray-50 sm:flex-row sm:items-center"
          >
            <div>
              <Typography as="h4" variant="h4" className="font-medium text-gray-900">
                {newsletter.name}
              </Typography>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <CalendarIcon className="mr-1 h-4 w-4" />
                {formatDate(newsletter.sentAt)}
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open("", "_blank")?.document.write(newsletter.content.html)}
              className="whitespace-nowrap"
            >
              Read Online <ExternalLink className="ml-1 h-3 w-3" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
