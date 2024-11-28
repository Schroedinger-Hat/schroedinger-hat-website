import { Image } from "@/components/atoms/media/Image";
import { Heading } from "../atoms/typography/Heading";

interface ImageHeroProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  imageSrc: string;
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
      className="overflow-hidden rounded-xl text-white shadow-xl"
      style={{ backgroundColor }}
    >
      <div className="flex flex-col md:flex-row">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={500}
          withContainer={false}
          className="rounded-t-xl md:rounded-none"
        />

        <div className="flex w-full flex-col justify-end space-y-4 py-2 pl-4 md:w-1/2">
          <Heading level={1} boost className="text-slate-200">
            {title}
          </Heading>
          {subtitle && <div className="text-slate-200">{subtitle}</div>}
        </div>
      </div>
    </div>
  );
}
