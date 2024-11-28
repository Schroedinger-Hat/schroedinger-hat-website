import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { Link } from "@/components/atoms/links/Link";
import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import { BlackCTA } from "@/components/organisms/black-cta";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { BulletPoint } from "@/components/organisms/bullet-point";
import { ImageContent } from "@/components/organisms/image-content";
import { ImageHero } from "@/components/organisms/image-hero";
import { StatBlocks } from "@/components/organisms/stat-block";
import { type Metadata } from "next";

// Images
import asSponsor from "@/images/contribute/as_sponsor.jpg";
import platea from "@/images/contribute/sponsor/os24_platea.jpg";

export const metadata: Metadata = {
  title: "Schrödinger Hat: Contribute as Sponsor",
  description:
    "Learn more about how to contribute to Schroedinger Hat as a sponsor.",
};

export default function BecomeSponsorPage() {
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
              Contribute <br /> as <br /> Sponsor
            </>
          }
          imageSrc={asSponsor.src}
          imageAlt="Speaker"
        />
      </SectionContainer>

      <SectionContainer size="wide">
        <ImageContent
          title="Why it matters"
          content={
            <>
              <Typography>
                Open source is more than code; it’s a way to connect, to
                empower, and to make a difference. We’re dedicated to building a
                future where technology serves everyone, regardless of who they
                are or where they come from. With a deep commitment to
                diversity, inclusion, and accessibility, we work to create
                opportunities for all voices to be heard.
              </Typography>
              <Typography>
                We can’t do this alone. It’s your curiosity, your passion, and
                your belief in a better future that inspire us to keep going.
                Let’s make open source, together.
              </Typography>
            </>
          }
          imageSrc={platea.src}
          imageAlt="Sponsor"
          imagePosition="right"
        />
      </SectionContainer>

      <SectionContainer>
        <div className="rounded-xl bg-slate-100 p-6 md:p-8">
          <BulletPoint
            title="Reasons to Sponsor"
            features={[
              "Align your brand with innovation, diversity, and sustainability.",
              "Reach a targeted, engaged audience in the tech and open-source world.",
              "Amplify your visibility with premium event branding opportunities.",
              "Support the growth of an inclusive, open-source ecosystem",
            ]}
          />
        </div>
      </SectionContainer>

      <SectionContainer size="wide">
        <StatBlocks
          blocks={[
            {
              number: "750",
              title: "Participants",
              description:
                "Engaged in-person attendees connecting and sharing ideas.",
            },
            {
              number: "2000+",
              title: "Online Attendees",
              description:
                "Unique viewers from around the world joining our live streams.",
            },
            {
              number: "50+",
              title: "International Speakers",
              description:
                "Leading voices in open-source, tech, and DEI inspiring our audience.",
            },
            {
              number: "3",
              title: "Flagship Conferences",
              description:
                "An annual series shaping the future of tech innovation and collaboration.",
            },
          ]}
        />
      </SectionContainer>

      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Gold tier */}
          <div className="space-y-6 rounded-2xl bg-gradient-to-b from-[#DAA520] to-[#B98B15] p-6 text-white shadow-lg">
            <Heading level={2} className="text-center text-white">
              Gold
            </Heading>

            <BulletPoint
              className="text-white"
              title=""
              features={[
                "Showcase your logo on rotation across the venue hall screens.",
                "Feature your brand during the impactful opening and closing keynotes.",
                "Bring your own rollups and stickers to personalize your presence.",
                "Display your logo prominently on the official conference rollups.",
                "Gain visibility with logo streams during event breaks.",
                "Highlight your job opportunities (up to 2) on dedicated boards at the main entrance.",
              ]}
            />

            <Heading level={4} className="border-t pt-4 text-center text-white">
              €1K + VAT
            </Heading>
          </div>

          {/* Diamond tier */}
          <div className="space-y-6 rounded-2xl bg-gradient-to-b from-[#B8B8B8] to-[#999696] p-6 text-white shadow-lg">
            <Heading level={2} className="text-center text-white">
              Diamond
            </Heading>

            <BulletPoint
              className="text-white"
              title=""
              features={[
                "Includes all perks from the Gold package.",
                "Promote your brand with logo in YouTube recordings.",
                "Feature your logo on every attendee's badge for maximum exposure.",
                "Host a booth in the conference hall, complete with seating for two.",
                "Promote your job opportunities (up to 8) on our entrance boards.",
                "Share your job listings in our event newsletters.",
                "Receive a GDPR-compliant list of attendees for future engagement.",
              ]}
            />

            <Heading level={4} className="border-t pt-4 text-center text-white">
              €2K + VAT
            </Heading>
          </div>

          <div className="col-span-1 md:col-span-2">
            <Typography
              className="text-left md:text-center"
              variant="muted"
              as="p"
            >
              Some events may offer additional perks for sponsors, but we strive
              to keep our packages straightforward and lean.
              <br />
              Pricing adjustments might be made based on the event's scale to
              account for varying expenses.
            </Typography>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer>
        <BlackCTA
          leftContent={
            <>
              <Link
                href="mailto:us@schroedinger.hat?subject=Sponsorship%20Opportunity"
                className=""
              >
                <Heading
                  level={1}
                  className="mb-0 font-lexend text-[80px] tracking-tight text-white"
                >
                  Get in touch
                </Heading>
              </Link>
            </>
          }
        />
      </SectionContainer>
    </main>
  );
}
