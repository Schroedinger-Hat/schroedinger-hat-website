import type { PortableTextBlock } from "@sanity/types";

/**
 * Converts Sanity Portable Text to plain text
 */
export function getPortableTextPlainText(
  blocks: PortableTextBlock[] | undefined,
): string {
  if (!blocks) return "";

  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children
          .map((child) => child.text)
          .filter(Boolean)
          .join("");
      }
      return "";
    })
    .filter(Boolean)
    .join(" ");
}
