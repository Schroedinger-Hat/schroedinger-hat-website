import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  size?: "narrow" | "medium" | "wide" | "full";
  padding?: "header" | "default" | "little" | "none";
  withBackground?: boolean;
}

const sizes = {
  narrow: "max-w-3xl",
  medium: "max-w-5xl",
  wide: "max-w-7xl",
  full: "",
};

const paddings = {
  header: "py-24",
  default: "py-16",
  little: "py-8",
  none: "py-0",
};

export function SectionContainer({
  children,
  className,
  size = "medium",
  padding = "default",
  withBackground = false,
}: SectionContainerProps) {
  const contentDiv = (
    <div
      className={cn(
        "mx-auto",
        sizes[size],
        paddings[padding],
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
