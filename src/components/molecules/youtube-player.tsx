"use client"

import { useEffect, useState } from "react"

interface YouTubePlayerProps {
  videoId: string
  className?: string
}

export function YouTubePlayer({ videoId, className = "" }: YouTubePlayerProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className={`aspect-video w-full bg-gray-200 ${className}`}>
        <div className="flex h-full items-center justify-center">
          <span className="text-gray-500">Loading player...</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`aspect-video w-full ${className}`}>
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&rel=0&showinfo=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  )
}
