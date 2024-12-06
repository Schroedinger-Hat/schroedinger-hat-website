import { Heading } from "@/components/atoms/typography/Heading"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { Image } from "@/components/atoms/media/Image"
import { cn } from "@/lib/utils"
import { PlayCircle02Icon } from "hugeicons-react"
import Link from "next/link"

interface VideoCardProps {
  title: string
  subtitle: string
  imageUrl: string
  className?: string
  slug?: string
}

export function VideoCard({ title, subtitle, imageUrl, className, slug }: VideoCardProps) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-lg", className)}>
      <Link href={`/watch/${slug}`}>
        <div className="group relative flex min-h-[300px] flex-col justify-end bg-gradient-to-t from-slate-900/90 to-slate-900/0 p-6">
          {/* Background Image */}
          <Image
            src={imageUrl}
            alt={title}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
            withContainer={false}
            height={400}
            width={600}
          />

          {/* Content */}
          <div className="relative z-10 max-w-2xl">
            <Heading level={3} className="mb-1 text-slate-100">
              {title}
            </Heading>

            {subtitle && <Paragraph className="mb-0 text-slate-200">{subtitle}</Paragraph>}
          </div>

          {/* Play Button center card on mouse hover , over everything*/}

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <div className="bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.4)_0%,rgba(0,0,0,0)_50%)] p-8">
              <PlayCircle02Icon className="h-14 w-14 text-slate-200" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
