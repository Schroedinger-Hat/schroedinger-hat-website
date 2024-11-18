import { sanityClient } from "@/sanity/lib/client";
import type { Event } from "@/sanity/sanity.types";
import { formatDateTime } from "@/lib/utils/date";
import { Heading } from "@/components/atoms/typography/Heading";
import { Title } from "@/components/atoms/title";
import { Paragraph } from "@/components/atoms/typography/Paragraph";
import { Image } from "@/components/atoms/media/Image";
import { Calendar01Icon, MapPinIcon } from "hugeicons-react";
import { cn } from "@/lib/utils";
import { Link } from "@/components/atoms/links/Link";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import { urlFor } from "@/sanity/lib/image";

function EventCard({ event }: { event: Event }) {
  if (!event.title || !event.slug) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[250px] flex-col justify-end bg-gradient-to-t from-slate-900/90 to-slate-900/0 p-6">
        {event.cover?.asset && (
          <Image
            src={urlFor(event.cover).url()}
            alt={event.title || ""}
            className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
            withContainer={false}
            height={400}
            width={600}
          />
        )}

        <div className="relative z-10 max-w-2xl">
          <Heading level={3} className="mb-2 text-slate-100">
            {event.title}
          </Heading>

          <div className="flex flex-wrap gap-4 text-sm text-slate-200">
            {event.eventPeriod?.startDate && (
              <div className="flex items-center gap-1">
                <Calendar01Icon className="h-4 w-4" />
                {formatDateTime(event.eventPeriod.startDate, "d MMMM yyyy")}
              </div>
            )}
            {event.location?.name && (
              <div className="flex items-center gap-1">
                <MapPinIcon className="h-4 w-4" />
                {event.location.name}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <div className="relative mb-12 w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[400px] flex-col justify-end bg-gradient-to-t from-slate-900/90 to-slate-900/0 p-8">
        {/* Background Image */}
        <Image
          src={
            event.cover?.asset
              ? urlFor(event.cover).url()
              : "https://placehold.co/1200x800"
          }
          alt={event.title || ""}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
          withContainer={false}
          height={800}
          width={1200}
          priority
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <Heading level={2} className="mb-3 text-4xl text-slate-100">
            {event.title}
          </Heading>

          <div className="mb-6 flex flex-wrap gap-6 text-base text-slate-200">
            {event.eventPeriod?.startDate && (
              <div className="flex items-center gap-2">
                <Calendar01Icon className="h-5 w-5" />
                {formatDateTime(event.eventPeriod.startDate, "d MMMM yyyy")}
              </div>
            )}
            {event.location?.name && (
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-5 w-5" />
                {event.location.name}
              </div>
            )}
          </div>

          {event.cta?.url && (
            <Link
              href={event.cta.url}
              className="inline-flex items-center rounded-md bg-white px-6 py-2.5 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              {event.cta.text || "Registrati all'evento"}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default async function EventsPage() {
  const events: Event[] = await sanityClient.fetch(
    `*[_type == "event"] | order(eventPeriod.startDate asc) {
      _id,
      _type,
      title,
      slug,
      abstract,
      cover {
        asset->
      },
      location,
      eventPeriod,
      cta
    }`,
  );

  const now = new Date();
  const upcomingEvents = events.filter(
    (event) =>
      event.eventPeriod?.startDate &&
      new Date(event.eventPeriod.startDate) > now,
  );
  const pastEvents = events
    .filter(
      (event) =>
        event.eventPeriod?.startDate &&
        new Date(event.eventPeriod.startDate) <= now,
    )
    .reverse();

  const featuredEvent = upcomingEvents[0];
  const otherUpcomingEvents = upcomingEvents.slice(1);

  return (
    <main className="container mx-auto py-16">
      {featuredEvent && (
        <>
          <Heading level={2} className="mb-6">
            Evento in evidenza
          </Heading>
          <Link
            href={`/partecipa/eventi/${featuredEvent.slug.current}`}
            className="hover:no-underline"
          >
            <FeaturedEventCard event={featuredEvent} />
          </Link>
        </>
      )}

      {otherUpcomingEvents.length > 0 && (
        <>
          <Heading level={2} className="mb-6">
            Altri eventi in programma
          </Heading>
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherUpcomingEvents.map((event) => (
              <Link
                href={`/partecipa/eventi/${event.slug.current}`}
                key={event._id}
                className="hover:no-underline"
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </>
      )}

      {pastEvents.length > 0 && (
        <>
          <Heading level={2} className="mb-6">
            Eventi passati
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Link
                href={`/partecipa/eventi/${event.slug.current}`}
                key={event._id}
                className="hover:no-underline"
              >
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
