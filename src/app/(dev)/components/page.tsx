"use client";

import { inDevEnvironment } from "@/app/consts";
import { redirect } from "next/navigation";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Heading } from "@/components/atoms/typography/Heading";
import { Blockquote } from "@/components/atoms/typography/Blockquote";
import { List } from "@/components/atoms/lists/List";
import { ListItem } from "@/components/atoms/lists/ListItem";
import { InlineText } from "@/components/atoms/typography/InlineText";
import { Link } from "@/components/atoms/links/Link";
import { Image } from "@/components/atoms/media/Image";
import GradientCard from "@/components/organisms/gradient-card";
import ImageCard from "@/components/organisms/image-card";
import { ImageLabel } from "@/components/organisms/image-label";
import { BulletPoint } from "@/components/organisms/bullet-point";

export default function ComponentsPage() {
  // Redirect if not in development environment
  if (!inDevEnvironment) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-3xl space-y-8 p-8">
      <Heading level={1}>Components Showcase</Heading>
      <hr />

      {/* Headings */}
      <section className="space-y-4">
        <Heading level={1}>Heading Level 1</Heading>
        <Heading level={2}>Heading Level 2</Heading>
        <Heading level={3}>Heading Level 3</Heading>
        <Heading level={4}>Heading Level 4</Heading>
      </section>
      <hr />

      {/* Paragraphs */}
      <section className="space-y-4">
        <Heading level={2}>Paragraphs</Heading>
        <Paragraph>
          This is a standard paragraph with some text. It demonstrates the
          default text styling.
        </Paragraph>
      </section>
      <hr />

      {/* Blockquote */}
      <section className="space-y-4">
        <Heading level={2}>Blockquote</Heading>
        <Blockquote>
          This is a blockquote. It&apos;s used to highlight important quotes or
          statements.
        </Blockquote>
      </section>
      <hr />

      {/* Lists */}
      <section className="space-y-4">
        <Heading level={2}>Lists</Heading>

        <Heading level={3}>Bullet List</Heading>
        <List variant="bullet">
          <ListItem>First bullet item</ListItem>
          <ListItem>Second bullet item</ListItem>
          <ListItem>Third bullet item</ListItem>
        </List>

        <Heading level={3}>Numbered List</Heading>
        <List variant="number">
          <ListItem>First numbered item</ListItem>
          <ListItem>Second numbered item</ListItem>
          <ListItem>Third numbered item</ListItem>
        </List>
      </section>
      <hr />

      {/* Inline Text Styles */}
      <section className="space-y-4">
        <Heading level={2}>Inline Text Styles</Heading>
        <Paragraph>
          This paragraph contains{" "}
          <InlineText variant="strong">bold text</InlineText>,{" "}
          <InlineText variant="em">italic text</InlineText>, and{" "}
          <InlineText variant="code">code text</InlineText>.
        </Paragraph>
      </section>
      <hr />

      {/* Links */}
      <section className="space-y-4">
        <Heading level={2}>Links</Heading>
        <Paragraph>
          Here is an example of a{" "}
          <Link href="https://example.com">hyperlink</Link>.
        </Paragraph>
      </section>
      <hr />

      {/* Images */}
      <section className="space-y-4">
        <Heading level={2}>Images</Heading>

        <div className="space-y-4">
          <Image
            src="https://placehold.co/600x400"
            alt="Example image with 600x400 dimensions"
            width={600}
            height={400}
          />

          <Paragraph className="text-sm text-gray-500">
            Default image with rounded corners and overflow protection
          </Paragraph>
        </div>

        <div className="space-y-4">
          <Image
            src="https://placehold.co/300x300"
            alt="Square example image"
            width={300}
            height={300}
            className="aspect-square w-[300px]"
          />

          <Paragraph className="text-sm text-gray-500">
            Square image with custom dimensions
          </Paragraph>
        </div>
      </section>

      <section className="space-y-4">
        <Heading level={2}>Custom Components</Heading>

        <Heading level={3}>Gradient Card</Heading>
        <div className="h-[300px]">
          <GradientCard
            imageSrc="https://placehold.co/600x400"
            imageAlt="Avatar"
            title="Personalized interactions"
            description="Lorem ipsum dolor. The weighty euismod. However, the lion remains. Lorem ipsum still cohabitates with the context."
          />
        </div>

        <Heading level={3}>Image Card</Heading>
        <ImageCard
          image="https://picsum.photos/400/250"
          title="Image Card Title"
        />

        <Heading level={3}>Image Label</Heading>
        <div className="flex flex-row gap-4">
          <div className="h-[400px] w-[400px]">
            <ImageLabel
              src="https://picsum.photos/400/400"
              label="Image Label long long long"
            />
          </div>
          <div className="h-[400px] w-[400px]">
            <ImageLabel
              src="https://picsum.photos/400/400"
              label="Image Label"
            />
          </div>
        </div>

        <Heading level={3}>Bullet Point</Heading>
        <BulletPoint
          title="Bullet Point Title"
          features={["Feature 1", "Feature 2", "Feature 3"]}
        />
      </section>
    </div>
  );
}
