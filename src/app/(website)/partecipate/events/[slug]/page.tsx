import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Event, Author } from "@/sanity/sanity.types";
import { createPortableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { EventHero } from "@/components/organisms/event-hero";
import { AuthorCard } from "@/components/molecules/author-card";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";
import { extractFirstParagraph } from "@/lib/seo";
import { Heading } from "@/components/atoms/typography/Heading";

interface EventWithAuthors extends Omit<Event, "authors"> {
  authors?: Author[];
}

async function getEvent(slug: string) {
  const event = await sanityClient.fetch<EventWithAuthors>(
    `*[_type == "event" && slug.current == $slug][0]{
      ...,
      "authors": coalesce(authors[]-> {
        ...
      } | order(firstName asc, lastName asc), [])
    }`,
    { slug },
  );
  return event;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEvent(slug);
  return {
    title: `${event?.title} | Event | Schrödinger Hat`,
    description: extractFirstParagraph(event?.abstract ?? []),
  };
}

export default async function SingleEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event?.title) {
    notFound();
  }

  return (
    <main>
      <SectionContainer size="wide" className="pb-0">
        <EventHero
          title={event.title}
          cover={event.cover}
          eventPeriod={event.eventPeriod}
          location={event.location}
          cta={event.cta}
          organiser={event.organiser!}
        />
      </SectionContainer>

      <SectionContainer size="narrow">
        {event.abstract && (
          <PortableText
            value={event.abstract}
            components={createPortableTextComponents()}
          />
        )}
      </SectionContainer>

      <SectionContainer size="narrow" padding="little" withBackground>
        {event.authors && event.authors.length > 0 && (
          <>
            <Heading level={2} className="mb-6">
              Guests
            </Heading>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {event.authors.map((author) => (
                <AuthorCard key={author._id} author={author} />
              ))}
            </div>
          </>
        )}
      </SectionContainer>
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
