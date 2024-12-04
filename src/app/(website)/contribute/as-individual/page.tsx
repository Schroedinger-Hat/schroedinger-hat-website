import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { ImageHero } from "@/components/organisms/image-hero";
import { Image } from "@/components/atoms/media/Image";
import Link from "next/link";
import { ArrowRight, Section } from "lucide-react";
import { ArrowRightIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Mail01Icon } from "hugeicons-react";
import { JobPosts } from "@/components/organisms/job-posts";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";

// Image
import asIndividual from "@/images/contribute/as_individual.jpg";
import activateMembership from "@/images/contribute/individual/activate_membership.svg";
import contributeToProjects from "@/images/contribute/individual/contribute_to_projects.svg";
import volunteerAtOurEvents from "@/images/contribute/individual/volunteer_at_our_events.svg";
import friends1 from "@/images/contribute/individual/individual_1.jpg";
import friends2 from "@/images/contribute/individual/individual_2.jpg";
import friends3 from "@/images/contribute/individual/individual_3.jpg";
import friends4 from "@/images/contribute/individual/individual_4.jpg";
import friends5 from "@/images/contribute/individual/individual_5.jpg";
import friends6 from "@/images/contribute/individual/individual_6.jpg";
import friends7 from "@/images/contribute/individual/individual_7.jpg";
import friends8 from "@/images/contribute/individual/individual_8.jpg";

export const metadata: Metadata = {
  title: "Schrödinger Hat: Contribute as Individual",
  description:
    "Learn more about how to contribute to Schrödinger Hat as an individual.",
};

export default function ContributeIndividualPage() {
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
              Contribute <br /> as <br /> Individual
            </>
          }
          imageSrc={asIndividual.src}
          imageAlt="Speaker"
        />
      </SectionContainer>

      <SectionContainer size="narrow">
        <Typography>
          Our community relies on the dedication and generosity of individual
          contributors. Whether it’s through time, expertise, or support, every
          contribution plays a vital role in sustaining and growing what we do.
          Together, we create opportunities to learn, connect, and build
          something meaningful.
        </Typography>
        <Typography>
          Your involvement, no matter the form, helps keep our projects moving
          forward and our events welcoming to all. Here are the ways you can
          contribute:
        </Typography>
      </SectionContainer>

      <SectionContainer>
        <div className="mb-8 grid grid-cols-1 gap-8">
          <div className="relative flex flex-col content-start justify-start rounded-lg bg-black p-8 md:h-[300px] md:content-end md:justify-end md:pl-80">
            <div className="flex h-full flex-col">
              <Heading level={3} className="mb-0 text-white">
                Activate a Membership
              </Heading>
              <Typography className="text-white">
                Financially support the community and help sustain our nonprofit
                initiatives.
                <br />
                As a member you are involved in steering the organization and
                help shape our future.
              </Typography>
              <div className="mt-auto pt-4">
                <Link href="/association/join">
                  <Button className="w-full sm:w-auto" variant="secondary">
                    Become a member
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
            <Image
              src={activateMembership.src}
              width={260}
              height={260}
              alt="Activate a Membership"
              className="flip-x absolute -left-2 top-1/2 hidden -translate-y-1/2 rounded-lg md:block"
              withContainer={false}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div className="relative rounded-lg bg-orange-400 p-8 md:h-[280px]">
            <div className="flex w-full flex-col md:w-1/2">
              <Heading level={3} className="mb-0 text-white">
                Volunteer
              </Heading>
              <Typography className="mb-8 text-white">
                Assist with logistics and attendee during events.
              </Typography>
              <a href="mailto:hello@schroedinger-hat.org?subject=I want to join the team">
                <Typography variant="link" className="text-white">
                  <Mail01Icon className="mr-2 inline h-5 w-5" />
                  Let us know you&apos;re it
                </Typography>
              </a>
            </div>
            <Image
              src={volunteerAtOurEvents.src}
              width={200}
              height={200}
              alt="Volunteer at our events"
              className="absolute bottom-0 right-5 hidden rounded-lg md:block"
              withContainer={false}
            />
          </div>
          <div className="relative rounded-lg bg-green-400 p-8 md:h-[280px]">
            <div className="flex w-full flex-col md:w-1/2">
              <Heading level={3} className="mb-0 text-white">
                Develop code
              </Heading>
              <Typography className="mb-8 text-white">
                Work on issues and features on our projects.
              </Typography>
              <Link href="/partecipate/projects">
                <Typography variant="link" className="text-white">
                  View active projects
                  <ArrowRightIcon className="ml-1 inline h-5 w-5" />
                </Typography>
              </Link>
            </div>
            <Image
              src={contributeToProjects.src}
              width={200}
              height={200}
              alt="Contribute to projects"
              className="absolute right-8 top-1/2 hidden -translate-y-1/2 rounded-lg md:block"
              withContainer={false}
            />
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        {/* Job Posts */}
        <JobPosts />
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer size="wide">
        <Heading level={2} className="mb-8 text-center">
          Driven by Purpose, Fueled by Fun
        </Heading>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
          {/* Row 1 */}
          <div className="hidden sm:col-span-1 sm:block"></div>
          <div className="sm:col-span-1">
            <Image
              src={friends1.src}
              alt="Image 1"
              width={200}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl"
              withContainer={false}
            />
          </div>
          <div className="sm:col-span-2">
            <Image
              src={friends2.src}
              alt="Image 2"
              width={400}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl sm:aspect-[2/1]"
              withContainer={false}
            />
          </div>
          <div className="hidden sm:col-span-1 sm:row-span-2 sm:block">
            <Image
              src={friends3.src}
              alt="Image 3"
              width={200}
              height={400}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl sm:aspect-[1/2]"
              withContainer={false}
            />
          </div>
          <div className="hidden sm:col-span-1 sm:block"></div>

          {/* Row 2 */}
          <div className="sm:col-span-1">
            <Image
              src={friends4.src}
              alt="Image 4"
              width={200}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl"
              withContainer={false}
            />
          </div>
          <div className="sm:col-span-2">
            <Image
              src={friends5.src}
              alt="Image 5"
              width={400}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl sm:aspect-[2/1]"
              withContainer={false}
            />
          </div>
          <div className="sm:col-span-1">
            <Image
              src={friends6.src}
              alt="Image 6"
              width={200}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl"
              withContainer={false}
            />
          </div>

          {/* Row 3 */}
          <div className="hidden sm:col-span-2 sm:block"></div>
          <div className="sm:col-span-2">
            <Image
              src={friends7.src}
              alt="Image 7"
              width={400}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl sm:aspect-[2/1]"
              withContainer={false}
            />
          </div>
          <div className="sm:col-span-2">
            <Image
              src={friends8.src}
              alt="Image 8"
              width={400}
              height={200}
              className="aspect-[4/3] h-full w-full rounded-lg bg-slate-200 object-cover shadow-xl sm:aspect-[2/1]"
              withContainer={false}
            />
          </div>
        </div>
      </SectionContainer>
    </main>
  );
}
