import { Image } from "@/components/atoms/media/Image";
import { Heading } from "@/components/atoms/typography/Heading";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { ImageContent } from "@/components/organisms/image-content";
import { StatBlocks } from "@/components/organisms/stat-block";
import {
  MentorIcon,
  Mic01Icon,
  SchoolTieIcon,
  UserMultipleIcon,
} from "hugeicons-react";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ImageHero } from "@/components/organisms/image-hero";
import { Typography } from "@/components/atoms/typography/Typography";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaqBlock } from "@/components/organisms/faq-block";
import { BlackCTA } from "@/components/organisms/black-cta";

// Images
import veronaPublic from "@/images/local-communities/verona_public.jpg";
import miskoWorkshop from "@/images/local-communities/misko_workshop.jpg";

export default async function LocalCommunitiesPage() {
  return (
    <main className="py-24">
      <BlurredBackground
        points={3}
        colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
        blur={100}
        opacity={0.7}
        size={300}
        positioning="center"
      />

      <ImageHero
        title={
          <>
            About <br /> Local <br /> Communities
          </>
        }
        imageSrc={veronaPublic.src}
        imageAlt="Community locali"
      />

      <div className="container mx-auto max-w-7xl">
        <ImageContent
          className="py-16"
          title="The vision"
          content={
            <>
              <Typography>
                <b>SH Groups</b> are local initiatives by Schroedinger Hat APS
                members, aimed at fostering workshops, talks, and events
                tailored to their communities. These groups create spaces for
                collaboration and innovation while staying connected to the
                broader Schroedinger Hat mission.
              </Typography>
              <Typography>
                With autonomy to shape their activities, <b>SH Groups</b>{" "}
                reflect the unique needs of their cities while upholding the
                organization’s values and Code of Conduct. Schroedinger Hat
                supports these groups with resources like branding,
                communication tools, and event platforms, empowering them to
                thrive as part of a global network inspiring tech communities
                everywhere.
              </Typography>
            </>
          }
          imageSrc={miskoWorkshop.src}
          imageAlt="Team"
          imagePosition="right"
        />

        <div className="py-16">
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
                  "We review your application and if approved, we will have a set of calls where we will help you plan your first meetup with Schroedinger Hat.",
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
        </div>

        <div className="container mx-auto max-w-7xl py-16">
          <BlackCTA
            leftContent={
              <Heading
                level={1}
                className="mb-0 font-lexend text-[80px] tracking-tight text-white"
              >
                Ready?
              </Heading>
            }
            rightContent={
              <Link
                href="https://forms.gle/25meVEFGiKU8pki7A"
                className="h-full max-w-48"
              >
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-full max-w-48"
                >
                  Register
                </Button>
              </Link>
            }
          />
        </div>

        <FaqBlock groupKey="local-community" />
      </div>
    </main>
  );
}
