import { Image } from "@/components/atoms/media/Image";
import { cn } from "@/lib/utils";

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
  backgroundColor = "#5B5BFF",
  className,
}: ImageHeroProps) {
  return (
    <div className={cn("mx-auto max-w-5xl pb-24", className)}>
      <div
        className="rounded-xl text-white shadow-xl"
        style={{ backgroundColor }}
      >
        <div className="flex flex-col md:flex-row">
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={500}
            height={500}
            withContainer={false}
            className="rounded-l-xl"
          />

          <div className="flex w-full flex-col justify-end space-y-4 py-2 pl-4 md:w-1/2">
            <h1 className="mb-8 font-lexend text-[80px] font-medium leading-none tracking-[-7px] text-slate-200">
              {title}
            </h1>
            {subtitle && <div className="text-slate-200">{subtitle}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
