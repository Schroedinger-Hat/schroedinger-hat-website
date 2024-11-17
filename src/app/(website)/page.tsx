import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { NavHeader } from "@/components/organisms/nav-header";
import Image from "next/image";
import { LogoGallery } from "@/components/organisms/logo-gallery";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { ImageContent } from "@/components/organisms/image-content";
import { StatBlocks } from "@/components/organisms/stat-block";
import { CardSection } from "@/components/organisms/card-section";
import { Heading } from "@/components/atoms/typography/Heading";
import { TrackingCat } from "@/components/organisms/tracking-cat";
import { BlurredBackground } from "@/components/organisms/blurred-background";

// Images
import team from "@/images/homepage/team.png";
import shopCallout from "@/images/homepage/shop-callout.png";
import imageGoNord from "@/images/homepage/imageGoNord.png";
import osday from "@/images/homepage/osday.jpg";

export default async function Home() {
  const partners = await sanityClient.fetch(
    `*[_type == "partner"] | order(order asc)`,
  );

  return (
    <div>
      <div className="relative w-full pb-64 pt-32">
        <BlurredBackground
          points={2}
          // colors={["#639aff", "#f75ccb"]}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.7}
          size={500}
          positioning="center"
        />

        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h1 className="mb-8 font-lexend text-[100px] font-medium leading-none tracking-[-7px] text-slate-800">
                Where we talk <br />
                open source
              </h1>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                Schroedinger Hat is a community of open source enthusiasts,
                <br /> we organizes events and write software.
              </h2>
            </div>
            <div className="mx-auto pt-16">
              <TrackingCat />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto -mt-32 max-w-7xl py-16">
        <ImageContent
          className="py-16"
          title="The collective"
          content={
            <>
              <p>
                Basati in Toscana, Schroedinger Hat è un'organizzazione
                no-profit che diffonde l'amore per il software open source in
                tutta Europa. La nostra missione è ispirare, educare e
                connettere appassionati di tecnologie open source attraverso
                eventi gratuiti come conferenze e meetup.
              </p>
              <p>
                Contribuiamo attivamente al panorama open source. Tra i nostri
                nostri progetti spicca ImageGoNord, con oltre 1.000 stelle su
                GitHub.
              </p>
              <p>
                Guidati dai principi dell'open source, crediamo nell'accesso
                libero alla conoscenza e promuoviamo l'inclusività in ogni
                nostra iniziativa. Unisciti a noi per costruire comunità locali,
                connettere talenti e celebrare il potere del software open
                source!
              </p>
            </>
          }
          imageSrc={team.src}
          imageAlt="Team"
          imagePosition="left"
        />

        <StatBlocks
          className="py-16"
          blocks={[
            {
              number: "20k",
              title: "Reach",
              description:
                "Unique presences at our events, online and in-person",
            },
            {
              number: "100",
              title: "Speakers",
              description:
                "Industry leaders that gave a talk from one of our events stage",
            },
            {
              number: "49",
              title: "Hours of content",
              description: "Videos, podcasts, and livestreams from our events",
            },
            {
              number: "20",
              title: "Contributors",
              description: "People actively contributing to our projects",
            },
          ]}
        />
      </div>

      <div className="bg-slate-100">
        <div className="container mx-auto max-w-7xl py-24">
          <Heading className="m-0" level={2}>
            You may know us for
          </Heading>
          <ImageContent
            className="py-16"
            title="OSDay"
            content={
              <>
                <p>
                  Open Source Day is an international conference dedicated to
                  open-source solutions, scheduled for March, in Florence,
                  Italy. The event aims to introduce open-source technologies to
                  public and business institutions, promoting them as secure,
                  efficient, and cost-effective alternatives to proprietary
                  software.
                </p>
                <p>
                  Attendees, including managers, developers, and technical
                  officers from various industries, will have the opportunity to
                  exchange experiences and explore use cases in areas such as
                  virtualization, cloud computing, databases, big data, and
                  information security.
                </p>
                <p>
                  The conference serves as a platform for fostering local
                  communities and encouraging the development of small
                  businesses that provide support and development for
                  open-source solutions.
                </p>
              </>
            }
            imageSrc={osday.src}
            imageAlt="OSDay"
            imagePosition="left"
          />
          <ImageContent
            className="py-16"
            title="ImageGoNord"
            content={
              <>
                <p>
                  ImageGoNord is a SaaS tool designed to convert RGB images into
                  color palettes inspired by the NordTheme and other themes like
                  Gruvbox. The NordTheme is a well-known color palette
                  originally created for coding environments. It focuses on
                  subtle, cool tones like blue, grey, and white, offering a
                  minimalist and visually cohesive aesthetic that prioritizes
                  readability and reduces visual fatigue.
                </p>
                <p>
                  ImageGoNord allows users to upload images or videos and apply
                  these palettes to create customized wallpapers, visuals, or
                  design elements. The tool offers flexibility for users to
                  refine the output to match their preferences while maintaining
                  the selected theme's characteristics.
                </p>
              </>
            }
            imageSrc={imageGoNord.src}
            imageAlt="ImageGoNord"
            imagePosition="right"
          />
        </div>
      </div>

      <div className="container mx-auto max-w-7xl pb-24">
        <LogoGallery
          className="py-24"
          title="Community Partners"
          blackAndWhite={true}
          logos={partners.map((partner) => ({
            src: urlFor(partner.image).height(150).url(),
            alt: partner.description,
          }))}
        />

        {/* Inform user that we have on online shop where they can buy merch and t-shirts */}
        <CardSection
          className="my-8"
          topText="eCommerce"
          title="Merch and T-Shirts"
          subtitle="Wanna dress like a Schroedinger Hat fan? Visit our online shop where you can buy our merch and t-shirts."
          ctaText="Visit Shop"
          ctaHref="https://shop.schroedinger-hat.org/"
          image={shopCallout}
          variant="shop"
        />
      </div>
    </div>
  );
}
