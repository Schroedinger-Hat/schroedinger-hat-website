import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "medium" | "wide" | "full";
  padding?: "header" | "default" | "little" | "none";
  spacing?: "small" | "medium" | "large" | "none";
  withBackground?: boolean;
}

const sizes = {
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  wide: "max-w-7xl",
  full: "",
};

const paddings = {
  header: "py-16 md:py-24",
  default: "py-8 md:py-16",
  little: "py-4 md:py-8",
  none: "py-0",
};

const spacings = {
  small: "space-y-4 md:space-y-8",
  medium: "space-y-8 md:space-y-16",
  large: "space-y-16 md:space-y-24",
  none: "",
};

export function SectionContainer({
  children,
  className,
  size = "medium",
  padding = "default",
  spacing = "none",
  withBackground = false,
}: SectionContainerProps) {
  const contentDiv = (
    <div
      className={cn(
        "mx-auto px-4 md:px-0",
        sizes[size],
        paddings[padding],
        spacings[spacing],
        {
          container: size !== "full",
        },
        className,
      )}
    >
      {children}
    </div>
  );

  if (withBackground) {
    return <div className="bg-slate-100">{contentDiv}</div>;
  }

  return contentDiv;
}
