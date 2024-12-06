import "@/styles/globals.css";
import { Inter, Lexend } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

const baseUrl =
  process.env.VERCEL_ENV === "preview"
    ? `https://${process.env.VERCEL_URL}`
    : process.env.VERCEL_ENV === "production"
      ? "https://schroedinger-hat-website.vercel.app/"
      : "http://localhost:3000";

export const metadata: Metadata = {
  title: "Schrödinger Hat: Where we talk Open Source",
  description:
    "Schrödinger Hat is a non-profit community advancing open-source software through inspiring events and impactful projects.",
  metadataBase: new URL(baseUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://schrodinger-hat.org",
    siteName: "Schrödinger Hat",
    title: "Schrödinger Hat: Where we talk Open Source",
    description:
      "Schrödinger Hat is a non-profit community advancing open-source software through inspiring events and impactful projects.",
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
    title: "Schrödinger Hat: Where we talk Open Source",
    description:
      "Schrödinger Hat is a non-profit community advancing open-source software through inspiring events and impactful projects.",
    images: ["/og-image.png"],
    creator: "@schrodinger_hat",
  },
  robots: "index, follow",
  alternates: {
    canonical: "https://schrodinger-hat.org",
    types: {
      "application/rss+xml": [
        {
          url: "/feed.xml",
          title: "Schrödinger Hat Blog RSS Feed",
        },
      ],
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="SH" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
