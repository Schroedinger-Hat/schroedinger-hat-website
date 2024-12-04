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
import { urlFor } from "@/sanity/lib/image";

interface EventWithAuthors extends Omit<Event, "authors"> {
  authors?: Author[];
  ogImage?: any;
}

async function getEvent(slug: string) {
  const event = await sanityClient.fetch<EventWithAuthors>(
    `*[_type == "event" && slug.current == $slug][0]{
      ...,
      series->{
        title
      },
      "authors": coalesce(authors[]-> {
        ...
      } | order(firstName asc, lastName asc), []),
      "ogImage": coalesce(cover, background)
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

  if (!event) return {};

  const ogImage = event.ogImage
    ? {
        url: urlFor(event.ogImage).width(1200).height(630).url(),
        width: 1200,
        height: 630,
        alt: event.title,
      }
    : undefined;

  return {
    title: `${event.title} | Event | Schrödinger Hat`,
    description: extractFirstParagraph(event.abstract ?? []),
    openGraph: {
      title: event.title,
      description: extractFirstParagraph(event.abstract ?? []),
      images: ogImage ? [ogImage] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: extractFirstParagraph(event.abstract ?? []),
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function SingleEventPage({ params }: PageProps) {
  const { slug } = await params;
  const event = await getEvent(slug);

  if (!event?.title) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.abstract
      ? extractFirstParagraph(event.abstract)
      : undefined,
    image: event.ogImage ? urlFor(event.ogImage).url() : undefined,
    startDate: event.eventPeriod?.startDate,
    endDate: event.eventPeriod?.endDate,
    location: event.location
      ? {
          "@type": "Place",
          name: event.location.name,
          address: {
            "@type": "PostalAddress",
            streetAddress: event.location.address,
            addressLocality: event.location.city,
          },
          ...(event.location.coordinates && {
            geo: {
              "@type": "GeoCoordinates",
              latitude: event.location.coordinates.lat,
              longitude: event.location.coordinates.lng,
            },
          }),
        }
      : undefined,
    organizer: {
      "@type": "Organization",
      name: event.organiser,
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SectionContainer size="wide" className="pb-0">
        <EventHero
          title={event.title}
          cover={event.ogImage}
          eventPeriod={event.eventPeriod}
          location={event.location}
          cta={event.cta}
          organiser={event.organiser!}
          series={event.series}
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
