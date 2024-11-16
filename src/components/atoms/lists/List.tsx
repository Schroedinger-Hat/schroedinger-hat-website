"use client";

import { cn } from "@/lib/utils";

interface ListProps {
  children: React.ReactNode;
  variant: "bullet" | "number";
  className?: string;
}

export function List({ children, variant, className }: ListProps) {
  const Component = variant === "bullet" ? "ul" : "ol";

  return (
    <Component
      className={cn(
        "mb-4 ml-4 space-y-2 text-gray-700",
        variant === "bullet" ? "list-disc" : "list-decimal",
        className,
      )}
    >
      {children}
    </Component>
  );
}
