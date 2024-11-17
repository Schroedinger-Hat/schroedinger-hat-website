"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ImageContentProps {
  title: string;
  content: string | React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  imagePosition?: "left" | "right";
  className?: string;
}

export function ImageContent({
  title,
  content,
  imageSrc = "/placeholder.svg",
  imageAlt = "Content image",
  imagePosition = "left",
  className,
}: ImageContentProps) {
  return (
    <div className={cn("container", className)}>
      <div
        className={cn(
          "grid items-center gap-12",
          "lg:grid-cols-2",
          imagePosition === "right" && "lg:[&>*:first-child]:order-last",
        )}
      >
        <div className="relative aspect-[4/2] w-full overflow-hidden rounded-xl">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            // TODO: Width must be fixed to 668 on desktop and full on mobile
            sizes="(min-width: 1024px) 668px, 100vw"
          />
        </div>
        <div className="space-y-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {typeof content === "string" ? (
            <p className="text-muted-foreground md:text-lg">{content}</p>
          ) : (
            content
          )}
        </div>
      </div>
    </div>
  );
}
