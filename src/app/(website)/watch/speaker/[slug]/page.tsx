import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Author, Video } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { urlFor } from "@/sanity/lib/image";
import {
  getAuthorFullName,
  getAuthorInitials,
  getVideoThumbnailUrl,
} from "@/lib/utils/videoContent";
import { VideoCard } from "@/components/molecules/video-card";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Debug } from "@/components/atoms/debug";

interface AuthorWithVideos extends Author {
  videos?: Video[];
}

async function getSpeaker(slug: string) {
  const speaker: AuthorWithVideos | null = await sanityClient.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      ...,
      "videos": coalesce(*[_type == "video" && references(^._id)]{
        _id,
        title,
        youtubeId,
        slug,
        thumbnail
      }, [])
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
    <main className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl py-16">
        <div className="flex flex-col gap-8 rounded-lg p-4 md:flex-row">
          <div className="md:w-1/5">
            {speaker.photo ? (
              <Image
                src={urlFor(speaker.photo).width(400).height(400).url()}
                alt={getAuthorFullName(speaker)}
                width={200}
                height={200}
                className="aspect-square w-full max-w-[148px] rounded-full"
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

          <div className="md:w-4/5">
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
                Videos
              </Heading>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {/* <Debug>{speaker.videos}</Debug> */}
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
        </div>
      </div>
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
