interface SanityTextBlock {
  _type?: string
  children?: Array<{
    _type?: string
    _key?: string
    text?: string
    marks?: string[]
  }>
}

/**
 * Converts Sanity Portable Text to plain text
 */
export function getPortableTextPlainText(blocks: SanityTextBlock[] | undefined): string {
  if (!blocks) return ""

  return blocks
    .map((block) => {
      if (block._type === "block" && block.children) {
        return block.children
          .map((child) => child.text)
          .filter(Boolean)
          .join("")
      }
      return ""
    })
    .filter(Boolean)
    .join(" ")
}
