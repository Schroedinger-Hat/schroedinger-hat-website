import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Event, Author } from "@/sanity/sanity.types";
import { createPortableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { EventHero } from "@/components/organisms/event-hero";
import { AuthorCard } from "@/components/molecules/author-card";

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

export default async function SingleEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event?.title) {
    notFound();
  }

  return (
    <main>
      <div className="container mx-auto max-w-6xl pt-16">
        <EventHero
          title={event.title}
          cover={event.cover}
          eventPeriod={event.eventPeriod}
          location={event.location}
          cta={event.cta}
          organiser={event.organiser!}
        />
      </div>

      <div className="container mx-auto max-w-4xl py-16">
        {event.abstract && (
          <PortableText
            value={event.abstract}
            components={createPortableTextComponents()}
          />
        )}

        {event.authors && event.authors.length > 0 && (
          <div className="mt-12">
            <h2 className="mb-6 text-2xl font-semibold">Guests</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {event.authors.map((author) => (
                <AuthorCard key={author._id} author={author} />
              ))}
            </div>
          </div>
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
