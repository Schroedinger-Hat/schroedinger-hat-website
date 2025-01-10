import * as postmark from "postmark"
import { render } from "@react-email/render"
import { MembershipSignupEmail } from "@/emails/membership-signup"
import { env } from "@/env"

const client = env.POSTMARK_API_KEY ? new postmark.ServerClient(env.POSTMARK_API_KEY) : null

interface EmailPayload {
  from?: string
  to: string
  subject: string
  html: string
}

async function sendEmail(payload: EmailPayload) {
  const { from = "hello@schroedinger-hat.org", to, subject, html } = payload

  if (!client) {
    console.log("POSTMARK_API_KEY not set. Email would have been sent with the following details:")
    console.log({ from, to, subject, html })
    return
  }

  return client.sendEmail({
    From: from,
    To: to,
    Subject: subject,
    HtmlBody: html,
  })
}

export async function sendMembershipSignupEmail(firstName: string, email: string) {
  const emailHtml = await render(<MembershipSignupEmail firstName={firstName} />, { pretty: true })

  return sendEmail({
    to: email,
    subject: "Welcome to Schrödinger Hat!",
    html: emailHtml,
  })
}
