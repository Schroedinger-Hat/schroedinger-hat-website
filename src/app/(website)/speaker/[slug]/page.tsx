import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Author, Video, Event } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { urlFor } from "@/sanity/lib/image";
import {
  getAuthorFullName,
  getAuthorInitials,
  getVideoThumbnailUrl,
} from "@/lib/utils/videoContent";
import { VideoCard } from "@/components/molecules/video-card";
import { EventCard } from "@/app/(website)/partecipate/events/components/event-cards";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";
import { extractFirstParagraph } from "@/lib/seo";

interface AuthorWithVideosAndEvents extends Author {
  videos?: Video[];
  events?: Event[];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const speaker = await getSpeaker(slug);
  return {
    title: `${speaker?.title} | Speaker | Schroedinger Hat`,
    description: extractFirstParagraph(speaker?.biography ?? []),
  };
}

async function getSpeaker(slug: string) {
  const speaker: AuthorWithVideosAndEvents | null = await sanityClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      ...,
      "videos": coalesce(*[_type == "video" && references(^._id)]{
        _id,
        title,
        youtubeId,
        slug,
        thumbnail
      }, []),
      "events": coalesce(*[_type == "event" && references(^._id)]{
        _id,
        title,
        slug,
        cover,
        eventPeriod,
        location
      } | order(eventPeriod.startDate desc), [])
    }`,
    { slug },
  );
  return speaker;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SpeakerPage({ params }: PageProps) {
  const { slug } = await params;
  const speaker = await getSpeaker(slug);

  if (!speaker) {
    notFound();
  }

  return (
    <main>
      <SectionContainer>
        <div className="flex flex-col gap-8 rounded-lg p-4 md:flex-row">
          <div className="md:w-1/6">
            {speaker.photo ? (
              <Image
                src={urlFor(speaker.photo).width(400).height(400).url()}
                alt={getAuthorFullName(speaker)}
                width={200}
                height={200}
                className="aspect-square w-full max-w-[148px] rounded-2xl"
                withContainer={false}
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-full bg-slate-100">
                <span className="text-4xl text-slate-500">
                  {getAuthorInitials(speaker)}
                </span>
              </div>
            )}
          </div>

          <div className="md:w-5/6">
            <Heading level={1} className="mb-1">
              {getAuthorFullName(speaker)}
            </Heading>

            {speaker.title && (
              <Heading level={3} className="mb-8 italic">
                {speaker.title}
              </Heading>
            )}

            {speaker.biography && (
              <div className="prose max-w-none">
                <PortableText value={speaker.biography} />
              </div>
            )}
          </div>
        </div>
        <div className="pt-8">
          {speaker.videos && speaker.videos.length > 0 && (
            <div className="mt-8">
              <Heading level={2} className="mb-4">
                Talks
              </Heading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {speaker.videos.map((video) => (
                  <VideoCard
                    key={video._id}
                    title={video.title!}
                    subtitle={""}
                    imageUrl={getVideoThumbnailUrl(video)}
                    slug={video.slug?.current ?? ""}
                  />
                ))}
              </div>
            </div>
          )}

          {speaker.events && speaker.events.length > 0 && (
            <div className="mt-12">
              <Heading level={2} className="mb-4">
                Events
              </Heading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {speaker.events.map((event) => (
                  <EventCard key={event._id} event={event} />
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionContainer>
    </main>
  );
}

export async function generateStaticParams() {
  const authors = await sanityClient.fetch<
    Array<{ slug: { current: string } }>
  >(
    `*[_type == "author"] {
      slug
    }`,
  );

  return authors.map((author) => ({
    slug: author.slug.current,
  }));
}
