import Link from "next/link"
import { Heading } from "@/components/atoms/typography/Heading"
import { VideoCard } from "@/components/molecules/video-card"
import { sanityClient } from "@/sanity/lib/client"
import { getAuthorNames, getVideoThumbnailUrl } from "@/lib/utils/videoContent"
import type { Author, Video } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { cn } from "@/lib/utils"
import { constructMetadata } from "@/lib/utils/metadata"
import { AnimatedSection } from "@/components/atoms/layout/AnimatedSection"
import { DURATION_ONE_FRAME } from "@/components/atoms/layout/const"

export const metadata = constructMetadata({
  title: "Schrödinger Hat: Watch",
  description: "Watch Schrödinger Hat videos, talks, workshops, podcasts and more.",
})

// Update the getVideos function to be more type-safe
async function getVideos() {
  const videos: (Video & { authors: Author[] })[] = await sanityClient.fetch(`*[_type == "video"]{
    ...,
    authors[]->{
      _id,
      firstName,
      lastName,
      pronouns,
      slug
    }
  } | order(order asc)`)
  return videos
}

export default async function WatchPage() {
  const videos = await getVideos()

  const allFeaturedVideos = videos.filter((video) => video.featured)
  const featuredVideos = allFeaturedVideos.slice(0, 3)
  const otherVideos = [...allFeaturedVideos.slice(3), ...videos.filter((video) => !video.featured)]

  return (
    <main>
      <SectionContainer size="wide">
        <Heading level={2} className="mb-4">
          Featured
        </Heading>

        {/* Pick the first three featured videos and show them in row, first videos has col-span-2 the other are normals */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {featuredVideos.map((video, index) => (
            <AnimatedSection
              key={video._id}
              delay={index * DURATION_ONE_FRAME}
              className={cn({ "md:col-span-2": index === 0 })}
            >
              <VideoCard
                title={video.shortTitle ?? video.title ?? ""}
                subtitle={getAuthorNames(video.authors)}
                imageUrl={getVideoThumbnailUrl(video, index !== 0)}
                slug={video.slug?.current ?? ""}
              />
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>

      <SectionContainer padding="none" className="hidden">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-8">
          <Link href="/watch" className="text-center hover:bg-slate-200">
            <Heading level={3} className="text-slate-800">
              Talks
            </Heading>
          </Link>
          <Link href="/watch" className="text-center hover:bg-slate-200">
            <Heading level={3} className="text-slate-400">
              Workshops
            </Heading>
          </Link>
          <Link href="/watch" className="text-center hover:bg-slate-200">
            <Heading level={3} className="text-slate-400">
              Podcasts
            </Heading>
          </Link>
        </div>
      </SectionContainer>

      {/* Show all videos that are not featured */}
      <SectionContainer size="wide" padding="little">
        <Heading level={2} className="mb-4">
          Talks
        </Heading>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {otherVideos.map((video, index) => (
            <AnimatedSection key={video._id} delay={(featuredVideos.length + index) * DURATION_ONE_FRAME}>
              <VideoCard
                title={video.shortTitle ?? video.title ?? ""}
                subtitle={getAuthorNames(video.authors)}
                imageUrl={getVideoThumbnailUrl(video, true)}
                slug={video.slug?.current ?? ""}
              />
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>
    </main>
  )
}
