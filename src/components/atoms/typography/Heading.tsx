"use client";

interface HeadingProps {
  level?: 1 | 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

export function Heading({ level = 1, children, className = "" }: HeadingProps) {
  const baseStyles =
    "font-medium text-gray-900 font-lexend tracking-tighter text-slate-800";
  const styles = {
    1: `mb-6 text-5xl ${baseStyles}`,
    2: `mb-5 text-3xl ${baseStyles}`,
    3: `mb-4 text-2xl ${baseStyles}`,
    4: `mb-4 text-xl ${baseStyles}`,
  };

  const Component = `h${level}` as const;

  return (
    <Component className={`${styles[level]} ${className}`}>
      {children}
    </Component>
  );
}
