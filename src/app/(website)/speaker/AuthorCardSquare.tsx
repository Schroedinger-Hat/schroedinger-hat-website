import Link from "next/link"
import { Typography } from "@/components/atoms/typography/Typography"
import { Image } from "@/components/atoms/media/Image"
import { urlFor } from "@/sanity/lib/image"
import { getAuthorFullName, getAuthorInitials } from "@/lib/utils/videoContent"
import type { Author } from "@/sanity/sanity.types"

type AuthorCardSquareProps = {
  author: Author
}

export function AuthorCardSquare({ author }: AuthorCardSquareProps) {
  return (
    <Link
      href={`/speaker/${author.slug?.current}`}
      className="group flex flex-col items-center rounded-lg transition-colors hover:bg-slate-50"
    >
      {author.photo ? (
        <Image
          src={urlFor(author.photo).auto("format").width(200).height(200).url()}
          alt={getAuthorFullName(author)}
          width={200}
          height={200}
          className="aspect-square w-full max-w-[200px] rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
          withContainer={false}
        />
      ) : (
        <div className="flex aspect-square w-full max-w-[200px] items-center justify-center rounded-lg bg-slate-100 transition-transform group-hover:scale-105">
          <span className="text-4xl text-slate-500">{getAuthorInitials(author)}</span>
        </div>
      )}

      <div className="mt-4 text-center">
        <Typography variant="medium" weight="semibold" className="mb-0 md:mb-0">
          {getAuthorFullName(author)}
        </Typography>
        {author.title && <Typography variant="muted">{author.title}</Typography>}
      </div>
    </Link>
  )
}
