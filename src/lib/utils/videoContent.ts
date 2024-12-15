import type { Author, Video } from "@/sanity/sanity.types"
import { urlFor } from "@/sanity/lib/image"

/**
 * Gets a formatted string of author names
 */
export function getAuthorNames(authors: Author[] | undefined): string {
  if (!authors?.length) return ""
  return authors.map((author) => `${author.firstName ?? ""} ${author.lastName ?? ""}`.trim()).join(", ")
}

/**
 * Gets author initials safely
 */
export function getAuthorInitials(author: Author): string {
  const firstInitial = author.firstName?.[0] ?? ""
  const lastInitial = author.lastName?.[0] ?? ""
  return `${firstInitial}${lastInitial}`
}

/**
 * Gets the video thumbnail URL, falling back to YouTube thumbnail if none provided
 */
export function getVideoThumbnailUrl(video: Video, square = true): string {
  if (!video) return ""

  return video.thumbnail
    ? urlFor(video.thumbnail)
        .auto("format")
        .width(square ? 400 : 600)
        .height(square ? 400 : 300)
        .url()
    : video.youtubeId
      ? `https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`
      : ""
}

/**
 * Gets the full name of an author
 */
export function getAuthorFullName(author: Author, withPronouns = false): string {
  const namePieces = [author.firstName, author.lastName]
  if (withPronouns && author.pronouns) namePieces.push(`(${author.pronouns})`)
  return namePieces.filter(Boolean).join(" ").trim()
}

/**
 * Give a youtube url, extract the video id
 */
export function getYoutubeVideoId(url: string): string {
  const urlParts = url.split("v=")
  return urlParts[urlParts.length - 1] ?? ""
}
