"use client";

interface ListProps {
  children: React.ReactNode;
  variant: "bullet" | "number";
  className?: string;
}

export function List({ children, variant, className = "" }: ListProps) {
  const baseStyles = "mb-4 ml-4 space-y-2 text-gray-700";
  const Component = variant === "bullet" ? "ul" : "ol";
  const listStyles = variant === "bullet" ? "list-disc" : "list-decimal";

  return (
    <Component className={`${baseStyles} ${listStyles} ${className}`}>
      {children}
    </Component>
  );
}
