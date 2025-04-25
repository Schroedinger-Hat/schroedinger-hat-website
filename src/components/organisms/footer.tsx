"use client"

import Link from "next/link"
import { Youtube, Github, Linkedin } from "lucide-react"
import { inDevEnvironment } from "@/app/consts"
import { Heading } from "@/components/atoms/typography/Heading"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { Typography } from "../atoms/typography/Typography"

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto max-w-7xl">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Policy Links */}
            <div className="space-y-3">
              <Link className="block text-sm hover:underline" href="/page/cookie-policy">
                <Paragraph className="m-0 text-sm">Cookie policy</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/page/privacy">
                <Paragraph className="m-0 text-sm">Privacy policy</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/page/contacts">
                <Paragraph className="m-0 text-sm">Contacts</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/page/code-of-conduct">
                <Paragraph className="m-0 text-sm">Code of Conduct</Paragraph>
              </Link>
            </div>

            {/* Shop & Account Links */}
            <div className="space-y-3">
              <Link className="block text-sm hover:underline" href="https://ign.schroedinger-hat.org/">
                <Paragraph className="m-0 text-sm">ImageGoNord</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/blog">
                <Paragraph className="m-0 text-sm">Blog</Paragraph>
              </Link>
              {inDevEnvironment && (
                <>
                  <Link href="/sanity-cms" className="block text-sm hover:underline">
                    <Paragraph className="m-0 text-sm">CMS</Paragraph>
                  </Link>
                  <Link href="/components" className="block text-sm hover:underline">
                    <Paragraph className="m-0 text-sm">Web Components</Paragraph>
                  </Link>
                  <Link href="http://localhost:3001" className="block text-sm hover:underline">
                    <Paragraph className="m-0 text-sm">Email Preview</Paragraph>
                  </Link>
                </>
              )}
            </div>

            {/* Company Info */}
            <div className="space-y-3">
              <Heading level={3} className="text-sm font-semibold">
                SCHROEDINGER HAT APS
              </Heading>
              <Paragraph className="text-sm text-muted-foreground">Via Pino Arpioni 1, Pelago (FI)</Paragraph>
              <Paragraph className="text-sm text-muted-foreground">IT07355400487</Paragraph>
              <div className="mt-4 flex space-x-4">
                <Link
                  href="https://www.linkedin.com/company/schroedinger-hat/"
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">Linkedin</span>
                </Link>
                <Link
                  href="https://www.youtube.com/c/schrodingerhat"
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link
                  href="https://github.com/Schroedinger-Hat"
                  className="text-muted-foreground hover:text-foreground"
                  target="_blank"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Line Separator */}
          <div className="mt-12 border-t py-4"> </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-muted-foreground md:justify-between">
            <Typography variant="muted" className="m-0">
              © {new Date().getFullYear()}, Schrödinger Hat
            </Typography>

            <Link href="https://nextjs.org" className="hidden hover:underline md:block" target="_blank">
              <Typography variant="muted" className="m-0">
                Powered by Next.js
              </Typography>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
