import Link from "next/link";
import { Heading } from "@/components/atoms/typography/Heading";
import { VideoCard } from "@/components/molecules/video-card";
import { sanityClient } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import type { Author, Video } from "@/sanity/sanity.types";

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

// If video has a thumbnail, use it, otherwise use the youtube thumbnail
function getVideoThumbnailUrl(video: Video) {
  return video.thumbnail
    ? urlFor(video.thumbnail).width(600).height(400).url()
    : `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`;
}

export default async function WatchPage() {
  const videos = await getVideos();

  // Helper function to safely get author names
  const getAuthorNames = (authors: Author[] | undefined) => {
    if (!authors?.length) return "";
    return authors
      .map((author) => `${author.firstName} ${author.lastName}`)
      .join(", ");
  };

  return (
    <div className="container mx-auto max-w-7xl py-24">
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
              className={index === 0 ? "col-span-2" : ""}
              slug={video.slug?.current ?? ""}
            />
          ))}
      </div>

      <div className="mb-8 mt-24 flex gap-8">
        <Link href="/guarda/talks" className="text-center hover:bg-slate-200">
          <Heading level={3} className="mb-4 text-slate-800">
            Talks
          </Heading>
        </Link>
        <Link
          href="/guarda/workshops"
          className="text-center hover:bg-slate-200"
        >
          <Heading level={3} className="mb-4 text-slate-400">
            Workshops
          </Heading>
        </Link>
        <Link
          href="/guarda/podcasts"
          className="text-center hover:bg-slate-200"
        >
          <Heading level={3} className="mb-4 text-slate-400">
            Podcasts
          </Heading>
        </Link>
        <Link href="/guarda/generic" className="text-center hover:bg-slate-200">
          <Heading level={3} className="mb-4 text-slate-400">
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
    </div>
  );
}
