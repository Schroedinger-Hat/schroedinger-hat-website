import { apiVersion, dataset, projectId } from "../env"
import { createClient } from "@sanity/client"
import { type ReactNode } from "react"

// Define proper types for the options parameter
interface FetchOptions {
  query: string
  params?: Record<string, any>
  perspective?: string
  useCdn?: boolean
}

// Mock implementation to allow the project to build
export const sanityFetch = async (options: FetchOptions) => {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: options.useCdn ?? true,
  })

  return client.fetch(options.query, options.params)
}

// Empty component to prevent import errors
export const SanityLive = ({ children }: { children?: ReactNode }) => children ?? null
