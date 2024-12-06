import { notFound } from "next/navigation"
import { sanityClient } from "@/sanity/lib/client"
import type { Author, BlogPost, Event, Video } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { Heading } from "@/components/atoms/typography/Heading"
import { Image } from "@/components/atoms/media/Image"
import { urlFor } from "@/sanity/lib/image"
import { getAuthorFullName, getAuthorInitials } from "@/lib/utils/videoContent"
import type { Metadata } from "next"
import { Typography } from "@/components/atoms/typography/Typography"
import { EventCard } from "@/app/(website)/partecipate/events/components/event-cards"
import { PortableText } from "@portabletext/react"
import { createPortableTextComponents } from "../../page/[slug]/portableTextComponents"
import { VideoCard } from "@/components/molecules/video-card"
import { getVideoThumbnailUrl } from "@/lib/utils/videoContent"
import { BlogPostCard } from "@/components/molecules/cards/BlogPostCard"
import { constructMetadata } from "@/lib/utils/metadata"
import { getPortableTextPlainText } from "@/lib/utils/sanity"

interface SpeakerPageProps {
  params: Promise<{ slug: string }>
}

type AuthorWithContent = Author & {
  blogPosts: Array<BlogPost & { authors: Author[] }>
  videoContent: Array<Video>
  events: Array<Event>
}

export async function generateMetadata({ params }: SpeakerPageProps): Promise<Metadata> {
  const { slug } = await params
  const speaker = await sanityClient.fetch<AuthorWithContent | null>(
    `*[_type == "author" && slug.current == $slug][0]{
      firstName,
      lastName,
      title,
      biography
    }`,
    { slug },
  )

  if (!speaker) return {}

  const biographyText = getPortableTextPlainText(speaker.biography)

  return constructMetadata({
    title: `${getAuthorFullName(speaker)} | Schrödinger Hat Speaker`,
    description: biographyText || `Discover all the contributions created by ${getAuthorFullName(speaker)}`,
  })
}

export default async function SpeakerPage({ params }: SpeakerPageProps) {
  const { slug } = await params

  // First fetch the speaker ID
  const speakerId = await sanityClient.fetch<string>(`*[_type == "author" && slug.current == $slug][0]._id`, {
    slug,
  })

  // Then use it in the main query
  const speaker = await sanityClient.fetch<AuthorWithContent | null>(
    `*[_type == "author" && slug.current == $slug][0]{
      firstName,
      lastName,
      title,
      biography,
      photo,
      "blogPosts": *[_type == "blogPost" && references(^._id)] | order(publishedAt desc) {
        ...,
        title,
        slug,
        headerImage,
        excerpt,
        publishedAt,
        "authors": coalesce(authors[]-> {
          _id,
          _type,
          firstName,
          lastName,
          title,
          slug,
          photo
        }, [])
      },
      "videoContent": *[_type == "video" && $id in authors[]._ref] | order(publishedAt desc) {
        _id,
        title,
        shortTitle,
        slug,
        publishedAt,
        youtubeId,
        thumbnail
      },
      "events": *[_type == "event" && references(^._id)] | order(eventPeriod.startDate desc) {
        title,
        slug,
        eventPeriod,
        location,
        cardImage,
        cover,
        background,
        coolBecause,
        series-> {
          _type,
          _ref,
          title
        }
      }
    }`,
    { slug, id: speakerId },
  )

  if (!speaker) {
    notFound()
  }

  return (
    <SectionContainer padding="none">
      {/* Author basic info */}
      <SectionContainer size="narrow">
        <div className="flex flex-col gap-8 md:flex-row md:gap-12">
          {/* Image column - fixed width on desktop */}
          <div className="md:w-[200px] md:flex-shrink-0">
            {speaker.photo ? (
              <Image
                src={urlFor(speaker.photo).width(200).height(200).url()}
                alt={getAuthorFullName(speaker)}
                width={200}
                height={200}
                className="mx-auto aspect-square w-full max-w-[200px] rounded-xl object-cover shadow-lg"
                withContainer={false}
              />
            ) : (
              <div className="mx-auto flex aspect-square w-full max-w-[200px] items-center justify-center rounded-xl bg-slate-100">
                <span className="text-6xl text-slate-500">{getAuthorInitials(speaker)}</span>
              </div>
            )}
          </div>
          {/* Content column - takes remaining space */}
          <div className="flex-1">
            <Heading level={1} className="mb-2">
              {getAuthorFullName(speaker)}
            </Heading>
            {speaker.title && (
              <Typography variant="large" className="mb-6 text-gray-600">
                {speaker.title}
              </Typography>
            )}
            {speaker.biography && (
              <Typography className="whitespace-pre-wrap">
                <PortableText value={speaker.biography} components={createPortableTextComponents()} />
              </Typography>
            )}
          </div>
        </div>
      </SectionContainer>

      {/* Author content */}
      <SectionContainer size="medium">
        {speaker.videoContent.length > 0 && (
          <>
            <Heading level={2} className="mb-4">
              Video Content
            </Heading>
            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
              {speaker.videoContent.map((video) => (
                <VideoCard
                  key={video._id}
                  title={video.shortTitle ?? video.title!}
                  subtitle={getAuthorFullName(speaker)}
                  imageUrl={getVideoThumbnailUrl(video)}
                  slug={video.slug!.current}
                />
              ))}
            </div>
          </>
        )}

        {speaker.events && speaker.events.length > 0 && (
          <>
            <Heading level={2} className="mb-4">
              Events
            </Heading>
            <div className="mb-8 grid gap-4 sm:grid-cols-2">
              {speaker.events.map((event) => (
                <EventCard key={event.slug?.current} event={event} />
              ))}
            </div>
          </>
        )}

        {speaker.blogPosts.length > 0 && (
          <>
            <Heading level={2} className="mb-4">
              Blog Posts
            </Heading>
            <div className="mb-8 grid gap-6 sm:grid-cols-2">
              {speaker.blogPosts.map((post) => (
                <BlogPostCard key={post.slug?.current} post={post} displayAuthor={false} />
              ))}
            </div>
          </>
        )}
      </SectionContainer>
    </SectionContainer>
  )
}

export async function generateStaticParams() {
  const speakers = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "author" && defined(slug.current)]{
      "slug": slug.current
    }`,
  )

  return speakers.map((speaker) => ({
    slug: speaker.slug,
  }))
}
