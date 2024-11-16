"use client";

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
}

export function Paragraph({ children, className = "" }: ParagraphProps) {
  return (
    <p className={`mb-4 leading-relaxed text-gray-700 ${className}`}>
      {children}
    </p>
  );
}
