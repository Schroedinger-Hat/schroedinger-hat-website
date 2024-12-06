import { sanityClient } from "@/sanity/lib/client"
import type { Author } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { Heading } from "@/components/atoms/typography/Heading"
import { Image } from "@/components/atoms/media/Image"
import { urlFor } from "@/sanity/lib/image"
import { getAuthorFullName, getAuthorInitials } from "@/lib/utils/videoContent"
import Link from "next/link"
import { Typography } from "@/components/atoms/typography/Typography"
import { constructMetadata } from "@/lib/utils/metadata"

export const metadata = constructMetadata({
  title: "Speakers | Schrödinger Hat",
  description: "Meet our amazing speakers and community contributors",
})

async function getSpeakers() {
  const speakers = await sanityClient.fetch<Author[]>(
    `*[_type == "author" && defined(slug.current)] | order(firstName asc, lastName asc) {
      _id,
      firstName,
      lastName,
      title,
      photo,
      slug
    }`,
  )
  return speakers
}

export default async function SpeakersPage() {
  const speakers = await getSpeakers()

  return (
    <main>
      <SectionContainer>
        <Heading level={2} className="mb-8 md:mb-8">
          We hosted
        </Heading>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-8 lg:grid-cols-5">
          {speakers.map((speaker) => (
            <Link
              key={speaker._id}
              href={`/speaker/${speaker.slug?.current}`}
              className="group flex flex-col items-center rounded-lg transition-colors hover:bg-slate-50"
            >
              {speaker.photo ? (
                <Image
                  src={urlFor(speaker.photo).width(200).height(200).url()}
                  alt={getAuthorFullName(speaker)}
                  width={200}
                  height={200}
                  className="aspect-square w-full max-w-[200px] rounded-xl object-cover shadow-sm transition-transform group-hover:scale-105"
                  withContainer={false}
                />
              ) : (
                <div className="flex aspect-square w-full max-w-[200px] items-center justify-center rounded-lg bg-slate-100 transition-transform group-hover:scale-105">
                  <span className="text-4xl text-slate-500">{getAuthorInitials(speaker)}</span>
                </div>
              )}

              <div className="mt-4 text-center">
                <Typography variant="medium" weight="semibold" className="mb-0 md:mb-0">
                  {getAuthorFullName(speaker)}
                </Typography>
                {speaker.title && <Typography variant="muted">{speaker.title}</Typography>}
              </div>
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  )
}
