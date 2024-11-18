import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Event } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { InlineText } from "@/components/atoms/typography/InlineText";
import { formatDateTime } from "@/lib/utils/date";
import { Image } from "@/components/atoms/media/Image";
import { urlFor } from "@/sanity/lib/image";
import { portableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { EventHero } from "@/components/organisms/event-hero";

async function getEvent(slug: string) {
  const event = await sanityClient.fetch<Event>(
    `*[_type == "event" && slug.current == $slug][0]{
      _id,
      _type,
      title,
      slug,
      abstract,
      cover {
        asset-> {
          _ref,
          _type,
          url
        }
      },
      location,
      startDate,
      endDate
    }`,
    { slug },
  );
  return event;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function SingleEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event?.title) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto max-w-6xl pt-16">
        <EventHero event={event} />
      </div>

      <div className="container mx-auto max-w-4xl py-16">
        {event.abstract && (
          <PortableText
            value={event.abstract}
            components={portableTextComponents}
          />
        )}
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const events = await sanityClient.fetch<Array<{ slug: { current: string } }>>(
    `*[_type == "event"] {
      slug
    }`,
  );

  return events.map((event) => ({
    slug: event.slug.current,
  }));
}
