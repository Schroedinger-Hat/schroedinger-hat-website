"use client"

import { Typography } from "@/components/atoms/typography/Typography"
import { StarIcon } from "lucide-react"
import { useEffect, useState } from "react"

// Helper function to extract owner and repo from GitHub URL
function extractGitHubInfo(url: string) {
  try {
    const match = /github\.com\/([^/]+)\/([^/]+)/.exec(url)
    return match ? { owner: match[1], repo: match[2] } : null
  } catch {
    return null
  }
}

interface GitHubRepo {
  stargazers_count: number
}

export function GitHubStars({ url }: { url: string }) {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    const githubInfo = extractGitHubInfo(url)
    if (!githubInfo) return

    fetch(`https://api.github.com/repos/${githubInfo.owner}/${githubInfo.repo}`)
      .then((res) => res.json())
      .then((data: GitHubRepo) => {
        if (data.stargazers_count) {
          setStars(data.stargazers_count)
        }
      })
      .catch((error) => console.error("Error fetching GitHub stars:", error))
  }, [url])

  if (stars === null) return null

  return (
    <Typography variant="small">
      <div className="flex items-center gap-1">
        <StarIcon className="h-4 w-4" />
        <span>{stars.toLocaleString()}</span>
      </div>
    </Typography>
  )
}
