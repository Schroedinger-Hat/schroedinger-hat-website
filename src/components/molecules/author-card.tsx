import type { Author } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Link } from "@/components/atoms/links/Link";
import { Image } from "@/components/atoms/media/Image";
import { getAuthorInitials, getAuthorFullName } from "@/lib/utils/videoContent";
import { PortableText } from "next-sanity";

interface AuthorCardProps {
  author: Author;
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null;

  return (
    <Link
      href={`/speaker/${author.slug!.current}`}
      className="hover:no-underline"
    >
      <div className="flex gap-4 rounded-lg border bg-slate-100 p-2">
        <div className="h-16 w-16 flex-shrink-0">
          {author.photo ? (
            <Image
              src={urlFor(author.photo).width(200).height(200).url()}
              alt={getAuthorFullName(author)}
              width={96}
              height={96}
              className="h-full w-full"
              rounded
              withContainer={false}
            />
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
              <span className="text-xl text-slate-500">
                {getAuthorInitials(author)}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1">
          <Heading level={4} className="mb-0">
            {getAuthorFullName(author)}
          </Heading>
          {author.title && (
            <Paragraph className="mb-0 italic">{author.title}</Paragraph>
          )}
        </div>
      </div>
    </Link>
  );
}
