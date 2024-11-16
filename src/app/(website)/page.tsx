import Link from "next/link";
import { LatestPost } from "@/app/_components/post";
import { api, HydrateClient } from "@/trpc/server";
import { NavHeader } from "@/components/nav-header";
import Image from "next/image";
import { LogoGallery } from "@/components/logo-gallery";
import { sanityClient } from "@/sanity/lib/client";
import { Debug } from "@/components/debug";
import { urlFor } from "@/sanity/lib/image";
import { ImageContent } from "@/components/image-content";

export default async function Home() {
  const partners = await sanityClient.fetch(
    `*[_type == "partner"] | order(order asc)`,
  );

  return (
    <div>
      <div className="relative w-full overflow-hidden bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h1 className="mb-8 text-[100px] font-medium leading-none tracking-[-7px] text-slate-800">
                Where we talk <br />
                open source
              </h1>
              <h2 className="text-[22px] font-normal text-slate-800">
                Schroedinger Hat is an online community of open source
                enthusiasts,
                <br /> we organizes events and write software.
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl py-16">
        {/* <ImageContent /> */}

        <LogoGallery
          title="Community Partners"
          blackAndWhite={true}
          logos={partners.map((partner) => ({
            src: urlFor(partner.image).height(150).url(),
            alt: partner.description,
          }))}
        />
      </div>
    </div>
  );
}
