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
      <div className="flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="text-center md:text-right text-white shrink-0">
          {children}
        </div>
        <div className="flex items-center justify-center shrink-0">
          <Button 
            asChild 
            className="w-fit px-8 h-full" 
            variant="secondary"
          >
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
      className="mb-0 text-white md:mb-0 md:tracking-tight text-6xl md:text-8xl"
    >
      {children}
    </Heading>
  );
}
