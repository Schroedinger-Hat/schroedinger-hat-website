import { sanityClient } from "@/sanity/lib/client"
import type { Author } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { Heading } from "@/components/atoms/typography/Heading"
import { constructMetadata } from "@/lib/utils/metadata"
import { AuthorCardSquare } from "./AuthorCardSquare"

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
            <AuthorCardSquare key={speaker._id} author={speaker} />
          ))}
        </div>
      </SectionContainer>
    </main>
  )
}
