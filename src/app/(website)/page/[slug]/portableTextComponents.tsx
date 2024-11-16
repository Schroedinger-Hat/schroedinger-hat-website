import { PortableTextComponents } from "@portabletext/react";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Heading } from "@/components/atoms/typography/Heading";
import { Blockquote } from "@/components/atoms/typography/Blockquote";
import { List } from "@/components/atoms/lists/List";
import { ListItem } from "@/components/atoms/lists/ListItem";
import { InlineText } from "@/components/atoms/typography/InlineText";
import { Link } from "@/components/atoms/links/Link";

export const portableTextComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <Paragraph>{children}</Paragraph>,
    h1: ({ children }) => <Heading level={1}>{children}</Heading>,
    h2: ({ children }) => <Heading level={2}>{children}</Heading>,
    h3: ({ children }) => <Heading level={3}>{children}</Heading>,
    h4: ({ children }) => <Heading level={4}>{children}</Heading>,
    blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
  },
  list: {
    bullet: ({ children }) => <List variant="bullet">{children}</List>,
    number: ({ children }) => <List variant="number">{children}</List>,
  },
  listItem: ({ children }) => <ListItem>{children}</ListItem>,
  marks: {
    strong: ({ children }) => (
      <InlineText variant="strong">{children}</InlineText>
    ),
    em: ({ children }) => <InlineText variant="em">{children}</InlineText>,
    code: ({ children }) => <InlineText variant="code">{children}</InlineText>,
    link: ({ value, children }) => (
      <Link href={value?.href || ""}>{children}</Link>
    ),
  },
};
