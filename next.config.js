/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js"

/** @type {import('next/dist/shared/lib/image-config').RemotePattern[]} */
const remotePatterns = [
  {
    protocol: "https",
    hostname: "cdn.sanity.io",
  },
  {
    protocol: "https",
    hostname: "img.youtube.com",
  },
  {
    protocol: "https",
    hostname: "maps.googleapis.com",
  },
  {
    protocol: "https",
    hostname: "picsum.photos",
  },
]

if (process.env.NODE_ENV === "development") {
  remotePatterns.push({
    protocol: "https",
    hostname: "placehold.co",
  })
}

/** @type {import("next").NextConfig} */
const config = {
  transpilePackages: ["three"],
  eslint: {
    ignoreDuringBuilds: true, // TODO: remove this
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns,
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: '/open-source-in-classroom',
        destination: '/blog/open-source-in-classroom',
        permanent: true,
      }
    ]
  },
}

export default config
