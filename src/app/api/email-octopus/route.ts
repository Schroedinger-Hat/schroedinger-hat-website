import { NextResponse } from "next/server"

type EmailOctopusErrorResponse = {
  error: {
    code: number
    message: string
  }
}

type EmailOctopusSuccessResponse = {
  id: string
  email_address: string
  status: string
  created_at: string
  last_updated_at: string
}

type RequestBody = {
  email: string
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as RequestBody
    const { email } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: "Valid email address is required" },
        { status: 400 }
      )
    }

    const listId = process.env.EMAIL_OCTOPUS_LIST_ID
    const apiKey = process.env.EMAIL_OCTOPUS_API_KEY
    
    if (!listId || !apiKey) {
      return NextResponse.json(
        { error: "EmailOctopus configuration is missing" },
        { status: 500 }
      )
    }

    const response = await fetch(`https://emailoctopus.com/api/1.6/lists/${listId}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        api_key: apiKey,
        email_address: email,
        tags: ['website-signup', 'schroedinger-hat-website'],
        status: 'SUBSCRIBED',
      }),
    })

    const data = await response.json() as EmailOctopusSuccessResponse | EmailOctopusErrorResponse

    if ('error' in data) {
      return NextResponse.json(
        { error: data.error.message || "Failed to subscribe" },
        { status: data.error.code ? 400 : 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: "Successfully subscribed to the newsletter" }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json(
      { error: "An error occurred while subscribing to the newsletter" },
      { status: 500 }
    )
  }
} 