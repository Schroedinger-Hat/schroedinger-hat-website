import { draftMode } from "next/headers";
import { sanityClient } from "@/sanity/lib/client";
import { type SanityImageObject } from "@sanity/image-url/lib/types/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface GalleryImage {
  _id: string;
  title: string;
  description?: string;
  image: SanityImageObject;
  category?: string;
  takenAt?: string;
  photographer?: {
    firstName: string;
    lastName: string;
  };
}

async function getGalleryImages() {
  const query = `*[_type == "galleryImage"] | order(order asc) {
    _id,
    title,
    description,
    image,
    category,
    takenAt,
    photographer->{firstName, lastName}
  }`;

  return sanityClient.fetch<GalleryImage[]>(query);
}

export default async function GalleryPage() {
  const draftModeData = await draftMode();
  const { isEnabled } = draftModeData;
  const images = await getGalleryImages();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-4xl font-bold">Photo Gallery</h1>

      {/* Category Filter */}
      <div className="mb-8">{/* Add category filter UI here if needed */}</div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images?.map((image: GalleryImage) => (
          <div
            key={image._id}
            className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              src={urlFor(image.image).url()}
              alt={image.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />

            {/* Overlay with image details */}
            <div className="absolute inset-0 flex flex-col justify-end bg-black/60 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <h3 className="font-semibold text-white">{image.title}</h3>
              {image.photographer && (
                <p className="text-sm text-white/80">
                  Photo by: {image.photographer.firstName}{" "}
                  {image.photographer.lastName}
                </p>
              )}
              {image.description && (
                <p className="mt-1 line-clamp-2 text-sm text-white/70">
                  {image.description}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {(!images || images.length === 0) && (
        <p className="text-center text-gray-500">
          No images found in the gallery.
        </p>
      )}
    </main>
  );
}
