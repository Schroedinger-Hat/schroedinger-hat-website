import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { sanityClient } from "@/sanity/lib/client";
import type { Event } from "@/sanity/sanity.types";
import { portableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { EventHero } from "@/components/organisms/event-hero";
import { AuthorCard } from "@/components/molecules/author-card";

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
      eventPeriod,
      cta,
      "authors": coalesce(authors[]-> {
        _id,
        firstName,
        lastName,
        title,
        photo {
          asset-> {
            _ref,
            _type,
            url
          }
        },
        slug
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
          abstract={event.abstract}
          cover={event.cover}
          eventPeriod={event.eventPeriod}
          location={event.location}
          cta={event.cta}
        />
      </div>

      <div className="container mx-auto max-w-4xl py-16">
        {event.abstract && (
          <PortableText
            value={event.abstract}
            components={portableTextComponents}
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
