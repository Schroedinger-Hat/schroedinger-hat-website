"use client";

import { cn } from "@/lib/utils";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className }: HeadingProps) {
  const baseStyles =
    "font-medium text-gray-900 font-lexend tracking-tighter text-slate-800";
  const levelStyles = {
    1: "mb-6 text-5xl",
    2: "mb-5 text-3xl",
    3: "mb-4 text-2xl",
    4: "mb-4 text-xl",
  };

  const Component = `h${level}` as const;

  return (
    <Component className={cn(baseStyles, levelStyles[level], className)}>
      {children}
    </Component>
  );
}
