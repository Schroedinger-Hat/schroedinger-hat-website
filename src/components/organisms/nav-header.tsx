"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/molecules/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/molecules/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/molecules/sheet";
import Image from "next/image";
import logo from "../../images/logo.png";
import { Paragraph } from "@/components/atoms/typography/Paragraph";

export function NavHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 max-w-7xl items-center">
        <div className="mr-8">
          <Link href="/" className="text-xl font-bold tracking-wider">
            <Image
              src={logo}
              alt="Schroedinger Hat Logo"
              width={48}
              height={48}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <Link
              href="/watch"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
            >
              WATCH
            </Link>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>ATTEND</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/attend/events"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Events</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/attend/local-communities"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">
                            Local Communities
                          </Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="https://discord.gg/eK7bDYrnnR"
                          className="block rounded-md p-2 hover:bg-accent"
                          target="_blank"
                        >
                          <Paragraph className="m-0">Join Discord</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>CONTRIBUTE</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribute/projects"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Projects</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribute/as-speaker"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">As Speaker</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribute/as-individual"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">As Individual</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribute/as-partner"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">As Partner</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribute/as-sponsor"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">As Sponsor</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>ASSOCIATION</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/association/about-us"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">About Us</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/page/statute"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Statute</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/page/administrative-data"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">
                            Administrative Data
                          </Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/association/join"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">
                            Activate Membership
                          </Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>

            <Link
              href="https://shop.schroedinger-hat.org"
              className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
            >
              SHOP
            </Link>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Button
            asChild
            variant="default"
            className="bg-black text-white hover:bg-black/90"
          >
            <Link href="/association/join">Join</Link>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div className="ml-2 md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/services"
                  className="flex items-center justify-between py-2"
                >
                  SERVICES
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <Link
                  href="/projects"
                  className="flex items-center justify-between py-2"
                >
                  PROJECTS
                  <ChevronDown className="h-4 w-4" />
                </Link>
                <Link href="/about" className="py-2">
                  ABOUT
                </Link>
                <Link href="/contact" className="py-2">
                  CONTACT US
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
