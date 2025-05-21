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
import { DialogTitle } from "@radix-ui/react-dialog"

// Maximum number of items to display in a single page
const MAX_DISPLAY_RESULTS = 10

export function SearchCommand() {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const debouncedQuery = useDebounce(query, 300) // Faster debounce
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [currentPage, setCurrentPage] = React.useState(0)
  const inputRef = React.useRef<HTMLInputElement>(null)

  // Get the current page of results
  const currentResults = React.useMemo(() => {
    const start = currentPage * MAX_DISPLAY_RESULTS
    return results.slice(start, start + MAX_DISPLAY_RESULTS)
  }, [results, currentPage])

  // Calculate total pages
  const totalPages = Math.ceil(results.length / MAX_DISPLAY_RESULTS)

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
      setCurrentPage(0) // Reset to first page
      try {
        console.log("Searching:", debouncedQuery)
        const searchResults = await searchService.search(debouncedQuery)
        console.log(`Found total results: ${searchResults.length}`)
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
        setCurrentPage(0)
      }, 200)
    }
  }, [open])

  // Handle pagination keyboard shortcuts
  const handleKeyNavigation = React.useCallback(
    (e: KeyboardEvent) => {
      if (!open || totalPages <= 1) return

      if (e.key === "ArrowDown" && e.altKey) {
        e.preventDefault()
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))
      } else if (e.key === "ArrowUp" && e.altKey) {
        e.preventDefault()
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))
      }
    },
    [open, totalPages],
  )

  // Add keyboard navigation for pagination
  React.useEffect(() => {
    window.addEventListener("keydown", handleKeyNavigation)
    return () => window.removeEventListener("keydown", handleKeyNavigation)
  }, [handleKeyNavigation])

  // Execute navigation with logging and delay to ensure dialog closes
  const navigateToResult = (result: SearchResult) => {
    setOpen(false)

    if (!result.url) {
      console.error("Invalid URL in result:", result)
      return
    }

    // Use a small timeout to ensure dialog has closed before navigation
    setTimeout(() => {
      const url = new URL(result.url)
      router.push(url.pathname)
    }, 100)
  }

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
        <DialogTitle />
        <CommandInput ref={inputRef} placeholder="Search content..." value={query} onValueChange={setQuery} />

        <CommandList>
          {isLoading && <div className="py-6 text-center text-sm">Loading...</div>}

          {!isLoading && query.length > 0 && results.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}

          {!isLoading && results.length > 0 && (
            <>
              <CommandGroup
                heading={totalPages > 1 ? `Results (Page ${currentPage + 1}/${totalPages})` : "Results"}
              >
                {currentResults.map((result, index) => (
                  <CommandItem
                    key={`result-${currentPage}-${index}`}
                    value={result.title}
                    onSelect={() => navigateToResult(result)}
                  >
                    <div className="flex flex-col">
                      <span className="font-medium">{result.title}</span>
                      {result.body && (
                        <span className="line-clamp-1 text-sm text-muted-foreground">{result.body}</span>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>

              {totalPages > 1 && (
                <div className="px-2 py-2 text-center text-xs text-muted-foreground">
                  Page {currentPage + 1} of {totalPages}. Use Alt+Arrow Up/Down to navigate pages.
                </div>
              )}
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  )
}
