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
            <h1 className="mb-12 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Schroedinger Hat is where we talk about open source
            </h1>
          </div>
        </div>
      </div>

      <ImageContent />

      {/* <Debug>{partners}</Debug> */}
      <LogoGallery
        blackAndWhite={true}
        logos={partners.map((partner) => ({
          src: urlFor(partner.image).height(150).url(),
          alt: partner.description,
        }))}
      />
    </div>
  );
}
