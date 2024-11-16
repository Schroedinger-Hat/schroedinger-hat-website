"use client";

import { useEffect, useRef } from "react";

interface BlurredBackgroundProps {
  points: number;
  colors: string[];
  blur?: number;
  opacity?: number;
  className?: string;
  size?: number;
}

export const BlurredBackground = ({
  points,
  colors,
  blur = 100,
  opacity = 0.5,
  className = "",
  size = 500,
}: BlurredBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper function to generate a more center-weighted random number between 0 and 1
  const centerBiasedRandom = () => {
    const samples = 3;
    let sum = 0;
    for (let i = 0; i < samples; i++) {
      sum += Math.random();
    }
    return sum / samples;
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const { width, height } = container.getBoundingClientRect();

    // Remove existing circles before creating new ones
    container.innerHTML = "";

    // Account for blur in effective size
    const effectiveSize = size + blur * 2;

    // Create circles
    for (let i = 0; i < points; i++) {
      const circle = document.createElement("div");
      const color = colors[i % colors.length];

      // Calculate safe boundaries accounting for blur
      const safeWidth = width - effectiveSize;
      const safeHeight = height - effectiveSize;

      // Calculate position ensuring the blur doesn't overflow
      const left = Math.max(
        blur,
        Math.min(safeWidth + blur, centerBiasedRandom() * width),
      );
      const top = Math.max(
        blur,
        Math.min(safeHeight + blur, centerBiasedRandom() * height),
      );

      // Apply styles
      circle.className =
        "absolute rounded-full transition-all duration-1000 animate-pulse";
      Object.assign(circle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${left}px`,
        top: `${top}px`,
        backgroundColor: color,
        opacity: opacity.toString(),
        filter: `blur(${blur}px)`,
        animation: `pulse 10s infinite ${i * 1000}ms`,
        transform: "translate(-50%, -50%)", // Center the circle on its position
      });

      container.appendChild(circle);
    }
  }, [points, colors, blur, opacity, size]);

  return (
    <div
      id="blurred-background"
      ref={containerRef}
      className={`absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
};
