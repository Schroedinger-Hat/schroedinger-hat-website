/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

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
];

if (process.env.NODE_ENV === "development") {
  remotePatterns.push({
    protocol: "https",
    hostname: "placehold.co",
  });
}

/** @type {import("next").NextConfig} */
const config = {
  eslint: {
    ignoreDuringBuilds: true, // TODO: remove this
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns,
  },
};

export default config;
