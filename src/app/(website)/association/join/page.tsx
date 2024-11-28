import { Heading } from "@/components/atoms/typography/Heading";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { Typography } from "@/components/atoms/typography/Typography";
import { Image } from "@/components/atoms/media/Image";
import { MembershipCheckoutButton } from "./components/membership-checkout-button";
import { ReviewsSection } from "./components/reviews-section";
import { FaqBlock } from "@/components/organisms/faq-block";
import { sanityClient } from "@/sanity/lib/client";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";

// Images
import perkBox from "@/images/membership/perk_box.svg";
import perkEarlyAccess from "@/images/membership/perk_early_access.svg";
import perkFood from "@/images/membership/perk_food.svg";
import perkVote from "@/images/membership/perk_vote.svg";

// Add these types at the top of the file
type FAQ = {
  _id: string;
  question: string;
  answer: any[]; // Portable Text content
};

// Add this query function
async function getMembershipFAQs(): Promise<FAQ[]> {
  return sanityClient.fetch(`
    *[_type == "faq" && groupKey == "membership"] | order(order asc) {
      _id,
      question,
      answer
    }
  `);
}

export const metadata: Metadata = {
  title: "Schrödinger Hat: Join the Association",
  description: "Learn more about how to join Schroedinger Hat as a member.",
};

export default async function BecomeMemberPage() {
  const faqs: FAQ[] = await getMembershipFAQs();

  return (
    <main>
      {/* Hero */}
      <SectionContainer size="full">
        <div>
          <BlurredBackground
            points={3}
            colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
            blur={100}
            opacity={0.7}
            size={300}
            positioning="center"
            canOverflow
          />
        </div>

        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <Heading level={1} huge={true}>
                We know...
              </Heading>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                You already have a lot of subscriptions. And we don't offer you
                new Marvel contents or extra GB on the cloud
                <br />
                <br />
                But hear us out on why you should join us
              </h2>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer size="wide" className="space-y-4">
        {/* First row - stacks vertically on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="flex flex-col justify-end rounded-lg bg-white p-6 md:h-[350px] md:p-8 md:pb-8 md:pl-16">
            <Typography variant="medium" className="text-slate-700">
              The membership is an optional paid subscription
              <br />
              We're all volunteers so we can't offer you lots of things, but we
              can offer you a lot of love
              <br />
              Not just love, we prepared some perks for you
            </Typography>
          </div>

          <div className="col-span-1 rounded-xl bg-[#4B4EE4] p-6 md:col-span-2 md:h-[350px] md:p-8">
            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
              <div className="col-span-1 hidden overflow-hidden md:col-span-2 md:block">
                <Image
                  src={perkEarlyAccess}
                  alt="Early access"
                  withContainer={false}
                  className="h-full object-contain"
                />
              </div>
              <div className="col-span-1 flex text-white md:items-end md:justify-end md:text-right">
                <Typography variant="lead" className="text-white">
                  Early access to event ticket, news and merch drops
                </Typography>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-[#E67E22] p-6 md:h-[350px] md:p-8">
            <div className="flex h-full flex-col md:justify-between">
              <Typography
                variant="lead"
                className="mb-4 text-left text-white md:text-center"
              >
                eCommerce discounts and free shipping!
              </Typography>
              <div className="hidden flex-1 md:block">
                <Image
                  src={perkBox}
                  alt="Early access"
                  height={210}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second row - stacks vertically on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
          <div className="col-span-1 rounded-xl bg-[#DDA0DD] p-6 md:col-span-3 md:col-start-2 md:h-[350px] md:p-8">
            <div className="flex h-full flex-row">
              <div className="flex w-full flex-col justify-between md:w-[140px]">
                <Typography variant="lead" className="text-white md:pr-4">
                  Members dinners and parties
                </Typography>
                <Typography
                  variant="small"
                  className="hidden text-white md:block md:pr-4"
                >
                  *not just tacos, we promise
                </Typography>
              </div>
              <div className="hidden overflow-hidden md:block">
                <Image
                  src={perkFood}
                  alt="Early access"
                  className="h-full w-full object-contain"
                  withContainer={false}
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 flex flex-col justify-between rounded-xl bg-[#B6D9A5] p-6 md:col-span-3 md:h-[350px] md:p-8">
            <div className="mb-4 hidden md:block">
              <Image src={perkVote} alt="Early access" />
            </div>
            <p className="text-white">
              <Typography variant="lead" className="text-white">
                Votations to drive our organization and choose speakers for our
                major events
              </Typography>
            </p>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer size="wide">
        <div className="text-left md:text-center">
          <Heading level={2}>All this for some money</Heading>
        </div>
        <div className="rounded-xl bg-black p-8">
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="text-left text-white md:flex-1 md:pl-12 md:text-right">
              <Heading
                level={1}
                className="mb-0 font-lexend text-[100px] tracking-tight text-white"
              >
                24<span className="text-[50px]">€/year</span>
              </Heading>
            </div>
            <div className="flex flex-col justify-center text-white md:flex-1">
              <Typography variant="lead" className="italic text-white">
                <br />
                Not much
                <br />
                not little
              </Typography>
            </div>
          </div>
          <div className="pt-0 text-left md:text-center">
            <MembershipCheckoutButton />
            <Typography variant="medium" className="pt-8 text-white">
              It keeps the lights on and help us pays for all the little things
              that you need to run a nonprofit association.
            </Typography>
          </div>
        </div>
      </SectionContainer>

      <ReviewsSection />

      <SectionContainer size="narrow">
        <FaqBlock
          groupKey="membership"
          title="Still not convinced?"
          description="This is the serious part. We know you may have some questions and we tried to answer them here but feel free to drop us a line if you want to know more."
        />
      </SectionContainer>
    </main>
  );
}
