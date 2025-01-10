import Image from "next/image"
import { Heading } from "../atoms/typography/Heading"

interface ImageCardProps {
  image: string
  title: string
  content?: React.ReactNode
}

export default function ImageCard({ image, title, content }: ImageCardProps) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Content Card */}
      <div className="absolute right-0 top-0 h-full w-1/2 p-4 md:w-1/3">
        <div className="h-full rounded-lg bg-white/95 p-4 shadow-lg backdrop-blur-sm">
          <Heading level={2} className="mt-2">
            {title}
          </Heading>
          {content}
        </div>
      </div>
    </div>
  )
}
