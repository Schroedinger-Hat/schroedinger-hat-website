"use client";

import { type StaticImageData } from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Image } from "@/components/atoms/media/Image";

type CardVariant = "primary" | "secondary" | "gradient" | "dark" | "shop";

interface CardSectionProps {
  topText?: string;
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  image?: string | StaticImageData;
  imageAlt?: string;
  onctaClick?: () => void;
  variant?: CardVariant;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  primary: "bg-[#6366f1]",
  secondary: "bg-[#3b82f6]",
  shop: "bg-[#FFDBAF]",
  gradient: "bg-gradient-to-r from-blue-600 to-indigo-600",
  dark: "bg-gray-900",
};

const textStyles: Record<CardVariant, string> = {
  primary: "text-white",
  secondary: "text-white",
  gradient: "text-white",
  dark: "text-white",
  shop: "text-gray-900",
};

const textOpacityStyles: Record<CardVariant, string> = {
  primary: "text-white/80",
  secondary: "text-white/80",
  gradient: "text-white/80",
  dark: "text-white/80",
  shop: "text-gray-900/80",
};

export function CardSection({
  topText = "",
  title = "",
  subtitle = "",
  ctaText = "",
  ctaHref = "",
  image = "",
  imageAlt = "Section image",
  variant = "primary",
  className = "",
}: CardSectionProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl",
        variantStyles[variant],
        className,
      )}
    >
      <div className="container">
        <div className="grid min-h-[400px] items-center gap-6 md:grid-cols-2 md:gap-12">
          <div className="flex flex-col justify-center pl-16">
            <div className="space-y-2">
              <Heading
                level={3}
                className={cn(
                  "text-lg font-medium leading-none",
                  textOpacityStyles[variant],
                )}
              >
                {topText}
              </Heading>
              <Heading
                level={1}
                className={cn("tracking-tighter", textStyles[variant])}
              >
                {title}
              </Heading>
              <Paragraph
                className={cn(
                  "max-w-[400px] md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed",
                  textOpacityStyles[variant],
                )}
              >
                {subtitle}
              </Paragraph>
            </div>
            <div className="mt-2 flex flex-col gap-2 min-[400px]:flex-row">
              <Link
                href={ctaHref}
                className={cn(
                  "inline-flex h-12 items-center justify-center rounded-full px-8 text-lg font-medium shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50",
                  variant === "shop"
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "bg-white text-gray-900 hover:bg-gray-100",
                )}
              >
                {ctaText}
              </Link>
            </div>
          </div>

          <div className="flex justify-end">
            <Image
              src={typeof image === "string" ? image : image.src}
              alt={imageAlt}
              width={600}
              height={400}
              priority
              className="h-[400px]"
              withContainer={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
