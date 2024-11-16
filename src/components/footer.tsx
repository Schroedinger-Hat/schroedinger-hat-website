"use client";

import Link from "next/link";
import { Youtube, Twitter } from "lucide-react";
import { inDevEnvironment } from "@/app/consts";

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
                Cookie policy
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/privacy"
              >
                Privacy policy
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/contacts"
              >
                Contatti
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="/page/code-of-conduct"
              >
                Code of Conduct
              </Link>
              <Link className="block text-sm hover:underline" href="/page/faq">
                FAQ
              </Link>
            </div>

            {/* Shop & Account Links */}
            <div className="space-y-3">
              <Link
                className="block text-sm font-semibold hover:underline"
                href="/shop"
              >
                Link rapidi
              </Link>
              <Link
                className="block text-sm hover:underline"
                href="https://ign.schroedinger-hat.org/"
              >
                ImageGoNord
              </Link>
              <Link className="block text-sm hover:underline" href="/orders">
                Press Kit
              </Link>
              {inDevEnvironment && (
                <Link
                  href="/sanity-cms"
                  className="block text-sm hover:underline"
                >
                  CMS
                </Link>
              )}
            </div>

            {/* Company Info */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold">SCHROEDINGER HAT APS</h3>
              <p className="text-muted-foreground text-sm">
                Via Pino Arpioni 1, Pelago (FI)
              </p>
              <p className="text-muted-foreground text-sm">IT07355400487</p>
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
          <div className="text-muted-foreground flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span>© 2024, Schroedinger Hat</span>
            <Link
              href="https://nextjs.org"
              className="hover:underline"
              target="_blank"
            >
              Powered by Next.js
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
