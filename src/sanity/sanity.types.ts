/**
 * ---------------------------------------------------------------------------------
 * This file has been generated by Sanity TypeGen.
 * Command: `sanity typegen generate`
 *
 * Any modifications made directly to this file will be overwritten the next time
 * the TypeScript definitions are generated. Please make changes to the Sanity
 * schema definitions and/or GROQ queries if you need to update these types.
 *
 * For more information on how to use Sanity TypeGen, visit the official documentation:
 * https://www.sanity.io/docs/sanity-typegen
 * ---------------------------------------------------------------------------------
 */

// Source: schema.json
export type SanityImagePaletteSwatch = {
  _type: "sanity.imagePaletteSwatch"
  background?: string
  foreground?: string
  population?: number
  title?: string
}

export type SanityImagePalette = {
  _type: "sanity.imagePalette"
  darkMuted?: SanityImagePaletteSwatch
  lightVibrant?: SanityImagePaletteSwatch
  darkVibrant?: SanityImagePaletteSwatch
  vibrant?: SanityImagePaletteSwatch
  dominant?: SanityImagePaletteSwatch
  lightMuted?: SanityImagePaletteSwatch
  muted?: SanityImagePaletteSwatch
}

export type SanityImageDimensions = {
  _type: "sanity.imageDimensions"
  height?: number
  width?: number
  aspectRatio?: number
}

export type SanityFileAsset = {
  _id: string
  _type: "sanity.fileAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  source?: SanityAssetSourceData
}

export type BlogPost = {
  _id: string
  _type: "blogPost"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  authors?: Array<{
    _ref: string
    _type: "reference"
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: "author"
  }>
  excerpt?: string
  headerImage?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    caption?: string
    _type: "image"
  }
  publishedAt?: string
  content?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: "span"
          _key: string
        }>
        style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
        listItem?: "bullet" | "number"
        markDefs?: Array<{
          href?: string
          _type: "link"
          _key: string
        }>
        level?: number
        _type: "block"
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: "reference"
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        alt?: string
        caption?: string
        _type: "image"
        _key: string
      }
    | ({
        _key: string
      } & Code)
  >
}

export type JobPost = {
  _id: string
  _type: "jobPost"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  description?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  location?: string
  effort?: "low" | "moderate" | "elevate"
  isActive?: boolean
  publishedAt?: string
}

export type Project = {
  _id: string
  _type: "project"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  url?: string
  repositoryUrl?: string
  showStars?: boolean
  techStack?: Array<string>
  launchedAt?: string
  lookingFor?: Array<string>
  language?: "typescript" | "javascript" | "python" | "go" | "rust"
}

export type Faq = {
  _id: string
  _type: "faq"
  _createdAt: string
  _updatedAt: string
  _rev: string
  question?: string
  answer?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  groupKey?: string
  orderRank?: string
}

export type TeamMember = {
  _id: string
  _type: "teamMember"
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  surname?: string
  role?: string
  image?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    backgroundColor?: string
    _type: "image"
  }
  orderRank?: string
}

export type Author = {
  _id: string
  _type: "author"
  _createdAt: string
  _updatedAt: string
  _rev: string
  firstName?: string
  lastName?: string
  pronouns?: string
  title?: string
  photo?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  biography?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  slug?: Slug
}

export type Video = {
  _id: string
  _type: "video"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  shortTitle?: string
  slug?: Slug
  authors?: Array<{
    _ref: string
    _type: "reference"
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: "author"
  }>
  youtubeId?: string
  thumbnail?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  description?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  whyShouldWatch?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  tags?: Array<string>
  publishedAt?: string
  categories?: Array<string>
  featured?: boolean
  order?: number
}

export type Page = {
  _id: string
  _type: "page"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  publishedAt?: string
  content?: Array<
    | {
        children?: Array<{
          marks?: Array<string>
          text?: string
          _type: "span"
          _key: string
        }>
        style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
        listItem?: "bullet" | "number"
        markDefs?: Array<{
          href?: string
          _type: "link"
          _key: string
        }>
        level?: number
        _type: "block"
        _key: string
      }
    | {
        asset?: {
          _ref: string
          _type: "reference"
          _weak?: boolean
          [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
        }
        hotspot?: SanityImageHotspot
        crop?: SanityImageCrop
        alt?: string
        caption?: string
        _type: "image"
        _key: string
      }
  >
  headerImage?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  seo?: {
    metaTitle?: string
    metaDescription?: string
    metaKeywords?: Array<string>
  }
}

export type Partner = {
  _id: string
  _type: "partner"
  _createdAt: string
  _updatedAt: string
  _rev: string
  name?: string
  image?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  description?: string
  isBusinessPartner?: boolean
  businessTier?: "silver" | "gold" | "platinum" | "diamond"
  nonBusinessType?: "community" | "media"
  website?: string
  partnershipPeriod?: {
    startDate?: string
    endDate?: string
  }
  contact?: {
    name?: string
    email?: string
  }
  orderRank?: string
  visibility?: Array<string>
}

export type Event = {
  _id: string
  _type: "event"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  series?: {
    _ref: string
    _type: "reference"
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: "eventSeries"
  }
  slug?: Slug
  organiser?: string
  abstract?: Array<{
    children?: Array<{
      marks?: Array<string>
      text?: string
      _type: "span"
      _key: string
    }>
    style?: "normal" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "blockquote"
    listItem?: "bullet" | "number"
    markDefs?: Array<{
      href?: string
      _type: "link"
      _key: string
    }>
    level?: number
    _type: "block"
    _key: string
  }>
  cover?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  background?: {
    asset?: {
      _ref: string
      _type: "reference"
      _weak?: boolean
      [internalGroqTypeReferenceTo]?: "sanity.imageAsset"
    }
    hotspot?: SanityImageHotspot
    crop?: SanityImageCrop
    _type: "image"
  }
  cardImage?: "background" | "cover"
  location?: {
    name?: string
    address?: string
    city?: string
    coordinates?: Geopoint
  }
  eventPeriod?: {
    startDate?: string
    endDate?: string
  }
  cta?: {
    text?: string
    url?: string
  }
  coolBecause?: Array<string>
  authors?: Array<{
    _ref: string
    _type: "reference"
    _weak?: boolean
    _key: string
    [internalGroqTypeReferenceTo]?: "author"
  }>
}

export type Geopoint = {
  _type: "geopoint"
  lat?: number
  lng?: number
  alt?: number
}

export type SanityImageCrop = {
  _type: "sanity.imageCrop"
  top?: number
  bottom?: number
  left?: number
  right?: number
}

export type SanityImageHotspot = {
  _type: "sanity.imageHotspot"
  x?: number
  y?: number
  height?: number
  width?: number
}

export type SanityImageAsset = {
  _id: string
  _type: "sanity.imageAsset"
  _createdAt: string
  _updatedAt: string
  _rev: string
  originalFilename?: string
  label?: string
  title?: string
  description?: string
  altText?: string
  sha1hash?: string
  extension?: string
  mimeType?: string
  size?: number
  assetId?: string
  uploadId?: string
  path?: string
  url?: string
  metadata?: SanityImageMetadata
  source?: SanityAssetSourceData
}

export type SanityAssetSourceData = {
  _type: "sanity.assetSourceData"
  name?: string
  id?: string
  url?: string
}

export type SanityImageMetadata = {
  _type: "sanity.imageMetadata"
  location?: Geopoint
  dimensions?: SanityImageDimensions
  palette?: SanityImagePalette
  lqip?: string
  blurHash?: string
  hasAlpha?: boolean
  isOpaque?: boolean
}

export type EventSeries = {
  _id: string
  _type: "eventSeries"
  _createdAt: string
  _updatedAt: string
  _rev: string
  title?: string
  slug?: Slug
  description?: string
}

export type Slug = {
  _type: "slug"
  current?: string
  source?: string
}

export type Code = {
  _type: "code"
  language?: string
  filename?: string
  code?: string
  highlightedLines?: Array<number>
}

export type Color = {
  _type: "color"
  hex?: string
  alpha?: number
  hsl?: HslaColor
  hsv?: HsvaColor
  rgb?: RgbaColor
}

export type RgbaColor = {
  _type: "rgbaColor"
  r?: number
  g?: number
  b?: number
  a?: number
}

export type HsvaColor = {
  _type: "hsvaColor"
  h?: number
  s?: number
  v?: number
  a?: number
}

export type HslaColor = {
  _type: "hslaColor"
  h?: number
  s?: number
  l?: number
  a?: number
}

export type AllSanitySchemaTypes =
  | SanityImagePaletteSwatch
  | SanityImagePalette
  | SanityImageDimensions
  | SanityFileAsset
  | BlogPost
  | JobPost
  | Project
  | Faq
  | TeamMember
  | Author
  | Video
  | Page
  | Partner
  | Event
  | Geopoint
  | SanityImageCrop
  | SanityImageHotspot
  | SanityImageAsset
  | SanityAssetSourceData
  | SanityImageMetadata
  | EventSeries
  | Slug
  | Code
  | Color
  | RgbaColor
  | HsvaColor
  | HslaColor
export declare const internalGroqTypeReferenceTo: unique symbol
