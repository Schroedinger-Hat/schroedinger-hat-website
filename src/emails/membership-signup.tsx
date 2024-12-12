import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"
import * as React from "react"

interface MembershipSignupEmailProps {
  steps?: {
    id: number
    Description: React.ReactNode
  }[]
  firstName: string
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : ""
const steps = [
  {
    id: 2,
    Description: (
      <li className="mb-20" key={2}>
        ✅ <b>Approval Process</b>: Your membership request is now being reviewed by the association members.
        Approval is usually swift, but we’ll keep you updated every step of the way.
      </li>
    ),
  },
  {
    id: 3,
    Description: (
      <li className="mb-20" key={3}>
        🎟️ <b>Membership Number</b>: Once approved, your membership number will be sent to you within the next
        few weeks.
      </li>
    ),
  },
]

export function MembershipSignupEmail({ firstName }: MembershipSignupEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>
        {firstName ? `${firstName}, Welcome to Schrödinger Hat` : "Welcome to Schrödinger Hat"}
      </Preview>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                brand: "#2250f4",
                offwhite: "#fafbfb",
              },
              spacing: {
                0: "0px",
                20: "20px",
                45: "45px",
              },
            },
          },
        }}
      >
        <Body className="bg-offwhite font-sans text-base">
          <Img
            src={`${baseUrl}/static/logo.png`}
            width="64"
            height="64"
            alt="Schroedinger Hat Logo"
            className="mx-auto my-20"
          />
          <Container className="p-45 bg-white">
            <Heading className="my-0 text-center leading-8">Welcome {firstName}!</Heading>,
            <Section>
              <Row>
                <Text className="text-base">
                  Thank you for joining Schrödinger Hat! We’re thrilled to have you take this step and become
                  part of our growing community.
                </Text>

                <Text className="text-base">Here’s what’s happening next:</Text>
              </Row>
            </Section>
            <ul className="list-none">{steps?.map(({ Description }) => Description)}</ul>
            <Section>
              <Row>
                <Text className="text-base">
                  We appreciate your patience during this process and can’t wait to officially welcome you
                  into the Schrödinger Hat APS family!
                </Text>
                <Text className="text-base font-bold">In the Meantime</Text>
                <Text className="text-base">
                  Feel free to explore our{" "}
                  <Link href="https://schroedinger-hat.org/partecipate/events">events and activities</Link> or
                  visit our <Link href="https://shop.schroedinger-hat.org">store</Link> to get inspired by
                  what’s in store (pun intended) for our members.
                  <br />
                </Text>
                <Text className="text-base">
                  If you have any questions or need assistance, don’t hesitate to reach out to us at{" "}
                  <Link href="mailto:hello@schroedinger-hat.org">hello@schroedinger-hat.org</Link>.
                  <br />
                  Thank you once again for your trust and enthusiasm. Exciting times are ahead!
                </Text>
                <Text className="text-base font-bold">
                  Warm regards,
                  <br /> Schrödinger Hat
                </Text>
              </Row>
            </Section>
          </Container>

          <Container className="mt-20">
            <Section>
              <Row>
                <Column className="px-20 text-center">
                  <Link href="{{{ pm:unsubscribe }}}">Unsubscribe</Link>
                </Column>
              </Row>
            </Section>
            <Text className="mb-45 text-center text-gray-400">
              Schrödinger Hat APS
              <br />
              Via Pino Arpioni 1, Pelago (FI), 50060
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
