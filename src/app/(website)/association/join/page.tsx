import { Heading } from "@/components/atoms/typography/Heading"
import { BlurredBackground } from "@/components/organisms/blurred-background"
import { Typography } from "@/components/atoms/typography/Typography"
import { Image } from "@/components/atoms/media/Image"
import { MembershipFormModal } from "./components/membership-form-modal"
import { ReviewsSection } from "./components/reviews-section"
import { FaqBlock } from "@/components/organisms/faq-block"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { constructMetadata } from "@/lib/utils/metadata"

// Images
import perkBox from "@/images/membership/perk_box.svg"
import perkEarlyAccess from "@/images/membership/perk_early_access.svg"
import perkFood from "@/images/membership/perk_food.svg"
import perkVote from "@/images/membership/perk_vote.svg"
import { PriceCard } from "./components/price-card"
import { AnimatedSection } from "@/components/atoms/layout/AnimatedSection"
import { DURATION_TWO_FRAMES } from "@/components/atoms/layout/const"

export const metadata = constructMetadata({
  title: "Schrödinger Hat: Join Us",
  description: "Become a member of Schrödinger Hat and join our community of open source enthusiasts.",
})

export default async function BecomeMemberPage() {
  return (
    <main>
      {/* Hero */}
      <SectionContainer size="full" padding="header" notAnimated>
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
                You already have a lot of subscriptions. And we don&apos;t offer you new Marvel contents or
                extra GB on the cloud
                <br />
                <br />
                But hear us out on why you should join us
              </h2>
            </div>
          </div>
        </div>
      </SectionContainer>

      {/* Perks Desktop */}
      <SectionContainer size="wide" className="hidden space-y-4 md:block" notAnimated>
        {/* First row - stacks vertically on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <AnimatedSection className="flex flex-col justify-end rounded-lg bg-white p-6 md:h-[350px] md:p-8 md:pb-8 md:pl-16">
            <Typography variant="medium" className="text-slate-700">
              The membership is an optional paid subscription
              <br />
              We&apos;re all volunteers so we can&apos;t offer you lots of things, but we can offer you a lot
              of love
              <br />
              Ok not just love, we prepared some perks for you
            </Typography>
          </AnimatedSection>

          <AnimatedSection
            delay={DURATION_TWO_FRAMES}
            className="col-span-1 rounded-xl bg-[#4B4EE4] p-6 md:col-span-2 md:h-[350px] md:p-8"
          >
            <div className="grid h-full grid-cols-1 gap-4 md:grid-cols-3">
              <div className="col-span-1 overflow-hidden md:col-span-2">
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
          </AnimatedSection>

          <AnimatedSection
            delay={DURATION_TWO_FRAMES * 2}
            className="rounded-xl bg-[#E67E22] p-6 md:h-[350px] md:p-8"
          >
            <div className="flex h-full flex-col md:justify-between">
              <Typography variant="lead" className="mb-4 text-left text-white md:text-center">
                Merch store discounts and free shipping!
              </Typography>
              <div className="flex-1">
                <Image
                  src={perkBox}
                  alt="Early access"
                  height={210}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Second row - stacks vertically on mobile */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-8">
          <AnimatedSection
            delay={DURATION_TWO_FRAMES * 3}
            className="col-span-1 rounded-xl bg-[#DDA0DD] p-6 md:col-span-3 md:col-start-2 md:h-[350px] md:p-8"
          >
            <div className="flex h-full flex-row">
              <div className="flex w-full flex-col justify-between md:w-[140px]">
                <Typography variant="lead" className="text-white md:pr-4">
                  Members only dinners and parties
                </Typography>
                <Typography variant="small" className="hidden text-white md:block md:pr-4">
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
          </AnimatedSection>

          <AnimatedSection
            delay={DURATION_TWO_FRAMES * 4}
            className="col-span-1 flex flex-col justify-between rounded-xl bg-[#B6D9A5] p-6 md:col-span-3 md:p-8"
          >
            <div className="mb-4">
              <Image src={perkVote} alt="Early access" />
            </div>
            <Typography variant="lead" className="text-white">
              Votations to drive our organization and choose speakers for our major events
            </Typography>
          </AnimatedSection>
        </div>
      </SectionContainer>

      {/* Perks Mobile */}
      <SectionContainer size="wide" className="space-y-4 md:hidden" notAnimated>
        <div className="flex flex-col rounded-lg bg-white p-4">
          <Typography variant="medium" className="text-slate-700">
            The membership is an optional paid subscription
            <br />
            We&apos;re all volunteers so we can&apos;t offer you lots of things, but we can offer you a lot of
            love
            <br />
            Ok not just love, we prepared some perks for you
          </Typography>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-[#4B4EE4] p-6">
          <div className="flex justify-center">
            <div className="aspect-square w-1/2">
              <Image
                src={perkEarlyAccess}
                alt="Early access"
                withContainer={false}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <Typography variant="lead" className="text-center text-white">
            Early access to event ticket, news and merch drops
          </Typography>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-[#E67E22] p-6">
          <div className="flex justify-center">
            <div className="aspect-square w-1/2">
              <Image src={perkBox} alt="Merch discounts" className="h-full w-full object-contain" />
            </div>
          </div>
          <Typography variant="lead" className="text-center text-white">
            Merch store discounts and free shipping!
          </Typography>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-[#DDA0DD] p-6">
          <div className="flex justify-center">
            <div className="aspect-square w-1/2">
              <Image
                src={perkFood}
                alt="Members only dinners"
                className="h-full w-full object-contain"
                withContainer={false}
              />
            </div>
          </div>
          <div className="text-center">
            <Typography variant="lead" className="text-white">
              Members only dinners and parties
            </Typography>
            <Typography variant="small" className="text-white">
              *not just tacos, we promise
            </Typography>
          </div>
        </div>

        <div className="flex flex-col gap-4 rounded-xl bg-[#B6D9A5] p-6">
          <div className="flex justify-center">
            <div className="aspect-square w-1/2">
              <Image src={perkVote} alt="Voting rights" className="h-full w-full object-contain" />
            </div>
          </div>
          <Typography variant="lead" className="text-center text-white">
            Votations to drive our organization and choose speakers for our major events
          </Typography>
        </div>
      </SectionContainer>

      <SectionContainer size="wide">
        <div className="text-left md:text-center">
          <Heading level={2}>All this for some money</Heading>
        </div>
        <div>
          <PriceCard
            price={24}
            cta={<MembershipFormModal />}
            legalInfo="It keeps the lights on and help us pays for all the little things that you need to run a nonprofit"
            benefits={[
              "Early access to event ticket",
              "Merch store discounts",
              "Members only dinners",
              "Votations to drive our organization",
            ]}
          />
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
  )
}
