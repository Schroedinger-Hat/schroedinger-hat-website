"use client";

import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";

interface StatBlock {
  number: string;
  title: string;
  description: string;
}

export function StatBlocks({ blocks }: { blocks: StatBlock[] }) {
  return (
    <div className="px-4">
      <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
        {blocks.map((block, index) => (
          <div key={index} className="space-y-2">
            <Heading level={2} className="text-4xl lg:text-5xl">
              {block.number}
            </Heading>
            <Heading level={3} className="text-xl">
              {block.title}
            </Heading>
            <Paragraph className="text-muted-foreground">
              {block.description}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}
