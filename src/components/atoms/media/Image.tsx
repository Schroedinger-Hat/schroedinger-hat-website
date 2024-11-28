import NextImage from "next/image";
import { cn } from "@/lib/utils";

interface ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  rounded?: boolean;
  relative?: boolean;
  withContainer?: boolean;
}

export function Image({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  rounded = false,
  relative = false,
  withContainer = true,
}: ImageProps) {
  const imageElement = (
    <NextImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      className={cn(rounded && "rounded-lg", !withContainer && className)}
    />
  );

  if (!withContainer) {
    return imageElement;
  }

  return (
    <div
      className={cn(relative && "relative", rounded && "rounded-lg", className)}
      style={{
        width: width ? `${width}px` : "100%",
        height: height ? `${height}px` : "100%",
      }}
    >
      {imageElement}
    </div>
  );
}
