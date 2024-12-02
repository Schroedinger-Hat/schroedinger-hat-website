import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Heading } from "../atoms/typography/Heading";

interface BlackCTAProps {
  children: React.ReactNode;
  cta: {
    text: string;
    href: string;
  };
  className?: string;
}

export function BlackCTA({ children, cta, className }: BlackCTAProps) {
  return (
    <div className={cn("rounded-xl bg-gray-900 p-8 shadow-xl", className)}>
      <div className="flex flex-col items-center justify-center gap-8 md:flex-row">
        <div className="shrink-0 text-center text-white md:text-right">
          {children}
        </div>
        <div className="flex shrink-0 items-center justify-center">
          <Button asChild className="h-full w-fit px-8" variant="secondary">
            <Link href={cta.href}>
              <Heading level={1} className="mb-1 md:mb-1">
                {cta.text}
              </Heading>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export function BlackCTAHeading({ children }: { children: React.ReactNode }) {
  return (
    <Heading
      level={1}
      className="mb-0 text-6xl text-white md:mb-0 md:text-8xl md:tracking-tight"
    >
      {children}
    </Heading>
  );
}
