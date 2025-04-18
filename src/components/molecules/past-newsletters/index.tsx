"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, ExternalLink } from "lucide-react"
import { Typography } from "@/components/atoms/typography/Typography"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { Heading } from "@/components/atoms/typography/Heading"
import { Button } from "@/components/ui/button"

type Newsletter = {
  id: string
  name: string
  sentAt: string
  webViewUrl: string
}

type ApiResponse = {
  newsletters?: Newsletter[]
  error?: string
}

export function PastNewsletters() {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        setIsLoading(true)
        const response = await fetch("/api/email-octopus/newsletters")
        
        if (!response.ok) {
          const errorData = await response.json() as ApiResponse
          throw new Error(errorData.error ?? "Failed to fetch newsletters")
        }
        
        const data = await response.json() as ApiResponse
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
      day: "numeric"
    })
  }

  if (isLoading) {
    return (
      <div className="space-y-4 w-full">
        <Heading level={3}>Recent Newsletters</Heading>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center p-4 border rounded-lg gap-4">
            <div className="h-8 w-8 rounded-full bg-gray-200 animate-pulse" />
            <div className="space-y-2 flex-1">
              <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
              <div className="h-3 w-1/3 bg-gray-200 animate-pulse rounded" />
            </div>
            <div className="h-9 w-24 bg-gray-200 animate-pulse rounded" />
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 border rounded-lg bg-red-50 text-red-700">
        <Paragraph>Unable to load past newsletters: {error}</Paragraph>
      </div>
    )
  }

  if (newsletters.length === 0) {
    return (
      <div className="p-4 border rounded-lg bg-gray-50">
        <Paragraph>No past newsletters available.</Paragraph>
      </div>
    )
  }

  return (
    <div className="space-y-4 w-full">
      <Heading level={3}>Recent Newsletters</Heading>
      <div className="space-y-3">
        {newsletters.map((newsletter) => (
          <div 
            key={newsletter.id} 
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors gap-3"
          >
            <div>
              <Typography as="h4" variant="h4" className="font-medium text-gray-900">
                {newsletter.name}
              </Typography>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <CalendarIcon className="h-4 w-4 mr-1" />
                {formatDate(newsletter.sentAt)}
              </div>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => window.open("", "_blank").document.write(newsletter.content.html)}
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