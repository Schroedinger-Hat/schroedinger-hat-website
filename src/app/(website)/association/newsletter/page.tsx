import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
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
  title: "Newsletter - Schrödinger Hat",
  description: "Subscribe to our newsletter to stay up to date with the latest news and events from Schrödinger Hat.",
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

        <div className="container mx-auto px-4">
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
        </div>
      </SectionContainer>

      <SectionContainer size="wide">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-12 items-center mb-12">
            <div className="md:w-1/2">
              <Heading level={2}>Never miss an update</Heading>
              
              <Paragraph>
                Our newsletter delivers the latest in tech innovations, open source developments, 
                and community highlights curated by the Schrödinger Hat team and delivered straight to your inbox.
              </Paragraph>
              
              <Paragraph className="mb-8">
                We send out our newsletter approximately once a month, keeping you informed without 
                overwhelming your inbox. Each edition includes:
              </Paragraph>
              
              <ul className="list-disc pl-5 space-y-2 mb-8">
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
              
              <p className="text-sm text-gray-500">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-lg overflow-hidden shadow-xl mb-8">
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-white text-lg font-semibold">Latest Edition: April 2024</p>
                  <p className="text-white/80">Featuring tech trends, community highlights, and more</p>
                </div>
              </div>
              
              <PastNewsletters />
            </div>
          </div>
        </div>

        <div className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <ImageContent
              title="Meet the editorial team"
              content={
                <>
                  <Paragraph>
                    Our newsletter is curated by passionate community members who are dedicated to 
                    bringing you the most relevant and interesting content from the open source world.
                  </Paragraph>
                  <Paragraph>
                    The team scours the tech landscape to find interesting projects, valuable resources, 
                    and community stories worth sharing.
                  </Paragraph>
                  <Link href="/association/about-us">
                    <Button variant="outline" className="mt-4">
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
          </div>
        </div>

        <div className="container mx-auto py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} className="mb-6">Frequently Asked Questions</Heading>
            
            <div className="space-y-6 mt-8">
              <div className="space-y-2">
                <Heading level={3}>How often is the newsletter sent?</Heading>
                <Paragraph>
                  We send our newsletter once a month, usually in the first week. We respect your inbox and won&apos;t spam you.
                </Paragraph>
              </div>
              
              <div className="space-y-2">
                <Heading level={3}>Can I access previous editions?</Heading>
                <Paragraph>
                  Yes! We archive all our previous newsletters on our website. You&apos;ll receive a link to access them when you subscribe.
                </Paragraph>
              </div>
              
              <div className="space-y-2">
                <Heading level={3}>How do I unsubscribe?</Heading>
                <Paragraph>
                  Every newsletter includes an unsubscribe link at the bottom. One click and you&apos;re out!
                </Paragraph>
              </div>
              
              <div className="space-y-2">
                <Heading level={3}>Can I contribute to the newsletter?</Heading>
                <Paragraph>
                  Absolutely! We welcome community contributions. If you have news, projects, or articles 
                  you&apos;d like to share, please contact us at <a href="mailto:social@schrodinger-hat.org" className="text-blue-600 hover:underline">social@schrodinger-hat.org</a>.
                </Paragraph>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <Heading level={2} className="mb-6 text-white">Ready to stay informed?</Heading>
            <Paragraph className="text-white/90 max-w-2xl mx-auto mb-8">
              Join our growing community of tech enthusiasts, developers, and open source advocates. 
              Stay updated with the latest news, events, and opportunities.
            </Paragraph>
            
            <NewsletterSignup 
              title=""
              description=""
              buttonText="Subscribe Now"
              placeholderText="Enter your email"
              className="max-w-md mx-auto text-black"
            />
          </div>
        </div>
      </SectionContainer>
    </main>
  )
} 