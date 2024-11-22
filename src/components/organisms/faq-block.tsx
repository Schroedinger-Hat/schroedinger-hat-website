import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";

type FAQ = {
  _id: string;
  question: string;
  answer: any[]; // Portable Text content
};

interface FaqBlockProps {
  groupKey: string;
  title?: string;
  description?: string;
}

async function getFAQs(groupKey: string): Promise<FAQ[]> {
  return sanityClient.fetch(
    `
    *[_type == "faq" && groupKey == $groupKey] | order(order asc) {
      _id,
      question,
      answer
    }
  `,
    { groupKey },
  );
}

export async function FaqBlock({
  groupKey,
  title = "FAQ",
  description,
}: FaqBlockProps) {
  const faqs: FAQ[] = await getFAQs(groupKey);

  return (
    <div className="container mx-auto max-w-2xl py-16">
      <div className="pb-4 text-center">
        <Heading level={2}>{title}</Heading>
        {description && (
          <Typography variant="medium" className="text-left">
            {description}
          </Typography>
        )}
      </div>
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq._id} value={faq._id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <PortableText value={faq.answer} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
