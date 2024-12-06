import { Image } from "@/components/atoms/media/Image";
import { Heading } from "../atoms/typography/Heading";
import { Typography } from "../atoms/typography/Typography";
import { type StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface ImageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  imageSrc: string | StaticImageData;
  imageAlt: string;
  backgroundColor?: string;
  className?: string;
}

export function ImageHero({
  title,
  subtitle,
  imageSrc,
  imageAlt,
  backgroundColor = "#C81824",
  className,
}: ImageHeroProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl text-white shadow-xl",
        className,
      )}
      style={{ backgroundColor }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-1/2">
          <div className="aspect-[4/3] md:aspect-square">
            <Image
              src={imageSrc}
              alt={imageAlt}
              priority
              width={550}
              height={550}
              withContainer={false}
              className="rounded-t-xl object-cover md:rounded-none md:rounded-l-xl"
            />
          </div>
        </div>

        <div className="flex w-full flex-col justify-end space-y-4 p-4 md:w-1/2">
          <Heading level={1} boost className="text-slate-200">
            {title}
          </Heading>
          {subtitle && (
            <Typography as="span" className="text-slate-200">
              {subtitle}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
}
