import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { sanityClient } from "@/sanity/lib/client";
import { createPortableTextComponents } from "../../page/[slug]/portableTextComponents";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { formatDateTime } from "@/lib/utils/date";
import { Typography } from "@/components/atoms/typography/Typography";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";
import { extractFirstParagraph } from "@/lib/seo";
import { getAuthorFullName } from "@/lib/utils/videoContent";
import type { Author, BlogPost } from "@/sanity/sanity.types";

// Add this type to ensure we get the exact fields we need from the query
type BlogPostWithAuthors = BlogPost & {
  authors: Array<Pick<Author, "firstName" | "lastName">>;
};

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await sanityClient.fetch<BlogPostWithAuthors | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title,
      content,
      "authors": authors[]->{
        firstName,
        lastName
      }
    }`,
    { slug },
  );

  if (!post) return {};

  const authors = post.authors
    .map((author) => getAuthorFullName(author as unknown as Author))
    .join(", ");

  return {
    title: `${post.title} | Schrödinger Hat Blog`,
    description: extractFirstParagraph(post.content),
    authors: [{ name: authors }],
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await sanityClient.fetch<BlogPostWithAuthors | null>(
    `*[_type == "blogPost" && slug.current == $slug][0]{
      title,
      headerImage,
      content,
      publishedAt,
      "authors": authors[]->{
        firstName,
        lastName
      }
    }`,
    { slug },
  );

  if (!post) {
    notFound();
  }

  return (
    <SectionContainer size="wide">
      <SectionContainer size="medium" padding="none">
        {post.headerImage && (
          <Image
            src={urlFor(post.headerImage.asset)
              .auto("format")
              .width(1000)
              .height(500)
              .url()}
            alt={post.title!}
            width={1000}
            height={500}
            withContainer={false}
            className="mb-8 h-auto w-full rounded-xl shadow-xl"
          />
        )}
      </SectionContainer>

      <SectionContainer padding="none" size="narrow">
        <Heading level={1} className="mb-4">
          {post.title}
        </Heading>

        <div className="mb-8 flex flex-col justify-between gap-2 text-gray-500 md:flex-row md:gap-4">
          <Typography variant="large">
            By{" "}
            {post.authors
              .map((author) => getAuthorFullName(author as unknown as Author))
              .join(", ")}
          </Typography>
          <Typography variant="large">
            {formatDateTime(post.publishedAt, "d MMMM, yyyy")}
          </Typography>
        </div>

        <hr className="my-8" />

        <div className="prose prose-lg max-w-none">
          <PortableText
            value={post.content ?? []}
            components={createPortableTextComponents()}
          />
        </div>
      </SectionContainer>
    </SectionContainer>
  );
}

export async function generateStaticParams() {
  const posts = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "blogPost"]{slug}`,
  );

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}
