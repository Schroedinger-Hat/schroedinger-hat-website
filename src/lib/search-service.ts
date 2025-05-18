import { liteClient } from "algoliasearch/lite"
import type { SearchResponse } from "@algolia/client-search"

export type SearchResult = {
  objectID: string
  title: string
  slug: string
  body?: string
  coverImage?: string
  date?: string
  url: string
  _type: string
  _createdAt: string
  _updatedAt: string
  [key: string]: any
}

class SearchService {
  private static instance: SearchService
  private client

  private constructor() {
    this.client = liteClient(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID ?? "",
      process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY ?? ""
    )
  }

  public static getInstance(): SearchService {
    if (!SearchService.instance) {
      SearchService.instance = new SearchService()
    }
    return SearchService.instance
  }

  public async search(query: string): Promise<SearchResult[]> {
    if (!query) {
      return []
    }

    try {
      const { results } = await this.client.search<SearchResult>({
        requests: [
          {
            indexName: process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME ?? "",
            query,
          },
        ],
      }, {
        queryParameters: {
          filters: "source:sh-website",
        }
      })
      
      if (results && results.length > 0) {
        // Access the hits from the first result
        const firstResult = results[0] as SearchResponse<SearchResult>
        return firstResult.hits || []
      }
      
      return []
    } catch (error) {
      console.error("Search error:", error)
      return []
    }
  }
}

export const searchService = SearchService.getInstance() 