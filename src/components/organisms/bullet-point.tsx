import { type FC } from "react"
import { cn } from "@/lib/utils"
import { Heading } from "../atoms/typography/Heading"
import { List } from "../atoms/lists/List"
import { ListItem } from "../atoms/lists/ListItem"
import { Typography } from "../atoms/typography/Typography"

interface BulletPointProps {
  title: string
  features: string[]
  className?: string
}

export const BulletPoint: FC<BulletPointProps> = ({ title, features, className }) => {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {title && (
        <Heading level={2} className={cn("mb-0", className)}>
          {title}
        </Heading>
      )}

      <List variant="bullet">
        {features.map((feature, index) => (
          <ListItem key={index} className={cn("flex items-center gap-2 space-y-2", className)}>
            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <Typography variant="large" className={className}>
              {feature}
            </Typography>
          </ListItem>
        ))}
      </List>
    </div>
  )
}
