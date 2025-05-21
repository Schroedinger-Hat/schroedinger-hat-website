"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"

import { type SearchResult, searchService } from "@/lib/search-service"
import { useDebounce } from "@/lib/hooks/use-debounce"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300) // Faster debounce
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Simple keyboard shortcut handler
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Search effect
  React.useEffect(() => {
    if (!debouncedQuery) {
      setResults([])
      return
    }

    const performSearch = async () => {
      setIsLoading(true)
      try {
        console.log("Searching:", debouncedQuery)
        const searchResults = await searchService.search(debouncedQuery)
        console.log("Found results:", searchResults.length)
        setResults(searchResults)
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    void performSearch()
  }, [debouncedQuery])

  // Clear query on close
  React.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setQuery("")
      }, 200)
    }
  }, [open])

  // Basic implementation without too much complexity
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "inline-flex items-center justify-center rounded-md font-medium ring-offset-background transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "h-10 border border-input bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground",
          "text-sm",
        )}
      >
        <SearchIcon className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput ref={inputRef} placeholder="Search content..." value={query} onValueChange={setQuery} />

        <CommandList className="max-h-[300px] overflow-y-auto overflow-x-hidden">
          {isLoading && <div className="py-6 text-center text-sm">Loading...</div>}

          {!isLoading && query.length > 0 && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {!isLoading && results.length > 0 && (
            <CommandGroup heading="Results" className="overflow-visible">
              {results.map((result) => (
                <CommandItem
                  key={result.objectID}
                  value={result.title}
                  className="cursor-pointer aria-selected:bg-accent aria-selected:text-accent-foreground"
                  onSelect={() => {
                    console.log("Navigating to:", result.slug)
                    setOpen(false)
                    setTimeout(() => router.push(`/${result.slug}`), 100)
                  }}
                >
                  <div className="flex flex-col py-1">
                    <span className="font-medium">{result.title}</span>
                    {result.body && (
                      <span className="line-clamp-1 text-sm text-muted-foreground">{result.body}</span>
                    )}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
