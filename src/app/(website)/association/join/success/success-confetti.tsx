"use client";

import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), {
  ssr: false,
});

export function SuccessConfetti() {
  return (
    <ReactConfetti
      width={typeof window !== "undefined" ? window.innerWidth : 0}
      height={typeof window !== "undefined" ? window.innerHeight : 0}
      recycle={true}
      numberOfPieces={40}
      gravity={0.1}
    />
  );
}
