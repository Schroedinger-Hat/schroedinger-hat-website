import { type FC } from "react";
import { cn } from "@/lib/utils";

interface BulletPointProps {
  title: string;
  features: string[];
  className?: string;
}

export const BulletPoint: FC<BulletPointProps> = ({
  title,
  features,
  className,
}) => {
  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <h2 className="text-4xl font-semibold tracking-tight">{title}</h2>

      <ul className="flex flex-col gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-3">
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <span className="text-lg">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
