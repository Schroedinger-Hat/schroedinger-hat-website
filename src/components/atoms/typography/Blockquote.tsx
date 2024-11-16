"use client";

interface BlockquoteProps {
  children: React.ReactNode;
  className?: string;
}

export function Blockquote({ children, className = "" }: BlockquoteProps) {
  return (
    <blockquote
      className={`mb-4 border-l-4 border-gray-200 pl-4 italic text-gray-600 ${className}`}
    >
      {children}
    </blockquote>
  );
}
