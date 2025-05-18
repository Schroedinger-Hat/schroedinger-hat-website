import { type NextRequest, NextResponse } from "next/server"
import { algoliasearch } from "algoliasearch"
import { createClient } from "next-sanity"
import { projectId, dataset, apiVersion } from "@/sanity/env"
import { buildUrl, type ContentType } from "@/lib/utils/urlBuilders"

// Initialize the Algolia client
const algoliaClient = algoliasearch(
  process.env.ALGOLIA_APP_ID ?? "",
  process.env.ALGOLIA_ADMIN_API_KEY ?? ""
)
const indexName = process.env.ALGOLIA_INDEX_NAME ?? ""

// Sanity client
const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
})

// Define document type
interface SanityDocument {
  _id: string
  _type: string
  title?: string
  slug?: { current: string }
  body?: string
  content?: any
  coverImage?: { asset?: { url?: string } }
  mainImage?: { asset?: { url?: string } }
  subtitle?: string
  description?: string
  overview?: string
  tags?: string[]
  location?: string
  startDate?: string
  endDate?: string
  date?: string
  url?: string
  _createdAt?: string
  _updatedAt?: string
}

// Constants for field truncation limits (in chars)
const MAX_BODY_LENGTH = 3000
const MAX_DESCRIPTION_LENGTH = 500

// Helper function to truncate text fields
function truncate(text: string | undefined, maxLength: number): string {
  if (!text) return ""
  return text.length <= maxLength ? text : text.substring(0, maxLength) + "..."
}

// Map Sanity document types to ContentType for URL building
function mapDocTypeToContentType(docType: string): ContentType | null {
  switch (docType) {
    case "page":
      return "page"
    case "blogPost":
      return "blog"
    case "author":
      return "speaker"
    case "event":
      return "event"
    case "video":
      return "video"
    default:
      return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.text()
    const parsedBody = JSON.parse(body || "{}")
    
    // Check if this is a request for initial indexing
    const urlParams = new URL(req.url).searchParams
    const initialIndex = urlParams.get("initialIndex") === "true"
    
    if (initialIndex) {
      // Fetch all documents from Sanity and index them
      return await handleInitialIndexing()
    }
    
    // Handle incremental updates from webhook
    return await handleWebhookRequest(parsedBody)
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

async function handleInitialIndexing() {
  try {
    // Query for all published content (excluding drafts)
    // Include all document types that should be searchable
    const query = `*[!(_id in path("drafts.**"))]{ 
      _id, 
      _type, 
      title, 
      slug, 
      "body": pt::text(content), 
      subtitle,
      description,
      "tags": tags[]->name,
      location,
      startDate,
      endDate,
      _createdAt, 
      _updatedAt 
    }`
    
    const documents = await sanityClient.fetch<SanityDocument[]>(query)
    
    // Format documents for Algolia with truncated fields to ensure size limits
    const records = documents.map((doc) => {
      // Generate URL based on document type and slug
      const contentType = mapDocTypeToContentType(doc._type)
      const url = contentType && doc.slug?.current 
        ? buildUrl(contentType, doc.slug.current)
        : ""

      if (url === "") {
        return;
      }

      return {
        objectID: doc._id,
        _type: doc._type,
        title: doc.title ?? "",
        slug: doc.slug?.current ? { current: doc.slug.current } : "",
        body: truncate(doc.body, MAX_BODY_LENGTH),
        subtitle: doc.subtitle ?? "",
        description: truncate(doc.description, MAX_DESCRIPTION_LENGTH),
        tags: doc.tags ?? [],
        location: doc.location ?? "",
        startDate: doc.startDate ?? "",
        endDate: doc.endDate ?? "",
        url, // Use the dynamically generated URL
        _createdAt: doc._createdAt ?? "",
        _updatedAt: doc._updatedAt ?? "",
        source: "sh-website"
      }
    }).filter((record) => record !== undefined)

    // Use the saveObjects method
    await algoliaClient.saveObjects({
      indexName,
      objects: records,
    })
    
    return NextResponse.json({ success: true, message: `Indexed ${records.length} documents` })
  } catch (error) {
    console.error("Error during initial indexing:", error)
    return NextResponse.json({ success: false, error: "Initial indexing failed" }, { status: 500 })
  }
}

async function handleWebhookRequest(body: any) {
  try {
    const { _id, operation, value } = body
    
    // Handle the operation based on whether it's a create, update, or delete
    if (operation === "delete") {
      // Delete the document from Algolia
      await algoliaClient.deleteObject({
        indexName,
        objectID: _id,
      })
      return NextResponse.json({ success: true, message: "Document deleted" })
    } else if (operation === "create" || operation === "update") {
      // Use the value provided in the webhook payload
      if (value && typeof value === "object" && "_id" in value) {
        // Define the type for webhook payload to ensure safe property access
        const documentValue = value as {
          _id: string
          _type: string
          slug?: { current: string }
          body?: string
          description?: string
          [key: string]: any,
          source?: string
        }
        
        // Generate URL for the document
        const contentType = mapDocTypeToContentType(documentValue._type)
        const url = contentType && documentValue.slug?.current 
          ? buildUrl(contentType, documentValue.slug.current)
          : ""

        if (url === "") {
          return;
        }
        
        // Process the value to ensure it meets size limits
        const processedValue = {
          ...documentValue,
          body: truncate(documentValue.body, MAX_BODY_LENGTH),
          description: truncate(documentValue.description, MAX_DESCRIPTION_LENGTH),
          objectID: documentValue._id,
          url, // Add the dynamically generated URL
          source: "sh-website"
        }
        
        // Save or update the document in Algolia
        await algoliaClient.saveObject({
          indexName,
          body: processedValue,
        })
        return NextResponse.json({ success: true, message: "Document saved" })
      } else {
        return NextResponse.json(
          { success: false, error: "Missing _id or invalid value in payload" },
          { status: 400 }
        )
      }
    } else {
      return NextResponse.json(
        { success: false, error: "Unknown operation" },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Error handling webhook request:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process webhook" },
      { status: 500 }
    )
  }
} 