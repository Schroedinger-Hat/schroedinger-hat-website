"use client";

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

export function ListItem({ children, className = "" }: ListItemProps) {
  return <li className={`leading-relaxed ${className}`}>{children}</li>;
}
