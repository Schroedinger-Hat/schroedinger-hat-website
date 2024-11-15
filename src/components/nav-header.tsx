"use client";

import * as React from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import logo from "../images/logo.png";

export function NavHeader() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-14 max-w-7xl items-center">
        <div className="mr-8">
          <Link href="/" className="text-xl font-bold tracking-wider">
            <Image src={logo} width={48} height={48} />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:flex-1">
          <NavigationMenu>
            <NavigationMenuItem>
              <Link
                href="/about"
                className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
              >
                GUARDA
              </Link>
            </NavigationMenuItem>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>PARTECIPA</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/partecipa/eventi"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Eventi
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/partecipa/community-locali"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Community Locali
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="https://discord.gg/eK7bDYrnnR"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Unisciti a Discord
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>CONTRIBUISCI</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/progetti"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Progetti
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/come-speaker"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Come Speaker
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/come-individuo"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Come Individuo
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/come-partner"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Come Partner
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/projects/come-sponsor"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Come Sponsor
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>ASSOCIAZIONE</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/chi-siamo"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Chi Siamo
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/statuto"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Statuto
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/bilancio"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Bilancio
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/diventa-socio"
                          className="hover:bg-accent block rounded-md p-2"
                        >
                          Diventa Socio
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-1 items-center justify-end">
          <Button
            asChild
            variant="default"
            className="bg-black text-white hover:bg-black/90"
          >
            <Link href="https://shop.schroedinger-hat.org">SHOP</Link>
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
