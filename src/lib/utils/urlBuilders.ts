import { BASE_URL } from "./withFullUrl"

/**
 * Content types supported in the application
 */
export type ContentType =
  // Static pages
  | "home"
  | "about-us"
  | "join"
  | "press-kit"
  | "as-individual"
  | "as-partner"
  | "as-speaker"
  | "as-sponsor"
  | "local-communities"
  | "projects"
  | "speakers"
  | "watch"
  // Dynamic content types
  | "page"
  | "blog"
  | "speaker"
  | "event"
  | "video"

/**
 * Encodes special characters in URLs for XML compatibility
 * Used to ensure URLs are properly escaped
 */
export function encodeUrl(url: string): string {
  return url
    .replace(/&/g, "&amp;")
    .replace(/'/g, "&apos;")
    .replace(/"/g, "&quot;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
}

/**
 * Builds a full URL based on content type and slug (for dynamic content)
 * @param type The content type
 * @param slug Optional slug for dynamic content types
 * @param encode Whether to XML-encode the URL (default: false)
 * @returns The full URL
 */
export function buildUrl(type: ContentType, slug?: string, encode = false): string {
  let url: string

switch (slug) {
    case "about-us":
      url = `${BASE_URL}/association/about-us`
      break
    case "join":
      url = `${BASE_URL}/association/join`
      break
    case "press-kit":
      url = `${BASE_URL}/association/press-kit`
      break
    case "as-individual":
      url = `${BASE_URL}/contribute/as-individual`
      break
    case "as-partner":
      url = `${BASE_URL}/contribute/as-partner`
      break
    case "as-speaker":
      url = `${BASE_URL}/contribute/as-speaker`
      break
    case "as-sponsor":
      url = `${BASE_URL}/contribute/as-sponsor`
      break
    case "local-communities":
      url = `${BASE_URL}/participate/local-communities`
      break
    case "projects":
      url = `${BASE_URL}/participate/projects`
      break
    case "speakers":
      url = `${BASE_URL}/speakers`
      break
    case "watch":
      url = `${BASE_URL}/watch`
      break
    default:
        url = ""
      break;
  }
  
  switch (type) {
    // Static pages
    case "home":
      url = BASE_URL
      break

    // Dynamic content types (require slug)
    case "page":
      if (!slug) throw new Error("Slug is required for page URLs")
      url = `${BASE_URL}/page/${slug}`
      break
    case "blog":
      if (!slug) throw new Error("Slug is required for blog URLs")
      url = `${BASE_URL}/blog/${slug}`
      break
    case "speaker":
      if (!slug) throw new Error("Slug is required for speaker URLs")
      url = `${BASE_URL}/speaker/${slug}`
      break
    case "event":
      if (!slug) throw new Error("Slug is required for event URLs")
      url = `${BASE_URL}/participate/events/${slug}`
      break
    case "video":
      if (!slug) throw new Error("Slug is required for video URLs")
      url = `${BASE_URL}/watch/${slug}`
      break
    default:
      url = ""
      break;
  }

  return encode ? encodeUrl(url) : url;
} 