import type { Metadata } from "next"

interface MetadataProps {
  title?: string
  description?: string
  overrides?: Partial<Metadata>
}

const defaultTitle = "Schrödinger Hat: Where we talk Open Source"
const defaultDescription =
  "Schrödinger Hat is a non-profit community advancing open-source software through inspiring events and impactful projects."

const baseUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_ENV === "production"
      ? "https://schroedinger-hat-website.vercel.app/"
      : "http://localhost:3000"

export function constructMetadata({
  title = defaultTitle,
  description = defaultDescription,
  overrides,
}: MetadataProps = {}): Metadata {
  const metadata: Metadata = {
    title,
    description,
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://schrodinger-hat.org",
      siteName: "Schrödinger Hat",
      title,
      description,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Schrödinger Hat Open Source Community",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
      creator: "@schrodinger_hat",
    },
    robots: "index, follow",
    alternates: {
      types: {
        "application/rss+xml": [
          {
            url: "/feed.xml",
            title: "Schrödinger Hat Blog RSS Feed",
          },
        ],
      },
    },
    ...overrides,
  }

  return metadata
}
