import { Heading } from "@/components/atoms/typography/Heading"
import { BlurredBackground } from "@/components/organisms/blurred-background"
import { ImageContent } from "@/components/organisms/image-content"
import { StatBlocks } from "@/components/organisms/stat-block"
import { ImageHero } from "@/components/organisms/image-hero"
import { Typography } from "@/components/atoms/typography/Typography"
import { FaqBlock } from "@/components/organisms/faq-block"
import { BlackCTA, BlackCTAHeading } from "@/components/organisms/black-cta"

// Images
import veronaPublic from "@/images/local-communities/verona_public.jpg"
import miskoWorkshop from "@/images/local-communities/misko_workshop.jpg"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { constructMetadata } from "@/lib/utils/metadata"

export const metadata = constructMetadata({
  title: "Local Communities | Schrödinger Hat",
  description: "Learn more about our local communities and how to get involved.",
})

export default async function LocalCommunitiesPage() {
  return (
    <main>
      <SectionContainer size="full" padding="none">
        <BlurredBackground
          points={3}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.7}
          size={300}
          positioning="center"
        />
      </SectionContainer>

      <SectionContainer size="medium">
        <ImageHero
          title={
            <>
              About <br /> Local <br /> Communities
            </>
          }
          imageSrc={veronaPublic}
          imageAlt="Community locali"
        />
      </SectionContainer>

      <SectionContainer size="wide">
        <ImageContent
          className="py-16"
          title="The vision"
          content={
            <>
              <Typography>
                <b>SH Groups</b> are local initiatives by Schrödinger Hat APS members, aimed at fostering
                workshops, talks, and events tailored to their communities. These groups create spaces for
                collaboration and innovation while staying connected to the broader Schrödinger Hat mission.
              </Typography>
              <Typography>
                With autonomy to shape their activities, <b>SH Groups</b> reflect the unique needs of their
                cities while upholding the organization’s values and Code of Conduct. Schrödinger Hat supports
                these groups with resources like branding, communication tools, and event platforms,
                empowering them to thrive as part of a global network inspiring tech communities everywhere.
              </Typography>
            </>
          }
          imageSrc={miskoWorkshop}
          imageAlt="Team"
          imagePosition="right"
        />
      </SectionContainer>

      <SectionContainer size="wide" spacing="medium">
        <Heading level={2} className="mb-8">
          Onboarding process
        </Heading>
        <StatBlocks
          centered={false}
          blocks={[
            {
              number: "1.",
              title: "Register",
              description:
                "Fill the form to express your interest in starting a local community in your area or joining us.",
            },
            {
              number: "2.",
              title: "Plan",
              description:
                "We review your application and if approved, we will have a set of calls where we will help you plan your first meetup with Schrödinger Hat.",
            },
            {
              number: "3.",
              title: "Meetup",
              description:
                "We will assist you during the organization, do promotions on our channels and help you to find speakers.",
            },
            {
              number: "4.",
              title: "Future",
              description:
                "After the meetup we will give you feedback and continue to work with you to grow your community.",
            },
          ]}
        />

        <SectionContainer size="medium">
          <BlackCTA
            cta={{
              text: "Get in touch",
              href: "https://forms.gle/25meVEFGiKU8pki7A",
            }}
          >
            <BlackCTAHeading>Ready?</BlackCTAHeading>
          </BlackCTA>
        </SectionContainer>
      </SectionContainer>

      <SectionContainer size="narrow">
        <FaqBlock groupKey="local-communities" />
      </SectionContainer>
    </main>
  )
}
