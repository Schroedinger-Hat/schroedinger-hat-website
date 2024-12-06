import { sanityClient } from "@/sanity/lib/client";
import type { Author, BlogPost } from "@/sanity/sanity.types";
import { getAuthorFullName } from "@/lib/utils/videoContent";
import { extractFirstParagraph } from "@/lib/seo";

type BlogPostWithAuthors = Pick<
  BlogPost,
  "title" | "slug" | "content" | "publishedAt" | "excerpt"
> & {
  authors: Array<Pick<Author, "firstName" | "lastName">>;
};

export async function GET() {
  const posts = await sanityClient.fetch<BlogPostWithAuthors[]>(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      title,
      slug,
      content,
      publishedAt,
      excerpt,
      "authors": authors[]->{
        firstName,
        lastName
      }
    }`,
  );

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ?? "https://schrodinger-hat.it";

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Schrödinger Hat Blog</title>
    <link>${baseUrl}</link>
    <description>Latest blog posts from Schrödinger Hat</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${posts
      .map(
        (post) => `
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug?.current}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug?.current}</guid>
      <pubDate>${new Date(post.publishedAt!).toUTCString()}</pubDate>
      <description><![CDATA[${
        post.excerpt ?? extractFirstParagraph(post.content)
      }]]></description>
      <author>${post.authors
        .map((author) => getAuthorFullName(author as Author))
        .join(", ")}</author>
    </item>`,
      )
      .join("\n")}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
