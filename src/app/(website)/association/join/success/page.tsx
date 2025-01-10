import { getStripe, isStripeAvailable } from "@/lib/stripe"
import { Heading } from "@/components/atoms/typography/Heading"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { SuccessConfetti } from "./success-confetti"
import { CheckmarkBadge01Icon, UserMultipleIcon, WavingHand01Icon } from "hugeicons-react"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { BlurredBackground } from "@/components/organisms/blurred-background"

interface SuccessPageProps {
  searchParams: Promise<{ session_id: string }>
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams

  let customerEmail = ""
  if (isStripeAvailable() && sessionId) {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.retrieve(sessionId)
    customerEmail = session.customer_details?.email ?? ""
  }

  return (
    <main className="relative">
      <div className="absolute inset-0 overflow-hidden">
        <SuccessConfetti />
      </div>

      {/* Header Section */}
      <SectionContainer size="wide" notAnimated>
        <BlurredBackground
          points={3}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.7}
          size={300}
          positioning="center"
        />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <Heading level={1} huge={true}>
                Subscription completed!
              </Heading>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                Your request has been sent successfully!
                <br />
                What happens now?
              </h2>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Features Grid */}
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature 1 */}
            <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
              <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
                <div className="h-8 w-8 text-white">
                  <CheckmarkBadge01Icon className="h-8 w-8" />
                </div>
              </div>
              <Heading level={4} className="mb-2">
                Confirmation
              </Heading>
              <Paragraph className="text-slate-800">
                {customerEmail
                  ? `We have sent a confirmation to ${customerEmail}`
                  : "We will send you a confirmation email shortly"}
              </Paragraph>
            </div>

            {/* Feature 2 */}
            <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
              <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
                <div className="h-8 w-8 text-white">
                  <UserMultipleIcon className="h-8 w-8" />
                </div>
              </div>
              <Heading level={4} className="mb-2">
                Approval
              </Heading>
              <Paragraph className="text-slate-800">
                The association members will approve your request.
              </Paragraph>
            </div>

            {/* Feature 3 */}
            <div className="rounded-xl bg-slate-50 p-10 py-10 text-left">
              <div className="mb-4 inline-block rounded-lg bg-blue-500 p-3">
                <div className="h-8 w-8 text-white">
                  <WavingHand01Icon className="h-8 w-8" />
                </div>
              </div>
              <Heading level={4} className="mb-2">
                Welcome
              </Heading>
              <Paragraph className="text-slate-800">
                You will receive your membership number in the next weeks.
              </Paragraph>
            </div>
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
