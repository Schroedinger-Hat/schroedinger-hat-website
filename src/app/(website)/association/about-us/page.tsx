import { Image } from "@/components/atoms/media/Image";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { Typography } from "@/components/atoms/typography/Typography";
import { Link } from "@/components/atoms/links/Link";
import { ArrowRight, Type } from "lucide-react";
import {
  MentorIcon,
  Mic01Icon,
  SchoolTieIcon,
  UserMultipleIcon,
} from "hugeicons-react";
import { Heading } from "@/components/atoms/typography/Heading";
import { StatBlocks } from "@/components/organisms/stat-block";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Partner } from "@/sanity/sanity.types";
import { LogoGallery } from "@/components/organisms/logo-gallery";
import { TeamCard } from "@/components/organisms/team-card";
import type { TeamMember } from "@/sanity/sanity.types";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Button } from "@/components/molecules/button";

// Images
import staffSpeaker from "@/images/about/os23_staff_speaker.jpg";
import gabriMikiStage from "@/images/about/os24_gabri-miki_stage.jpg";
import joinTheTeam from "@/images/about/os24_join-the-team.jpg";
import os2Public from "@/images/about/os24_public.jpg";

export default async function AboutUsPage() {
  // Fetch business partners
  const partners: Partner[] = await sanityClient.fetch(
    `*[_type == "partner" && isBusinessPartner] | order(orderRank asc)`,
  );

  // New team members query
  const teamMembers: TeamMember[] = await sanityClient.fetch(`
    *[_type == "teamMember"] | order(name asc, surname asc) {
      ...
    }
  `);

  return (
    <main>
      {/* Hero */}
      <div className="relative w-full pb-96 pt-32">
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
              <h1 className="mb-8 font-lexend text-[100px] font-medium leading-none tracking-[-7px] text-slate-800">
                Loving Open Source since 2020
              </h1>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                We created an ever-growing community of developers and creators
                to spread our passion of open source.
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto -mt-96 max-w-7xl py-16">
        <div className="mt-24">
          <Image
            src={staffSpeaker.src}
            alt="Schroedinger Hat"
            width={1000}
            height={400}
            className="h-[400px] w-full overflow-hidden rounded-lg object-cover object-center"
            withContainer={false}
          />
        </div>

        <div className="py-16 pt-32">
          <Heading level={2} className="mb-0">
            What we do in a nutshell
          </Heading>
          <StatBlocks
            centered={false}
            className="py-16"
            blocks={[
              {
                number: <UserMultipleIcon className="h-10 w-10" />,
                title: "Meetup",
                description:
                  "Organise speakers, logistic, marketing for conferences all across Europe.",
              },
              {
                number: <MentorIcon className="h-10 w-10" />,
                title: "Workshops",
                description:
                  "We invite special guests to teach new things to our community.",
              },
              {
                number: <Mic01Icon className="h-10 w-10" />,
                title: "Podcasts",
                description:
                  "Chilling and talking about open source projects and news.",
              },
              {
                number: <SchoolTieIcon className="h-10 w-10" />,
                title: "Consulting",
                description:
                  "We help companies to organise all of the previous activities.",
              },
            ]}
          />
        </div>

        <div className="container mx-auto grid grid-cols-1 gap-4 py-16 md:grid-cols-2">
          <div className="rounded-2xl bg-[#5B5BFF] p-8 text-white">
            <div className="space-y-6">
              <Typography
                as="span"
                variant="small"
                className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-[#5B5BFF]"
              >
                Our story
              </Typography>

              <Typography
                as="h2"
                variant="h2"
                className="text-4xl font-bold leading-tight text-white"
              >
                It all started with an idea that became a family
              </Typography>

              <Typography variant="p" className="text-lg text-white opacity-90">
                We started as a group of friends who shared a passion for open
                source and technology during Covid-19 lockdown. Over time, we
                grew into a community of developers and creators who are
                dedicated to spreading the message of open source.
              </Typography>

              <br />
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-lg font-medium text-white transition-opacity hover:opacity-90"
              >
                Read post
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              src={gabriMikiStage.src}
              alt="Schroedinger Hat community members on stage"
              width={600}
              height={500}
              className="h-[500px] w-full object-cover"
              withContainer={false}
            />
          </div>
        </div>

        <div className="py-16">
          <div className="flex flex-col gap-8 lg:flex-row">
            <div className="lg:w-1/3">
              <Heading level={2}>Trusted by the big players</Heading>
              <Paragraph>
                We received sponsorship and support from industry leading
                companies to organise our events and activities.
              </Paragraph>
            </div>
            <div className="lg:flex-1">
              <LogoGallery
                title=""
                maxCols={2}
                blackAndWhite={true}
                imageOpacity={75}
                logos={partners
                  .filter(
                    (
                      partner,
                    ): partner is Partner & {
                      image: NonNullable<Partner["image"]>;
                    } => partner.image !== undefined && partner.image !== null,
                  )
                  .map((partner) => ({
                    src: urlFor(partner.image).auto("format").height(150).url(),
                    alt: partner.description ?? "Partner logo",
                  }))}
              />
            </div>
          </div>
        </div>

        <div className="py-16">
          <div className="mb-16 text-center">
            <Heading level={1}>Meet the people behind Schroedinger Hat</Heading>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <TeamCard key={member._id} member={member} />
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-200">
        <div className="container mx-auto max-w-7xl space-y-12 py-16">
          <div className="mb-16">
            <Heading level={2}>I dig it! How I can join the gang?</Heading>
          </div>

          <div className="flex flex-col items-stretch gap-4 lg:h-full lg:flex-row">
            <div className="flex-1">
              <div className="h-full rounded-2xl bg-slate-50 p-8">
                <Heading level={3}>Low Effort: Activate a Membership</Heading>
                <Paragraph>
                  If you like our idea but don't have enough time to contribute
                  and work on our projects you may consider becoming a member.
                </Paragraph>
                <Paragraph>
                  Membership requires a small fee to support our expenses and
                  gives you back some perks like early access to tickets and
                  discounts for our shop.
                </Paragraph>
                <Link href="/associazione/diventa-socio">
                  <Button className="mt-4">
                    Become a member
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="h-full overflow-hidden rounded-2xl">
                <Image
                  src={os2Public.src}
                  alt="Schroedinger Hat community members on stage"
                  width={600}
                  height={300}
                  className="h-[300px] w-full object-cover opacity-90"
                  withContainer={false}
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <Heading level={2}>or</Heading>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="flex-1">
              <div className="h-full overflow-hidden rounded-2xl">
                <Image
                  src={joinTheTeam.src}
                  alt="Schroedinger Hat community members on stage"
                  width={600}
                  height={300}
                  className="h-[300px] w-full object-cover opacity-90"
                  withContainer={false}
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="h-full rounded-2xl bg-slate-50 p-8">
                <Heading level={3}>High Effort: Join the Team</Heading>
                <Paragraph>
                  We're always looking for new people to join our team. If you
                  think you have what it takes, please send us an email.
                </Paragraph>
                <Paragraph>
                  We have no fixed roles, we just need people who are willing to
                  help us out with the organisation of our events and
                  activities.
                </Paragraph>
                <a href="mailto:hello@schroedinger-hat.org?subject=I want to join the team">
                  <Button className="mt-4">
                    Apply here
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}