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
              <Link className="text-sm hover:underline" href="/terms">
                Terms of Service
              </Link>
              <Link className="block text-sm hover:underline" href="/shipping">
                Shipping Policy
              </Link>
              <Link className="block text-sm hover:underline" href="/refund">
                Refund Policy
              </Link>
              <Link className="block text-sm hover:underline" href="/privacy">
                Privacy Policy
              </Link>
              <Link className="block text-sm hover:underline" href="/contact">
                Contact Information
              </Link>
            </div>

            {/* Shop & Account Links */}
            <div className="space-y-3">
              <Link
                className="block text-sm font-semibold hover:underline"
                href="/shop"
              >
                Shop
              </Link>
              <Link className="block text-sm hover:underline" href="/profile">
                My Profile
              </Link>
              <Link className="block text-sm hover:underline" href="/orders">
                Orders
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
          <div className="mt-12 border-t pt-8">
            {/* Country Selector */}
            <div>
              <label htmlFor="country" className="text-sm">
                Country/region
              </label>
              <select
                id="country"
                className="border-input bg-background mt-1 block w-[200px] rounded-md border px-3 py-2 text-sm"
                defaultValue="IT"
              >
                <option value="IT">Italy | EUR €</option>
                {/* Add more options as needed */}
              </select>
            </div>
          </div>

          {/* Bottom Links */}
          <div className="text-muted-foreground mt-8 flex flex-wrap gap-x-4 gap-y-2 text-sm">
            <span>© 2024, Schroedinger Hat Merch</span>
            <Link href="https://shopify.com" className="hover:underline">
              Powered by Shopify
            </Link>
            <Link href="/refund" className="hover:underline">
              Refund policy
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy policy
            </Link>
            <Link href="/terms" className="hover:underline">
              Terms of service
            </Link>
            <Link href="/shipping" className="hover:underline">
              Shipping policy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
