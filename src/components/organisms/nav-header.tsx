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
              GUARDA
            </Link>

            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>PARTECIPA</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[200px] gap-3 p-4">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/partecipa/eventi"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Eventi</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/partecipa/community-locali"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">
                            Community Locali
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
                          <Paragraph className="m-0">
                            Unisciti a Discord
                          </Paragraph>
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
                          href="/contribuisci/progetti"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Progetti</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribuisci/come-speaker"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Come Speaker</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribuisci/come-individuo"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Come Individuo</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribuisci/come-partner"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Come Partner</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/contribuisci/come-sponsor"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Come Sponsor</Paragraph>
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
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Chi Siamo</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/page/statute"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Statuto</Paragraph>
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
                            Dati Amministrativi
                          </Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/diventa-socio"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Diventa Socio</Paragraph>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link
                          href="/associazione/press-kit"
                          className="block rounded-md p-2 hover:bg-accent"
                        >
                          <Paragraph className="m-0">Press Kit</Paragraph>
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
