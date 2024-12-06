import { Heading } from "@/components/atoms/typography/Heading"
import { Paragraph } from "@/components/atoms/typography/Paragraph"
import { cn } from "@/lib/utils"

interface StatBlocksProps {
  blocks: {
    number: string | React.ReactNode
    title: string
    description: string
  }[]
  className?: string
  centered?: boolean
}

export function StatBlocks({ blocks, className, centered = true }: StatBlocksProps) {
  return (
    <div className={cn("container", className)}>
      <div
        className={cn(
          "grid grid-cols-1 gap-8",
          "sm:grid-cols-[repeat(auto-fit,minmax(240px,1fr))]",
          centered && "text-left md:text-center",
        )}
      >
        {blocks.map((block, index) => (
          <div key={index} className="space-y-0 md:space-y-2">
            <Heading level={1}>{block.number}</Heading>
            <Heading level={3}>{block.title}</Heading>
            <Paragraph className="text-muted-foreground">{block.description}</Paragraph>
          </div>
        ))}
      </div>
    </div>
  )
}
