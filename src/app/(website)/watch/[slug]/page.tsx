import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { YouTubePlayer } from "@/components/molecules/youtube-player";
import { sanityClient } from "@/sanity/lib/client";
import type { Author, Video } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { AuthorCard } from "@/components/molecules/author-card";
import { formatDateTime } from "@/lib/utils/date";
import { createPortableTextComponents } from "../../page/[slug]/portableTextComponents";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { getYoutubeVideoId } from "@/lib/utils/videoContent";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";

interface VideoWithAuthors extends Omit<Video, "authors"> {
  authors?: Author[];
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
  );
  return video;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleVideoPage({ params }: PageProps) {
  const { slug } = await params;
  const video = await getVideo(slug);

  if (!video) {
    notFound();
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
        <Heading level={2} className="mb-4">
          {video.title}
        </Heading>

        {/* // Must extract video id since there's no guarantes it's going to be without url */}
        <YouTubePlayer
          videoId={getYoutubeVideoId(video.youtubeId!)}
          className="mb-6"
        />

        {video.publishedAt && (
          <Heading level={3} className="mb-4">
            Published on {formatDateTime(video.publishedAt, "MMMM d, yyyy")}
          </Heading>
        )}

        {video.authors && video.authors.length > 0 && (
          <div className="mb-8 space-y-6">
            {video.authors.map((author) => (
              <AuthorCard key={author._id} author={author} />
            ))}
          </div>
        )}

        {video.description && (
          <div className="prose max-w-none">
            <PortableText
              value={video.description}
              components={createPortableTextComponents()}
            />
          </div>
        )}
      </SectionContainer>
    </main>
  );
}

export async function generateStaticParams() {
  const videos = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "video"] | order(publishedAt desc)[0...1000]{
      slug
    }`,
  );

  return videos.map((video) => ({
    slug: video.slug.current,
  }));
}
