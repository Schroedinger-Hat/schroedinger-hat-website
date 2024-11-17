"use client";

import Link from "next/link";
import { Youtube, Twitter } from "lucide-react";
import { inDevEnvironment } from "@/app/consts";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";

export function Footer() {
  return (
    <footer className="w-full border-t">
      <div className="container mx-auto max-w-7xl">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Policy Links */}
            <div className="space-y-3">
              <Link
                className="block text-sm hover:underline"
                href="/page/cookie-policy"
              >
                <Paragraph className="m-0 text-sm">Cookie policy</Paragraph>
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/privacy"
              >
                <Paragraph className="m-0 text-sm">Privacy policy</Paragraph>
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/contacts"
              >
                <Paragraph className="m-0 text-sm">Contatti</Paragraph>
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/code-of-conduct"
              >
                <Paragraph className="m-0 text-sm">Code of Conduct</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/page/faq">
                <Paragraph className="m-0 text-sm">FAQ</Paragraph>
              </Link>
            </div>

            {/* Shop & Account Links */}
            <div className="space-y-3">
              <Heading level={3} className="text-sm font-semibold">
                Link rapidi
              </Heading>
              <Link
                className="block text-sm hover:underline"
                href="https://ign.schroedinger-hat.org/"
              >
                <Paragraph className="m-0 text-sm">ImageGoNord</Paragraph>
              </Link>
              <Link className="block text-sm hover:underline" href="/orders">
                <Paragraph className="m-0 text-sm">Press Kit</Paragraph>
              </Link>
              {inDevEnvironment && (
                <>
                  <Link
                    href="/sanity-cms"
                    className="block text-sm hover:underline"
                  >
                    <Paragraph className="m-0 text-sm">CMS</Paragraph>
                  </Link>
                  <Link
                    href="/components"
                    className="block text-sm hover:underline"
                  >
                    <Paragraph className="m-0 text-sm">Components</Paragraph>
                  </Link>
                </>
              )}
            </div>

            {/* Company Info */}
            <div className="space-y-3">
              <Heading level={3} className="text-sm font-semibold">
                SCHROEDINGER HAT APS
              </Heading>
              <Paragraph className="text-sm text-muted-foreground">
                Via Pino Arpioni 1, Pelago (FI)
              </Paragraph>
              <Paragraph className="text-sm text-muted-foreground">
                IT07355400487
              </Paragraph>
              <div className="mt-4 flex space-x-4">
                <Link
                  href="https://youtube.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Youtube className="h-5 w-5" />
                  <span className="sr-only">YouTube</span>
                </Link>
                <Link
                  href="https://twitter.com"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Line Separator */}
          <div className="mt-12 border-t py-4"> </div>

          {/* Bottom Links */}
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <Paragraph className="m-0 text-sm">
              © 2024, Schroedinger Hat
            </Paragraph>
            <Link
              href="https://nextjs.org"
              className="hover:underline"
              target="_blank"
            >
              <Paragraph className="m-0 text-sm">Powered by Next.js</Paragraph>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
