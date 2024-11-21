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

// Images
import os24Prize from "@/images/local-communities/os24_prize.jpg";
import miskoWorkshop from "@/images/local-communities/misko_workshop.jpg";

type FAQ = {
  _id: string;
  question: string;
  answer: any[]; // Portable Text content
};

async function getLocalCommunityFAQs(): Promise<FAQ[]> {
  return sanityClient.fetch(`
    *[_type == "faq" && groupKey == "local-community"] | order(order asc) {
      _id,
      question,
      answer
    }
  `);
}

export default async function LocalCommunitiesPage() {
  const faqs: FAQ[] = await getLocalCommunityFAQs();

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
        imageSrc={os24Prize.src}
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
          <div className="rounded-xl bg-black p-8">
            <div className="flex flex-row gap-8">
              <div className="flex-1 pl-12 text-right text-white">
                <Heading
                  level={1}
                  className="mb-0 font-lexend text-[80px] tracking-tight text-white"
                >
                  Ready?
                </Heading>
              </div>
              <div className="flex flex-1 flex-col justify-center py-8 text-white">
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
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto max-w-2xl py-16">
          <div className="pb-4 text-center">
            <Heading level={2}>FAQ</Heading>
          </div>
          <Accordion type="single" collapsible>
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={faq._id}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>
                  <PortableText value={faq.answer} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </main>
  );
}
