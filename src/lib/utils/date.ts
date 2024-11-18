import { format as formatDate, parseISO } from "date-fns";

export function formatDateTime(
  date: string | Date | undefined,
  formatStr = "MMMM d, yyyy",
): string {
  if (!date) return "";

  const dateObj = typeof date === "string" ? parseISO(date) : date;
  return formatDate(dateObj, formatStr);
}
