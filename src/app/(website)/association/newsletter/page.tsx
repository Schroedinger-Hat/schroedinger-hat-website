import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Typography } from "@/components/atoms/typography/Typography"
import { FaqBlock } from "@/components/organisms/faq-block"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/atoms/typography/Heading"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { BlurredBackground } from "@/components/organisms/blurred-background"
import { ImageContent } from "@/components/organisms/image-content"
import { NewsletterSignup } from "@/components/molecules/newsletter-signup"
import { PastNewsletters } from "@/components/molecules/past-newsletters"
import { constructMetadata } from "@/lib/utils/metadata"

// Images
import joinTheTeam from "@/images/about/os24_join-the-team.jpg"

export const metadata = constructMetadata({
  title: "Newsletter | Schrödinger Hat",
  description:
    "Subscribe to our newsletter to stay up to date with the latest news and events from Schrödinger Hat.",
})

export default function NewsletterPage() {
  return (
    <main>
      <SectionContainer size="wide" notAnimated padding="header">
        <BlurredBackground
          points={3}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.7}
          size={300}
          positioning="center"
        />

        <SectionContainer padding="none">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <Heading level={1} huge={true}>
                Schrödinger Hat Newsletter
              </Heading>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                Stay informed about tech trends, open source updates, upcoming events, and community news.
              </h2>
            </div>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer size="wide">
        <SectionContainer padding="little" size="wide">
          <div className="flex flex-col items-center gap-12 md:flex-row">
            <div className="md:w-1/2">
              <Heading level={2}>Never miss an update</Heading>

              <Paragraph>
                Our newsletter delivers the latest in tech innovations, open source developments, and
                community highlights curated by the Schrödinger Hat team and delivered straight to your inbox.
              </Paragraph>

              <Paragraph className="mb-8">
                We send out our newsletter approximately once a month, keeping you informed without
                overwhelming your inbox. Each edition includes:
              </Paragraph>

              <ul className="mb-8 list-disc space-y-2 pl-5">
                <li>Community news and upcoming events</li>
                <li>Open source project highlights</li>
                <li>Technical articles and tutorials</li>
                <li>Job opportunities and collaborations</li>
                <li>Conference and meetup announcements</li>
              </ul>

              <NewsletterSignup
                title="Join our community newsletter"
                description="Subscribe to receive curated updates from the open source world."
                buttonText="Subscribe"
                placeholderText="Your email address"
                className="mb-4"
              />

              <p className="text-sm text-gray-500">We respect your privacy. Unsubscribe at any time.</p>
            </div>

            <div className="md:w-1/2">
              <div className="relative mb-8 overflow-hidden rounded-lg shadow-xl">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-lg font-semibold text-white">Latest Edition: April 2024</p>
                  <p className="text-white/80">Featuring tech trends, community highlights, and more</p>
                </div>
              </div>

              <PastNewsletters />
            </div>
          </div>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-xl bg-slate-100 py-16">
          <SectionContainer padding="none">
            <ImageContent
              title="Meet the editorial team"
              content={
                <>
                  <Typography>
                    Our newsletter is curated by passionate community members who are dedicated to bringing
                    you the most relevant and interesting content from the open source world.
                  </Typography>
                  <Typography>
                    The team scours the tech landscape to find interesting projects, valuable resources, and
                    community stories worth sharing.
                  </Typography>
                  <Link href="/association/about-us">
                    <Button className="mt-8">
                      Learn more about our team
                      <ArrowRight className="h-5 w-5" />
                    </Button>
                  </Link>
                </>
              }
              imageSrc={joinTheTeam}
              imageAlt="Schrödinger Hat newsletter editorial team"
              imagePosition="right"
            />
          </SectionContainer>
        </div>
      </SectionContainer>

      <SectionContainer size="narrow">
        <FaqBlock groupKey="newsletter" />
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-xl bg-gray-900 py-16 text-white">
          <SectionContainer className="text-center" padding="none">
            <Heading level={2} className="mb-6 text-white">
              Ready to stay informed?
            </Heading>
            <Paragraph className="mx-auto mb-8 max-w-2xl text-white/90">
              Join our growing community of tech enthusiasts, developers, and open source advocates. Stay
              updated with the latest news, events, and opportunities.
            </Paragraph>
            <NewsletterSignup
              buttonText="Subscribe Now"
              placeholderText="Enter your email"
              className="mx-auto max-w-md text-black"
              ctaDarkBg
            />
          </SectionContainer>
        </div>
      </SectionContainer>
    </main>
  )
}
