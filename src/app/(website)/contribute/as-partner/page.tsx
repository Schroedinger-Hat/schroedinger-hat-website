import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { Link } from "@/components/atoms/links/Link";
import { Button } from "@/components/molecules/button";
import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import FeaturesList from "@/components/organisms/features-list";
import { ImageHero } from "@/components/organisms/image-hero";
import { sanityClient } from "@/sanity/lib/client";
import { type Partner } from "@/sanity/sanity.types";

// Images
import asPartner from "@/images/contribute/as_partner.jpg";
import {
  Knowledge01Icon,
  Mic01Icon,
  Monocle01Icon,
  Share07Icon,
  SmileIcon,
  UserMultiple02Icon,
} from "hugeicons-react";
import { BlackCTA } from "@/components/organisms/black-cta";
import { LogoGallery } from "@/components/organisms/logo-gallery";
import { urlFor } from "@/sanity/lib/image";
import { FaqBlock } from "@/components/organisms/faq-block";

export default async function BecomePartnerPage() {
  const partners: Partner[] = await sanityClient.fetch(
    `*[_type == "partner" && !isBusinessPartner] | order(orderRank asc)`,
  );

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
              Contribute <br /> as <br /> Partner
            </>
          }
          imageSrc={asPartner.src}
          imageAlt="Partner"
        />
      </SectionContainer>

      <SectionContainer size="narrow">
        <Typography>
          At Schrödinger's Hat, partnerships are built on shared values, not
          transactions. We seek collaborations with communities and media
          organizations that share our passion for open-source innovation,
          inclusivity, and giving back. Together, we aim to amplify impact,
          empower individuals, and create a more sustainable and inclusive tech
          ecosystem.
        </Typography>
        <Typography>
          We believe that true partnerships come from a shared commitment to
          making a difference. If your organization thrives on fostering
          innovation and serving the community, we’d love to explore how we can
          collaborate.
        </Typography>
      </SectionContainer>

      <SectionContainer withBackground>
        <FeaturesList
          title="Why partner with us?"
          features={[
            {
              name: "Shared Visibility",
              description:
                "Your brand featured across our events, materials, and digital platforms, emphasizing shared values.",
              icon: <Monocle01Icon className="h-10 w-10" />,
            },
            {
              name: "Community Engagement",
              description:
                "Engage with a vibrant, global audience passionate about open source and inclusivity.",
              icon: <UserMultiple02Icon className="h-10 w-10" />,
            },
            {
              name: "Event Collaboration",
              description:
                "Co-host workshops, sessions, or panels to showcase your initiatives and expertise.",
              icon: <Mic01Icon className="h-10 w-10" />,
            },
            {
              name: "Knowledge Sharing",
              description:
                "Exchange resources, ideas, and strategies to strengthen both our communities.",
              icon: <Knowledge01Icon className="h-10 w-10" />,
            },
            {
              name: "Social Impact",
              description:
                "Be part of initiatives that create a lasting, positive impact on the tech world and beyond.",
              icon: <SmileIcon className="h-10 w-10" />,
            },
            {
              name: "Network Expansion",
              description:
                "Gain access to our network of tech leaders, innovators, and change-makers to build meaningful connections.",
              icon: <Share07Icon className="h-10 w-10" />,
            },
          ]}
        />
      </SectionContainer>

      <SectionContainer size="wide">
        <BlackCTA
          leftContent={
            <Heading
              level={1}
              className="mb-0 font-lexend text-[80px] tracking-tight text-white"
            >
              Chat?
            </Heading>
          }
          rightContent={
            <Link
              href="mailto:event@schroedinger-hat.org"
              className="h-full max-w-48"
            >
              <Button size="lg" variant="secondary" className="h-full max-w-48">
                Write us
              </Button>
            </Link>
          }
        />
      </SectionContainer>

      <SectionContainer size="wide">
        <LogoGallery
          title="We partnered with"
          blackAndWhite={true}
          logos={partners
            .filter(
              (
                partner,
              ): partner is Partner & {
                image: NonNullable<Partner["image"]>;
              } => partner.image !== undefined && partner.image !== null,
            )
            .map((partner) => ({
              src: urlFor(partner.image).height(150).url(),
              alt: partner.description ?? "Partner logo",
            }))}
        />
      </SectionContainer>

      <SectionContainer size="narrow">
        <FaqBlock groupKey="partner" />
      </SectionContainer>
    </main>
  );
}
