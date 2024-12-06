import Link from "next/link";
import { Heading } from "@/components/atoms/typography/Heading";
import { VideoCard } from "@/components/molecules/video-card";
import { sanityClient } from "@/sanity/lib/client";
import { getAuthorNames, getVideoThumbnailUrl } from "@/lib/utils/videoContent";
import type { Author, Video } from "@/sanity/sanity.types";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { cn } from "@/lib/utils";
import { constructMetadata } from "@/lib/utils/metadata";

export const metadata = constructMetadata({
  title: "Schrödinger Hat: Watch",
  description:
    "Watch Schrödinger Hat videos, talks, workshops, podcasts and more.",
});

// Update the getVideos function to be more type-safe
async function getVideos() {
  const videos: (Video & { authors: Author[] })[] =
    await sanityClient.fetch(`*[_type == "video"]{
    ...,
    authors[]->{
      _id,
      firstName,
      lastName,
      pronouns,
      slug
    }
  } | order(order asc)`);
  return videos;
}

export default async function WatchPage() {
  const videos = await getVideos();

  return (
    <main>
      <SectionContainer size="wide">
        <div className="mb-8">
          <Heading level={2} className="mb-4">
            Featured
          </Heading>
        </div>

        {/* Pick the first three featured videos and show them in row, first videos has col-span-2 the other are normals */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos
            .filter((video) => video.featured)
            .slice(0, 3)
            .map((video, index) => (
              <VideoCard
                key={video._id}
                title={video.shortTitle ?? video.title ?? ""}
                subtitle={getAuthorNames(video.authors)}
                imageUrl={getVideoThumbnailUrl(video)}
                className={cn({ "md:col-span-2": index === 0 })}
                slug={video.slug?.current ?? ""}
              />
            ))}
        </div>

        <div className="mb-8 mt-24 grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-8">
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
          <Link href="/watch" className="text-center hover:bg-slate-200">
            <Heading level={3} className="text-slate-400">
              Generic
            </Heading>
          </Link>
        </div>

        {/* Show all videos that are not featured */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {videos
            .filter((video) => !video.featured)
            .map((video) => (
              <VideoCard
                key={video._id}
                title={video.shortTitle ?? video.title ?? ""}
                subtitle={getAuthorNames(video.authors)}
                imageUrl={getVideoThumbnailUrl(video)}
                slug={video.slug?.current ?? ""}
              />
            ))}
        </div>
      </SectionContainer>
    </main>
  );
}
