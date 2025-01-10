import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { YouTubePlayer } from "@/components/molecules/youtube-player"
import { sanityClient } from "@/sanity/lib/client"
import type { Author, Video } from "@/sanity/sanity.types"
import { Heading } from "@/components/atoms/typography/Heading"
import { formatDateTime } from "@/lib/utils/date"
import { createPortableTextComponents } from "../../page/[slug]/portableTextComponents"
import { BlurredBackground } from "@/components/organisms/blurred-background"
import { getYoutubeVideoId } from "@/lib/utils/videoContent"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { type Metadata } from "next"
import { extractFirstParagraph } from "@/lib/seo"
import { constructMetadata } from "@/lib/utils/metadata"
import { AuthorCardSquare } from "../../speaker/AuthorCardSquare"
import { Badge } from "@/components/ui/badge"

interface VideoWithAuthors extends Omit<Video, "authors"> {
  authors?: Author[]
}

async function getVideo(slug: string) {
  const video: VideoWithAuthors | null = await sanityClient.fetch(
    `*[_type == "video" && slug.current == $slug][0]{
      ...,
      "authors": coalesce(authors[]->{
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        firstName,
        lastName,
        pronouns,
        title,
        photo,
        biography,
        slug
      }, [])
    }`,
    { slug },
  )
  return video
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const video = await getVideo(slug)
  return constructMetadata({
    title: `${video?.title} | Watch |Schrödinger Hat`,
    description: extractFirstParagraph(video?.description ?? []),
  })
}

export default async function SingleVideoPage({ params }: PageProps) {
  const { slug } = await params
  const video = await getVideo(slug)

  if (!video) {
    notFound()
  }

  return (
    <main>
      <SectionContainer size="full">
        <BlurredBackground
          points={2}
          colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
          blur={100}
          opacity={0.5}
          size={500}
          positioning="center"
          disableAnimation
        />
      </SectionContainer>

      <SectionContainer className="-mt-24" size="medium">
        <Heading level={1} className="mb-4">
          {video.title}
        </Heading>

        {/* // Must extract video id since there's no guarantes it's going to be without url */}
        <YouTubePlayer videoId={getYoutubeVideoId(video.youtubeId!)} className="mb-6" />

        {video.publishedAt && (
          <Heading level={3} className="mb-4">
            Published on {formatDateTime(video.publishedAt, "MMMM d, yyyy")}
          </Heading>
        )}

        <div className="grid grid-cols-1 gap-8 pt-4 md:grid-cols-3 md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1">
          {video.authors && video.authors.length > 0 && (
            <div className="md:col-span-1">
              <Heading level={3} className="mb-2">
                {video.authors.length > 1 ? "Speakers" : "Speaker"}
              </Heading>
              <div className="mb-8 space-y-6">
                {video.authors.map((author) => (
                  <AuthorCardSquare key={author._id} author={author} />
                ))}
              </div>
              {video.tags && video.tags.length > 0 && (
                <div className="mb-8">
                  <Heading level={3} className="mb-2">
                    Tags
                  </Heading>
                  <div className="flex flex-wrap gap-2">
                    {video.tags.map((tag) => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="md:col-span-2">
            {video.description && (
              <div className="prose max-w-none">
                <PortableText value={video.description} components={createPortableTextComponents()} />
              </div>
            )}
            {video.whyShouldWatch && (
              <div className="md:col-span-2">
                <Heading level={4} className="mb-2 pt-4">
                  Why you should watch
                </Heading>
                <div className="prose max-w-none">
                  <PortableText value={video.whyShouldWatch} components={createPortableTextComponents()} />
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}

export async function generateStaticParams() {
  const videos = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "video"] | order(publishedAt desc)[0...1000]{
      slug
    }`,
  )

  return videos.map((video) => ({
    slug: video.slug.current,
  }))
}
