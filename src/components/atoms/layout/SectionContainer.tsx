import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "medium" | "wide" | "full";
  padding?: "header" | "default";
  withBackground?: boolean;
}

const sizes = {
  narrow: "max-w-2xl",
  medium: "max-w-5xl",
  wide: "max-w-7xl",
  full: "",
};

const paddings = {
  header: "py-24",
  default: "py-16",
};

// Add a hidden div with the background class to ensure it's included in the build
const _ = "bg-slate-100";

export function SectionContainer({
  children,
  className,
  size = "medium",
  padding = "default",
  withBackground = false,
}: SectionContainerProps) {
  return (
    <div
      className={cn(
        "container mx-auto",
        sizes[size],
        paddings[padding],
        withBackground ? "bg-slate-100" : "",
        className,
      )}
    >
      {children}
    </div>
  );
}
