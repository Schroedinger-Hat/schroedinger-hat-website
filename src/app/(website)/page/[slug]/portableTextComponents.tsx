import { type PortableTextComponents } from "@portabletext/react";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Heading } from "@/components/atoms/typography/Heading";
import { Blockquote } from "@/components/atoms/typography/Blockquote";
import { List } from "@/components/atoms/lists/List";
import { ListItem } from "@/components/atoms/lists/ListItem";
import { InlineText } from "@/components/atoms/typography/InlineText";
import { Link } from "@/components/atoms/links/Link";

export const createPortableTextComponents = (
  className?: string,
): PortableTextComponents => ({
  block: {
    normal: ({ children }) => (
      <Paragraph className={className}>{children}</Paragraph>
    ),
    h1: ({ children }) => (
      <Heading level={1} className={className}>
        {children}
      </Heading>
    ),
    h2: ({ children }) => (
      <Heading level={2} className={className}>
        {children}
      </Heading>
    ),
    h3: ({ children }) => (
      <Heading level={3} className={className}>
        {children}
      </Heading>
    ),
    h4: ({ children }) => (
      <Heading level={4} className={className}>
        {children}
      </Heading>
    ),
    blockquote: ({ children }) => (
      <Blockquote className={className}>{children}</Blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <List variant="bullet" className={className}>
        {children}
      </List>
    ),
    number: ({ children }) => (
      <List variant="number" className={className}>
        {children}
      </List>
    ),
  },
  listItem: ({ children }) => (
    <ListItem className={className}>{children}</ListItem>
  ),
  marks: {
    strong: ({ children }) => (
      <InlineText variant="strong" className={className}>
        {children}
      </InlineText>
    ),
    em: ({ children }) => (
      <InlineText variant="em" className={className}>
        {children}
      </InlineText>
    ),
    code: ({ children }) => (
      <InlineText variant="code" className={className}>
        {children}
      </InlineText>
    ),
    link: ({ value, children }) => (
      <Link href={value?.href || ""} className={className}>
        {children}
      </Link>
    ),
  },
});
