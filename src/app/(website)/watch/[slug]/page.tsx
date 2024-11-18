import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { YouTubePlayer } from "@/components/molecules/youtube-player";
import { sanityClient } from "@/sanity/lib/client";
import type { Author, Video } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { AuthorCard } from "@/components/molecules/author-card";
import { formatDateTime } from "@/lib/utils/date";
import { portableTextComponents } from "../../page/[slug]/portableTextComponents";
import { BlurredBackground } from "@/components/organisms/blurred-background";

async function getVideo(slug: string) {
  const video: (Video & { authors: Author[] }) | null =
    await sanityClient.fetch(
      `*[_type == "video" && slug.current == $slug][0]{
      ...,
      "description": description,
      authors[]->{
        _id,
        _createdAt,
        _updatedAt,
        _rev,
        firstName,
        lastName,
        pronouns,
        slug,
        photo,
        title
      }
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
    <main className="container mx-auto px-4 py-8">
      <BlurredBackground
        points={2}
        // colors={["#639aff", "#f75ccb"]}
        colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
        blur={100}
        opacity={0.5}
        size={500}
        positioning="center"
        disableAnimation
      />

      <div className="mx-auto max-w-4xl">
        <Heading level={2} className="mb-4">
          {video.title}
        </Heading>

        <YouTubePlayer videoId={video.youtubeId ?? ""} className="mb-6" />

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
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
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
