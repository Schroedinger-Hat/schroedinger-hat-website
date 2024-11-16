import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { sanityClient } from "@/sanity/lib/client";
import Image from "next/image";
import { PageData } from "./types";
import { portableTextComponents } from "./components";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const pageData = await sanityClient.fetch<PageData | null>(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
  );

  if (!pageData) {
    notFound();
  }

  const imageUrl = pageData.headerImage?.asset
    ? urlFor(pageData.headerImage.asset as SanityImageSource)
        .width(1000)
        .url()
    : null;

  return (
    <div className="container mx-auto max-w-4xl py-32">
      <h1 className="mb-12 text-4xl font-bold">{pageData.title}</h1>
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={pageData.title}
          width={1000}
          height={500}
          className="mb-8 h-auto w-full rounded-lg shadow-lg"
        />
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText
          value={pageData.content}
          components={portableTextComponents}
        />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "page"]{slug}`,
  );

  return pages.map((page) => ({
    slug: page.slug.current,
  }));
}
