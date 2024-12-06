import Link from "next/link";
import { Image } from "@/components/atoms/media/Image";
import { Typography } from "@/components/atoms/typography/Typography";
import { Heading } from "@/components/atoms/typography/Heading";
import { urlFor } from "@/sanity/lib/image";
import { formatDateTime } from "@/lib/utils/date";
import { getAuthorFullName } from "@/lib/utils/videoContent";
import type { BlogPost, Author } from "@/sanity/sanity.types";

interface BlogPostCardProps {
  post: BlogPost & { authors: Author[] };
  displayAuthor?: boolean;
}

export function BlogPostCard({
  post,
  displayAuthor = true,
}: BlogPostCardProps) {
  return (
    <Link
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
            alt={post.title!}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="p-6">
        <Typography variant="small" className="mb-2 text-gray-500">
          {post.publishedAt && formatDateTime(post.publishedAt, "d MMMM, yyyy")}
        </Typography>
        <Heading level={2}>{post.title}</Heading>
        {post.excerpt && (
          <Typography className="mb-4 text-gray-600">{post.excerpt}</Typography>
        )}
        {displayAuthor && post.authors.length > 0 && (
          <Typography variant="small" className="text-gray-500">
            By{" "}
            {post.authors
              .map((author) => getAuthorFullName(author as unknown as Author))
              .join(", ")}
          </Typography>
        )}
      </div>
    </Link>
  );
}
