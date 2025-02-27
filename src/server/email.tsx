import { Resend } from "resend"
import { render } from "@react-email/render"
import { MembershipSignupEmail } from "@/emails/membership-signup"
import { env } from "@/env"
import React from "react"
import { v4 as uuidv4 } from "uuid"

let _resend: any

function resendIsConfigured() {
  return _resend !== null
}
function configureResend() {
  if (!env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY not set")
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _resend = new Resend(env.RESEND_API_KEY)
  return _resend
}

interface EmailPayload {
  from?: string
  to: string
  subject: string
  html: string
}

async function sendEmail(payload: EmailPayload) {
  const { from = "hello@schroedinger-hat.org", to, subject, html } = payload

  if (!resendIsConfigured()) {
    console.log("RESEND_API_KEY not set. Email would have been sent with the following details:")
    console.log({ from, to, subject, html })
    return
  }

  const resend = configureResend()

  try {
    // eslint-disable-next-line
    const { data, error } = await resend.emails.send({
      from,
      replyTo: from,
      to,
      subject,
      html,
      headers: {
        "X-Entity-Ref-ID": uuidv4(), // Prevent Gmail from threading emails with same subject
      },
    })

    if (error) {
      console.error("Failed to send email:", { error })
    }

    return data
  } catch (error) {
    console.error("Failed to send email:", { error })
    throw error
  }
}

export async function sendMembershipSignupEmail(firstName: string, email: string) {
  const emailHtml = await render(<MembershipSignupEmail firstName={firstName} />, { pretty: true })

  return sendEmail({
    to: email,
    subject: "Welcome to Schrödinger Hat!",
    html: emailHtml,
  })
}
