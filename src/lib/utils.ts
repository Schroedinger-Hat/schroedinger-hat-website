import { env } from "@/env"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const disableAnimations = env.NEXT_PUBLIC_DISABLE_ANIMATIONS === "true"
