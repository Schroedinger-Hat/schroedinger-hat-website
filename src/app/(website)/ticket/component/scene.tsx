"use client";

import { Canvas } from "@react-three/fiber";

export function ThreeScene() {
  return (
    <Canvas
      shadows
      camera={{
        position: [-6, 7, 7],
      }}
    ></Canvas>
  );
}
