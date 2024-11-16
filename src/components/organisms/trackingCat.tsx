"use client";

import Image, { StaticImageData } from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";

import layer1 from "@/images/trackingCat/1-background.svg";
import layer2 from "@/images/trackingCat/2-shadows.svg";
import layer3 from "@/images/trackingCat/3-left-eye.svg";
import layer4 from "@/images/trackingCat/4-right-eye.svg";

/**
 * Tracking cat displays a cat svg in 3 layers and animate the layers parallax style to track the mouse position in page
 */
export function TrackingCat() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isWinking, setIsWinking] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastUpdateRef = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout>();
  const movingTimeoutRef = useRef<NodeJS.Timeout>();

  // Clear any existing timeouts
  function clearTimeouts() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (movingTimeoutRef.current) {
      clearTimeout(movingTimeoutRef.current);
    }
  }

  const updateMousePosition = useCallback((event: MouseEvent) => {
    const now = Date.now();
    const timeSinceLastUpdate = now - lastUpdateRef.current;

    clearTimeouts();

    const updateInterval = 1500;

    // Set moving state
    setIsMoving(true);

    // If enough time has passed, update immediately
    if (timeSinceLastUpdate >= updateInterval) {
      setMousePosition({ x: event.clientX, y: event.clientY });
      lastUpdateRef.current = now;

      // Reset moving state after animation completes
      movingTimeoutRef.current = setTimeout(() => {
        setIsMoving(false);
      }, 210); // Slightly longer than the transition duration
    } else {
      // Otherwise, schedule an update
      timeoutRef.current = setTimeout(() => {
        setMousePosition({ x: event.clientX, y: event.clientY });
        lastUpdateRef.current = Date.now();

        // Reset moving state after animation completes
        movingTimeoutRef.current = setTimeout(() => {
          setIsMoving(false);
        }, 210);
      }, updateInterval - timeSinceLastUpdate);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      clearTimeouts();
    };
  }, [updateMousePosition]);

  // Calculate position based on mouse position relative to a container
  const calculatePosition = (
    mousePos: { x: number; y: number },
    container: HTMLElement,
    maxMove = 30,
  ) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = mousePos.x - centerX;
    const deltaY = mousePos.y - centerY;

    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxMove);
    const angle = Math.atan2(deltaY, deltaX);

    return {
      x: Math.cos(angle) * distance,
      y: Math.sin(angle) * distance,
    };
  };

  const calculateLayerPosition = (maxMove: number) => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const basePosition = calculatePosition(
      mousePosition,
      containerRef.current,
      maxMove,
    );
    return {
      x: basePosition.x,
      y: basePosition.y,
    };
  };

  const shadowPosition = calculateLayerPosition(25);
  const eyePosition = calculateLayerPosition(35);

  // Add winking effect
  useEffect(() => {
    const winkInterval = setInterval(
      () => {
        // Only wink if eyes are not moving
        if (!isMoving) {
          setIsWinking(true);
          setTimeout(() => setIsWinking(false), 100);
        }
      },
      Math.floor(Math.random() * (12000 - 7000) + 7000),
    );

    return () => clearInterval(winkInterval);
  }, [isMoving]);

  // Clean up all timeouts
  useEffect(() => {
    return () => {
      clearTimeouts();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[320px] w-[400px] overflow-hidden"
    >
      {/* Background */}
      <Image
        src={layer1 as StaticImageData}
        alt="Background"
        className="absolute"
        width={400}
        height={320}
      />
      {/* Shadows */}
      <Image
        src={layer2 as StaticImageData}
        alt="Shadows"
        className="absolute"
        width={400}
        height={320}
        style={{
          transform: `translate(${shadowPosition.x}px, ${shadowPosition.y}px)`,
          transition: "transform 0.1s ease-in",
          opacity: 0.7,
        }}
      />
      {/* Left Eye */}
      <Image
        src={layer3 as StaticImageData}
        alt="Left Eye"
        className="absolute transition-all duration-100"
        width={400}
        height={320}
        style={{
          transform: `translate(${eyePosition.x}px, ${eyePosition.y}px) scaleY(${
            isWinking ? 0.2 : 1
          })`,
          transformOrigin: "center center",
          transition: "all 0.2s ease-out",
        }}
      />
      {/* Right Eye */}
      <Image
        src={layer4 as StaticImageData}
        alt="Eyes"
        className="absolute"
        width={400}
        height={320}
        style={{
          transform: `translate(${eyePosition.x}px, ${eyePosition.y}px)`,
          transition: "transform 0.2s ease-out",
        }}
      />
    </div>
  );
}
