import Image, { type StaticImageData } from "next/image"
import { cn } from "@/lib/utils"
import { Heading } from "../atoms/typography/Heading"
import { Typography } from "../atoms/typography/Typography"

interface ImageContentProps {
  title: string
  content: string | React.ReactNode
  imageSrc: string | StaticImageData
  imageAlt: string
  imagePosition?: "left" | "right"
  className?: string
}

export function ImageContent({
  title,
  content,
  imageSrc,
  imageAlt,
  imagePosition = "left",
  className,
}: ImageContentProps) {
  return (
    <div className={cn("container", className)}>
      <div
        className={cn(
          "grid items-center gap-12",
          "lg:grid-cols-2",
          imagePosition === "right" ? "lg:[&>*:first-child]:order-last" : "",
          "[&>*:nth-child(2)]:order-last lg:[&>*:nth-child(2)]:order-none",
        )}
      >
        <div className="relative aspect-[4/2] w-full overflow-hidden rounded-xl shadow-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 668px, 100vw"
          />
        </div>
        <div className="space-y-6">
          <Heading level={2} className="m-0">
            {title}
          </Heading>
          {typeof content === "string" ? <Typography variant="muted">{content}</Typography> : content}
        </div>
      </div>
    </div>
  )
}
