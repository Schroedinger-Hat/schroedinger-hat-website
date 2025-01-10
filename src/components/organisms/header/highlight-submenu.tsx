import { NavigationMenuLink } from "@/components/molecules/navigation-menu"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

/**
 * HighlightItem
 */
interface HighlightItem {
  title: string
  href: string
  description: string
  icon?: React.ReactNode
}

interface HighlightSubMenuProps {
  data: HighlightItem[]
}

export function HighlightSubMenu({ data }: HighlightSubMenuProps) {
  const [featured, ...items] = data

  return (
    <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
      <li className="row-span-4">
        {featured && (
          <NavigationMenuLink asChild>
            <a
              className="flex h-full w-full select-none flex-col justify-end rounded-md border border-border p-6 no-underline outline-none transition-colors hover:bg-gradient-to-b hover:from-muted/75 hover:to-muted focus:shadow-md"
              href={featured.href}
            >
              {featured.icon && <div className="mb-2 flex justify-center text-center">{featured.icon}</div>}
              <div className="mb-2 mt-4 text-lg font-medium">{featured.title}</div>
              <p className="text-sm leading-tight text-muted-foreground">{featured.description}</p>
            </a>
          </NavigationMenuLink>
        )}
      </li>
      {items.map((item) => (
        <ListItem key={item.title} href={item.href} title={item.title}>
          {item.description}
        </ListItem>
      ))}
    </ul>
  )
}

/**
 * ListItem
 */
export const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            {children && (
              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
