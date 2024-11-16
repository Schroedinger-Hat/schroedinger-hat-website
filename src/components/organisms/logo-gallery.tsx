"use client";

import { Image } from "@/components/atoms/media/Image";
import { Heading } from "@/components/atoms/typography/Heading";

interface Logo {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

interface LogoGalleryProps {
  logos: Logo[];
  blackAndWhite?: boolean;
  title?: string;
}

export function LogoGallery(
  { logos, blackAndWhite = false, title = "" }: LogoGalleryProps = {
    logos: [],
    blackAndWhite: false,
    title: "",
  },
) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        {title && (
          <Heading level={2} className="mb-8">
            {title}
          </Heading>
        )}
        <div className="grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-slate-50 p-8"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={300}
                height={150}
                className={`h-16 w-auto ${blackAndWhite ? "grayscale" : ""}`}
                withContainer={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
