import { NextResponse } from "next/server"
import type { EmailOctopusErrorResponse } from "../route"

export interface NewsletterContent {
  id: string
  name: string
  sentAt: string
  webViewUrl: string
  content: {
    html: string
  }
}

export interface NewsletterSuccessApiResponse {
  newsletters?: NewsletterContent[]
  error?: string
}

export interface NewsletterErrorApiResponse {
  error: string
  status: string
}

type NewsletterCampaign = {
  id: string
  name: string
  created_at: string
  sent_at: string
  status: string
  web_view_url: string
  to: string[] // Array of list IDs this campaign was sent to
  content?: {
    html: string
  }
}

type EmailOctopusSuccessResponse = {
  data: NewsletterCampaign[]
}

export async function GET() {
  try {
    const apiKey = process.env.EMAIL_OCTOPUS_API_KEY
    const listId = process.env.EMAIL_OCTOPUS_LIST_ID
    
    if (!apiKey || !listId) {
      return NextResponse.json(
        { error: "EmailOctopus configuration is missing" },
        { status: 500 }
      )
    }

    // First, get all recent campaigns
    const response = await fetch(`https://emailoctopus.com/api/1.6/campaigns?api_key=${apiKey}&limit=20&status=SENT`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })

    if (!response.ok) {
      const errorData = await response.json() as EmailOctopusErrorResponse
      return NextResponse.json(
        { error: errorData.error?.message ?? "Failed to fetch newsletters" },
        { status: response.status }
      )
    }

    const data = await response.json() as EmailOctopusSuccessResponse
    
    // Filter campaigns to only include those sent to our specific list
    const filteredCampaigns = data.data.filter(campaign => 
      campaign.to.includes(listId)
    ).slice(0, 6) // Limit to 5 for performance
    
    // Fetch the content for each campaign
    const newslettersWithContent: NewsletterContent[] = await Promise.all(
      filteredCampaigns.map(async (campaign) => {
        // Get the complete campaign with content
        const contentResponse = await fetch(`https://emailoctopus.com/api/1.6/campaigns/${campaign.id}?api_key=${apiKey}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json'
          }
        })
        
        if (!contentResponse.ok) {
          return {
            id: campaign.id,
            name: campaign.name,
            sentAt: campaign.sent_at,
            webViewUrl: campaign.web_view_url,
            content: { html: '' }
          }
        }
        
        const fullCampaign = await contentResponse.json() as NewsletterCampaign
        
        return {
          id: campaign.id,
          name: campaign.name,
          sentAt: campaign.sent_at,
          webViewUrl: campaign.web_view_url,
          content: { html: fullCampaign.content?.html ?? '' }
        }
      })
    )

    return NextResponse.json({ newsletters: newslettersWithContent })
  } catch (error) {
    console.error('Error fetching newsletters:', error)
    return NextResponse.json(
      { error: "An error occurred while fetching newsletters" },
      { status: 500 }
    )
  }
} 
