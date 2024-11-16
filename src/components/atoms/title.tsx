interface TitleProps {
  children: React.ReactNode;
  className?: string;
}

export function Title({ children, className = "" }: TitleProps) {
  return <h2 className={`text-3xl font-bold ${className}`}>{children}</h2>;
}
