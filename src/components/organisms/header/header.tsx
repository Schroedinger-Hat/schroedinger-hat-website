"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Image } from "../../atoms/media/Image"
import { Button } from "../../molecules/button"
import { participateMenuData, contributeMenuData, associationMenuData } from "./data"
import { HighlightSubMenu, ListItem } from "./highlight-submenu"
import type { EventCodesQueryResult } from "@/sanity/sanity.types"
import { Typography } from "@/components/atoms/typography/Typography"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { GlobalSearch } from "../global-search"
import { BannerCode } from "@/components/organisms/header/banner-code"
import { useIsClient } from "@uidotdev/usehooks"

// Image
import logo from "@/images/logo.png"

function ClientBanner({ eventCodes }: { eventCodes: EventCodesQueryResult }) {
  // We do this because: https://github.com/uidotdev/usehooks/issues/254
  const isClient = useIsClient()
  if (isClient === false) {
    return null
  } else {
    return <BannerCode eventCodes={eventCodes} />
  }
}

export function Header({ eventCodes }: { eventCodes: EventCodesQueryResult }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 0)
    }

    // Check initial scroll position
    handleScroll()

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn("sticky top-0 z-50 p-4 transition-all duration-200 lg:p-0", "border-b", {
        "border-slate-200 bg-white": isScrolled,
        "border-transparent bg-transparent": !isScrolled,
      })}
    >
      <ClientBanner eventCodes={eventCodes} />
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="">
            <span className="sr-only">Schrödinger Hat</span>
            <Image src={logo} alt="Logo" width={32} height={32} />
          </Link>
        </div>

        {/* Mobile menu */}
        <div className="flex lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              >
                <span className="sr-only">Open main menu</span>
                <Menu className="size-6" />
              </button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={cn(
                "h-full w-full border-0",
                "data-[state=closed]:animate-none data-[state=open]:animate-none",
                "transition-none",
              )}
            >
              <SheetHeader className="pb-4">
                <SheetTitle className="flex items-center">
                  <Image src={logo.src} alt="Logo" width={32} height={32} />
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <SheetClose asChild>
                  <Link href="/watch" className="text-sm font-medium transition-colors hover:text-primary">
                    <Typography variant="navigationMobile">Watch</Typography>
                  </Link>
                </SheetClose>

                <Accordion type="single">
                  <AccordionItem value="participate" className="border-b-0">
                    <AccordionTrigger>
                      <Typography variant="navigationMobile">Participate</Typography>
                    </AccordionTrigger>
                    <AccordionContent className="border-none">
                      <div className="flex flex-col gap-2">
                        {participateMenuData.map((item) => (
                          <SheetClose key={item.title} asChild>
                            <Link
                              href={item.href}
                              className="pl-4 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Typography variant="navigationMobile">{item.title}</Typography>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contribute" className="border-b-0">
                    <AccordionTrigger>
                      <Typography variant="navigationMobile">Contribute</Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {contributeMenuData.map((item) => (
                          <SheetClose key={item.title} asChild>
                            <Link
                              href={item.href}
                              className="pl-4 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Typography variant="navigationMobile">{item.title}</Typography>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="association" className="border-b-0">
                    <AccordionTrigger>
                      <Typography variant="navigationMobile">Association</Typography>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {associationMenuData.map((item) => (
                          <SheetClose key={item.title} asChild>
                            <Link
                              href={item.href}
                              className="pl-4 text-sm text-muted-foreground hover:text-primary"
                            >
                              <Typography variant="navigationMobile">{item.title}</Typography>
                            </Link>
                          </SheetClose>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <SheetClose asChild>
                  <Link
                    href="https://shop.schroedinger-hat.org/"
                    className="text-sm font-medium transition-colors hover:text-primary"
                  >
                    <Typography variant="navigationMobile">Merch</Typography>
                  </Link>
                </SheetClose>

                <SheetClose asChild>
                  <Link href="/association/join">
                    <Button className="w-full">Join</Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop menu */}
        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/watch">
                <Typography as="span" variant="navigation">
                  Watch
                </Typography>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">
                  Participate
                </Typography>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <HighlightSubMenu data={participateMenuData} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">
                  Contribute
                </Typography>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <HighlightSubMenu data={contributeMenuData} />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">
                  Association
                </Typography>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-2 p-4 md:w-[450px] md:grid-cols-2 lg:w-[550px]">
                  {associationMenuData.map((associationMenuItem, index) => (
                    <ListItem
                      key={associationMenuItem.title}
                      title={associationMenuItem.title}
                      href={associationMenuItem.href}
                      className={index <= 1 ? "bg-slate-50" : ""}
                    >
                      {associationMenuItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="https://shop.schroedinger-hat.org/"
              >
                <Typography as="span" variant="navigation">
                  Merch
                </Typography>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-4">
          <div className="mr-2">
            <GlobalSearch />
          </div>
          <Link href="/association/join" className="text-sm/6 font-semibold text-gray-900">
            <Button>Join</Button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
