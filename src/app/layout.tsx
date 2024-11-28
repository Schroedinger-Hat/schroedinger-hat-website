import "@/styles/globals.css";
import { Inter, Lexend } from "next/font/google";
import { type Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const lexend = Lexend({ subsets: ["latin"], variable: "--font-lexend" });

export const metadata: Metadata = {
  title: "Schrödinger Hat: Open Source Community and Events",
  description:
    "Schrödinger Hat is a non-profit community advancing open-source software through inspiring events and impactful projects.",
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
