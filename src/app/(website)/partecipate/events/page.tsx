import { sanityClient } from "@/sanity/lib/client";
import type { Event } from "@/sanity/sanity.types";
import { Heading } from "@/components/atoms/typography/Heading";
import { Link } from "@/components/atoms/links/Link";
import { EventCard, FeaturedEventCard } from "./components/event-cards";

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
            Featured
          </Heading>
          <Link
            href={`/attend/events/${featuredEvent.slug!.current}`}
            className="hover:no-underline"
          >
            <FeaturedEventCard event={featuredEvent} />
          </Link>
        </>
      )}

      {otherUpcomingEvents.length > 0 && (
        <>
          <Heading level={2} className="mb-6">
            Upcoming
          </Heading>
          <div className="mb-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {otherUpcomingEvents.map((event) => (
              <Link
                href={`/attend/events/${event.slug!.current}`}
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
            Past events
          </Heading>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pastEvents.map((event) => (
              <Link
                href={`/attend/events/${event.slug!.current}`}
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
