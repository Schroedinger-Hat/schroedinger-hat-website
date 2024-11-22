import { cn } from "@/lib/utils";

interface BlackCTAProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export function BlackCTA({
  leftContent,
  rightContent,
  className,
}: BlackCTAProps) {
  return (
    <div className={cn("rounded-xl bg-black p-8", className)}>
      <div className="flex flex-row gap-8">
        <div className="flex-1 pl-12 text-right text-white">{leftContent}</div>
        <div className="flex flex-1 flex-col justify-center py-8 text-white">
          {rightContent}
        </div>
      </div>
    </div>
  );
}
