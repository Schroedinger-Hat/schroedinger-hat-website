"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { Typography } from "@/components/atoms/typography/Typography";

interface ImageLabelProps {
  src: string;
  label: string;
  className?: string;
  labelClassName?: string;
}

export function ImageLabel({
  src,
  label,
  className,
  labelClassName,
}: ImageLabelProps) {
  return (
    <div
      className={cn(
        "relative aspect-square overflow-hidden rounded-lg",
        className,
      )}
    >
      <Image src={src} alt={label} fill className="object-cover" />
      <div
        className={cn(
          "absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-white px-4 py-2 shadow-lg",
          labelClassName,
        )}
      >
        <Typography variant="small" weight="medium">
          {label}
        </Typography>
      </div>
    </div>
  );
}
