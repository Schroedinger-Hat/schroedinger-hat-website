import { Heading } from "@/components/atoms/typography/Heading";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { Typography } from "@/components/atoms/typography/Typography";
import { Image } from "@/components/atoms/media/Image";
import ReviewCard from "@/components/organisms/review-card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MembershipCheckoutButton } from "./components/membership-checkout-button";

// Reviews
import reviews from "./reviews.json";

// Images
import perkBox from "@/images/membership/perk_box.svg";
import perkEarlyAccess from "@/images/membership/perk_early_access.svg";
import perkFood from "@/images/membership/perk_food.svg";
import perkVote from "@/images/membership/perk_vote.svg";

// Utility function
function getRandomReviews(reviews: any[], count: number) {
  const shuffled = [...reviews].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

export default function BecomeMemberPage() {
  // Reviews
  const selectedReviews = getRandomReviews(reviews, 12);

  return (
    <main>
      {/* Hero */}
      <div className="relative w-full overflow-visible pb-48 pt-32">
        <BlurredBackground
          points={3}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.7}
          size={300}
          positioning="center"
          canOverflow
        />

        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h1 className="mb-8 font-lexend text-[100px] font-medium leading-none tracking-[-7px] text-slate-800">
                We know...
              </h1>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                You already have a lot of subscriptions. And we don't offer you
                new Marvel contents or extra GB on the cloud.
                <br />
                <br />
                But hear us out on why you should join us.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl space-y-4">
        {/* First row - 1/4, 2/4, 1/4 split */}
        <div className="grid grid-cols-4 gap-4">
          <div className="flex h-[350px] flex-col justify-end rounded-lg bg-white pb-8 pl-16">
            <Typography variant="medium" className="text-slate-700">
              The membership is an optional paid subscription.
              <br />
              We're all volunteers so we can't offer you lots of things, but we
              can offer you a lot of love.
              <br />
              Not just love, we prepared some perks for you.
            </Typography>
          </div>

          <div className="col-span-2 h-[350px] rounded-xl bg-[#4B4EE4] p-8">
            <div className="grid h-full grid-cols-3 gap-4">
              <div className="col-span-2 overflow-hidden">
                <Image
                  src={perkEarlyAccess}
                  alt="Early access"
                  withContainer={false}
                  className="h-full object-contain"
                />
              </div>
              <div className="col-span-1 flex items-end justify-end text-right text-white">
                <Typography variant="lead" className="text-white">
                  Early access to event ticket, news and merch drops
                </Typography>
              </div>
            </div>
          </div>

          <div className="h-[350px] rounded-xl bg-[#E67E22] p-8">
            <div className="flex h-full flex-col justify-between">
              <Typography
                variant="lead"
                className="mb-4 text-center text-white"
              >
                eCommerce discounts and free shipping!
              </Typography>
              <div className="flex-1">
                <Image
                  src={perkBox}
                  alt="Early access"
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Second row - 3/6, 2/6 split */}
        <div className="grid grid-cols-8 gap-4">
          <div className="col-span-3 col-start-2 h-[350px] rounded-xl bg-[#DDA0DD] p-8">
            <div className="flex h-full flex-row">
              <div className="flex w-[140px] flex-col justify-between">
                <Typography variant="lead" className="pr-4 text-white">
                  Exclusive members
                  <br />
                  dinners
                </Typography>
                <Typography variant="small" className="pr-4 text-white">
                  *not just tacos, we promise
                </Typography>
              </div>
              <div className="overflow-hidden">
                <Image
                  src={perkFood}
                  alt="Early access"
                  className="h-full w-full object-contain"
                  withContainer={false}
                />
              </div>
            </div>
          </div>

          <div className="col-span-3 flex flex-col justify-between rounded-xl bg-[#B6D9A5] p-8">
            <div className="mb-4">
              <Image src={perkVote} alt="Early access" />
            </div>
            <p className="text-white">
              <Typography variant="lead" className="text-white">
                Exclusive members-only votations to drive our organization and
                choose speakers for our major events
              </Typography>
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl py-16 pt-24">
        <div className="text-center">
          <Heading level={2}>All this for some money</Heading>
        </div>
        <div className="rounded-xl bg-black p-8">
          <div className="flex flex-row gap-8">
            <div className="flex-1 pl-12 text-right text-white">
              <Heading
                level={1}
                className="mb-0 font-lexend text-[100px] tracking-tight text-white"
              >
                24<span className="text-[50px]">€/year</span>
              </Heading>
            </div>
            <div className="flex flex-1 flex-col justify-center text-white">
              <Typography variant="lead" className="italic text-white">
                <br />
                Not much
                <br />
                not little
              </Typography>
            </div>
          </div>
          <div className="pt-0 text-center">
            <MembershipCheckoutButton />
            <Typography variant="medium" className="pt-8 text-white">
              It keeps the lights on and help us pays for all the little things
              that you need to run a nonprofit association.
            </Typography>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl py-16">
        <div className="mb-12 text-center">
          <Heading level={2}>What people say about it</Heading>
          <Typography variant="medium">
            Truth be told, we don't have many reviews yet.
            <br />
            And your nonprofit membership is not something that you talk about
            everyday or review on Google.
            <br />
            So we asked ChatGTP to imagine what people would say about it.
          </Typography>
        </div>
        <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
          <div className="reviews-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {selectedReviews.map((review) => (
              <div key={review.name} className="flex-none snap-center">
                <ReviewCard
                  name={review.name}
                  rating={5}
                  description={review.review}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-2xl py-16">
        <div className="pb-4 text-center">
          <Heading level={2}>Still not convinced?</Heading>
          <Typography variant="medium" className="text-left">
            This is the serious part. We know you may have some questions and we
            tried to answer them here but feel free to drop us a line if you
            want to know more.
          </Typography>
        </div>
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>What you mean with "membership"</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger>What I'm donating money for</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger>Can be refunded</AccordionTrigger>
            <AccordionContent>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
              quos.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </main>
  );
}
