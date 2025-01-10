import type { Author } from "@/sanity/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { Heading } from "@/components/atoms/typography/Heading"
import { Link } from "@/components/atoms/links/Link"
import { Image } from "@/components/atoms/media/Image"
import { getAuthorInitials, getAuthorFullName } from "@/lib/utils/videoContent"
import { Typography } from "../atoms/typography/Typography"

interface AuthorCardProps {
  author: Author
}

export function AuthorCard({ author }: AuthorCardProps) {
  if (!author) return null

  return (
    <Link href={`/speaker/${author.slug!.current}`} className="hover:no-underline">
      <div className="flex overflow-hidden rounded-lg bg-white">
        <div className="aspect-square w-20 flex-shrink-0">
          {author.photo ? (
            <Image
              src={urlFor(author.photo).width(200).height(200).url()}
              alt={getAuthorFullName(author)}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              withContainer={false}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-100">
              <span className="text-xl text-slate-500">{getAuthorInitials(author)}</span>
            </div>
          )}
        </div>
        <div className="flex-1 px-4 py-1">
          <Heading level={4} className="mb-0 md:mb-0">
            {getAuthorFullName(author)}
          </Heading>
          {author.title && (
            <Typography variant="muted" className="italic">
              {author.title}
            </Typography>
          )}
        </div>
      </div>
    </Link>
  )
}
