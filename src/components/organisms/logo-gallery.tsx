"use client";

import { Image } from "@/components/atoms/media/Image";
import { Heading } from "@/components/atoms/typography/Heading";
import { cn } from "@/lib/utils";

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
  className?: string;
  maxCols?: 2 | 3 | 4 | 5 | 6;
  imageOpacity?: 25 | 50 | 75 | 100;
}

export function LogoGallery({
  logos = [],
  blackAndWhite = false,
  title = "",
  className = "",
  maxCols = 4,
  imageOpacity = 100,
}: LogoGalleryProps) {
  const getOpacityClass = (opacity: 25 | 50 | 75 | 100) => {
    const opacityMap = {
      25: "opacity-25",
      50: "opacity-50",
      75: "opacity-75",
      100: "opacity-100",
    } as const;

    return opacityMap[opacity];
  };

  return (
    <section className={cn("w-full", className)}>
      <div className="container">
        {title && <Heading level={2}>{title}</Heading>}
        <div
          className={cn(
            "grid grid-cols-1 items-center justify-center gap-4 sm:grid-cols-2",
            {
              "md:grid-cols-3 lg:grid-cols-4": maxCols === 4,
              "md:grid-cols-3": maxCols === 3,
              "md:grid-cols-2": maxCols === 2,
              "md:grid-cols-3 lg:grid-cols-5": maxCols === 5,
              "md:grid-cols-3 lg:grid-cols-6": maxCols === 6,
            },
          )}
        >
          {logos.map((logo, index) => (
            <div
              key={index}
              className="flex items-center justify-center rounded-lg bg-slate-50 p-2"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={300}
                height={150}
                className={cn(
                  "h-24 w-auto",
                  getOpacityClass(imageOpacity),
                  blackAndWhite && "grayscale",
                )}
                withContainer={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
