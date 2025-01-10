"use client"

import { env } from "@/env"
import { cn, disableAnimations } from "@/lib/utils"
import { useCallback, useEffect, useRef } from "react"

interface BlurredBackgroundProps {
  points: number
  colors: string[]
  blur?: number
  opacity?: number
  className?: string
  size?: number
  positioning?: "random" | "center"
  disableAnimation?: boolean
  canOverflow?: boolean
}

const BlurredBackgroundContent = ({
  points,
  colors,
  blur = 100,
  opacity = 0.5,
  className = "",
  size = 500,
  positioning = "random",
  disableAnimation = false,
  canOverflow = false,
}: BlurredBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper function to generate a more center-weighted random number between 0 and 1
  const centerBiasedRandom = () => {
    const samples = 3
    let sum = 0
    for (let i = 0; i < samples; i++) {
      sum += Math.random()
    }
    return sum / samples
  }

  const getRandomDuration = () => {
    return Math.random() * 4 + 6 // Random duration between 6-10s
  }

  // Memoize the getCenteredPosition function
  const getCenteredPosition = useCallback(
    (index: number, totalPoints: number) => {
      const angleStep = (2 * Math.PI) / totalPoints
      const angle = index * angleStep
      const radius = size * 0.4 // 30% offset from center

      return {
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
      }
    },
    [size],
  )

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const { width, height } = container.getBoundingClientRect()
    const centerX = width / 2
    const centerY = height / 2

    container.innerHTML = ""

    const effectiveSize = size + blur * 2

    for (let i = 0; i < points; i++) {
      const circle = document.createElement("div")
      const color = colors[i % colors.length]

      let left: number
      let top: number

      if (positioning === "center") {
        const { x, y } = getCenteredPosition(i, points)
        left = centerX + x
        top = centerY + y
      } else {
        const safeWidth = width - effectiveSize
        const safeHeight = height - effectiveSize
        left = Math.max(blur, Math.min(safeWidth + blur, centerBiasedRandom() * width))
        top = Math.max(blur, Math.min(safeHeight + blur, centerBiasedRandom() * height))
      }

      // Generate random animation parameters
      const duration = getRandomDuration()
      const delay = Math.random() * -duration

      circle.className = "absolute rounded-full"
      // Only add animation class if not in CI and animations aren't disabled
      if (!disableAnimations && !disableAnimation) {
        circle.className += " animate-blob"
      }

      Object.assign(circle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}px`,
        top: `${top}px`,
        backgroundColor: color,
        opacity: opacity.toString(),
        filter: `blur(${blur}px)`,
        transform: "translate(-50%, -50%)",
        willChange: "transform",
        ...(disableAnimations || disableAnimation
          ? {}
          : {
              animation: `blob ${duration}s infinite ${delay}s`,
            }),
      })

      container.appendChild(circle)
    }
  }, [points, colors, blur, opacity, size, positioning, getCenteredPosition, disableAnimation])

  return (
    <div
      id="blurred-background"
      ref={containerRef}
      className={cn(
        "absolute inset-0 -z-10",
        {
          "overflow-hidden md:overflow-visible": canOverflow,
          "overflow-hidden": !canOverflow,
        },
        className,
      )}
      aria-hidden="true"
    />
  )
}

export const BlurredBackground = (props: BlurredBackgroundProps) => {
  if (disableAnimations) return null
  return <BlurredBackgroundContent {...props} />
}
