"use client";

import { forwardRef, useState, useEffect } from "react";
import { MessageCircleIcon, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Image } from "../../atoms/media/Image";
import { Button } from "../../molecules/button";
import { partecipateMenuData, contributeMenuData, associationMenuData } from "./data";

// Image
import logo from "@/images/logo.png";
import { HighlightSubMenu, ListItem } from "./highlight-submenu";
import { Typography } from "@/components/atoms/typography/Typography";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <header 
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        "border-b",
        {
          "bg-white border-slate-200": isScrolled,
          "bg-transparent border-transparent": !isScrolled
        }
      )}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-2 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Schrödinger Hat</span>
            <Image src={logo.src} alt="Logo" width={32} height={32} />
          </a>
        </div>

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
                "w-full h-full border-0",  // Make it fullscreen
                "data-[state=open]:animate-none data-[state=closed]:animate-none", // Remove animations
                "transition-none" // Remove transition
              )}
            >
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Image src={logo.src} alt="Logo" width={24} height={24} />
                  <span>Menu</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link 
                  href="/watch"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Watch
                </Link>
                
                <Accordion type="single" collapsible>
                  <AccordionItem value="participate">
                    <AccordionTrigger>Participate</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {partecipateMenuData.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="pl-4 text-sm text-muted-foreground hover:text-primary"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contribute">
                    <AccordionTrigger>Contribute</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {contributeMenuData.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="pl-4 text-sm text-muted-foreground hover:text-primary"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="association">
                    <AccordionTrigger>Association</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2">
                        {associationMenuData.map((item) => (
                          <Link
                            key={item.title}
                            href={item.href}
                            className="pl-4 text-sm text-muted-foreground hover:text-primary"
                          >
                            {item.title}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link 
                  href="/docs"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  Merch
                </Link>

                <Link 
                  href="https://shop.schrodinger-hat.it/"
                  className="mt-4"
                >
                  <Button className="w-full">Join</Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <NavigationMenu className="hidden lg:block">
          <NavigationMenuList>
          <NavigationMenuItem>
              <Link href="/watch" >
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Typography as="span" variant="navigation">Watch</Typography>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">Partecipate</Typography>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <HighlightSubMenu data={partecipateMenuData} />
              </NavigationMenuContent>
            </NavigationMenuItem>


            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">Contribute</Typography>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <HighlightSubMenu data={contributeMenuData} />
              </NavigationMenuContent>
            </NavigationMenuItem>
            
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <Typography as="span" variant="navigation">Association</Typography>
                </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                  {associationMenuData.map((associationMenuItem) => (
                    <ListItem
                      key={associationMenuItem.title}
                      title={associationMenuItem.title}
                      href={associationMenuItem.href}
                    >
                      {associationMenuItem.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/docs">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  <Typography as="span" variant="navigation">Merch</Typography>
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link href="https://shop.schrodinger-hat.it/" className="text-sm/6 font-semibold text-gray-900">
            <Button>Join</Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}
