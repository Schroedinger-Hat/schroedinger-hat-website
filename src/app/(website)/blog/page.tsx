import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import { Image } from "@/components/atoms/media/Image";
import Link from "next/link";
import { formatDateTime } from "@/lib/utils/date";
import type { Metadata } from "next";
import type { Author, BlogPost } from "@/sanity/sanity.types";
import { getAuthorFullName } from "@/lib/utils/videoContent";

// Use intersection type to define exactly what we get from the query
type BlogPostWithAuthors = BlogPost & { authors: Author[] };

export const metadata: Metadata = {
  title: "Blog | Schrödinger Hat",
  description: "Latest articles, tutorials and news from Schrödinger Hat",
};

export default async function BlogPage() {
  const posts = await sanityClient.fetch<BlogPostWithAuthors[]>(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      ...,
      "authors": authors[]->{
        firstName,
        lastName
      }
    }
  `);

  return (
    <SectionContainer size="wide">
      <Heading level={2} className="mb-8">
        Blog
      </Heading>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug!.current}`}
            className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            {post.headerImage && (
              <div className="relative aspect-[16/9] w-full overflow-hidden">
                <Image
                  src={urlFor(post.headerImage.asset)
                    .auto("format")
                    .width(800)
                    .height(450)
                    .url()}
                  alt={post.title!} // title is required by schema
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <Typography variant="small" className="mb-2 text-gray-500">
                {post.publishedAt &&
                  formatDateTime(post.publishedAt, "d MMMM, yyyy")}
              </Typography>
              <Heading level={2}>{post.title}</Heading>
              {post.excerpt && (
                <Typography className="mb-4 text-gray-600">
                  {post.excerpt}
                </Typography>
              )}
              <Typography variant="small" className="text-gray-500">
                By{" "}
                {post.authors
                  .map((author) =>
                    getAuthorFullName(author as unknown as Author),
                  )
                  .join(", ")}
              </Typography>
            </div>
          </Link>
        ))}
      </div>
    </SectionContainer>
  );
}
