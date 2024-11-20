import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { sanityClient } from "@/sanity/lib/client";
import { createPortableTextComponents } from "./portableTextComponents";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { formatDateTime } from "@/lib/utils/date";
import { Typography } from "@/components/atoms/typography/Typography";
import type { Page } from "@/sanity/sanity.types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;

  const pageData = await sanityClient.fetch<Page | null>(
    `*[_type == "page" && slug.current == $slug][0]`,
    { slug },
  );

  if (!pageData) {
    notFound();
  }

  const imageUrl = pageData.headerImage?.asset
    ? urlFor(pageData.headerImage.asset).width(1000).url()
    : null;

  return (
    <div className="container mx-auto max-w-4xl py-16">
      <Heading level={1} className="mb-4">
        {pageData.title}
      </Heading>
      {pageData.publishedAt && (
        <Typography variant="large" className="text-slate-500">
          {formatDateTime(pageData.publishedAt, "d MMMM, yyyy")}
        </Typography>
      )}
      <hr className="my-8" />
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={pageData.title!}
          width={1000}
          height={500}
          className="mb-8 h-auto w-full rounded-lg shadow-lg"
        />
      )}
      <div className="prose prose-lg max-w-none">
        <PortableText
          value={pageData.content!}
          components={createPortableTextComponents()}
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
