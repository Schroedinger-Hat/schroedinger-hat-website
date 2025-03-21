import { sanityClient } from "@/sanity/lib/client"
import type { Event } from "@/sanity/sanity.types"
import { Heading } from "@/components/atoms/typography/Heading"
import { Link } from "@/components/atoms/links/Link"
import { EventCard, FeaturedEventCard } from "./components/event-cards"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { constructMetadata } from "@/lib/utils/metadata"
import { AnimatedSection } from "@/components/atoms/layout/AnimatedSection"
import { DURATION_TWO_FRAMES } from "@/components/atoms/layout/const"

export const metadata = constructMetadata({
  title: "Events | Schrödinger Hat",
  description: "Explore our upcoming and past events.",
})

export default async function EventsPage() {
  const events: Event[] = await sanityClient.fetch(
    `*[_type == "event"] | order(eventPeriod.startDate asc) {
      _id,
      _type,
      title,
      slug,
      abstract,
      cardImage,
      coolBecause,
      cover {
        asset->
      },
      background {
        asset->
      },
      location,
      eventPeriod,
      cta,
      series->{
        title
      }
    }`,
  )

  const now = new Date()
  const upcomingEvents = events.filter(
    (event) => event.eventPeriod?.startDate && new Date(event.eventPeriod.startDate) > now,
  )
  const pastEvents = events
    .filter((event) => event.eventPeriod?.startDate && new Date(event.eventPeriod.startDate) <= now)
    .reverse()

  const featuredEvent = upcomingEvents[0]
  const otherUpcomingEvents = upcomingEvents.slice(1)

  return (
    <main>
      <SectionContainer size="wide">
        {featuredEvent && (
          <>
            <Heading level={2} className="mb-6">
              Featured
            </Heading>
            <Link href={`/participate/events/${featuredEvent.slug!.current}`} className="hover:no-underline">
              <AnimatedSection>
                <FeaturedEventCard event={featuredEvent} />
              </AnimatedSection>
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
                  href={`/participate/events/${event.slug!.current}`}
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
              {pastEvents.map((event, index) => (
                <Link
                  href={`/participate/events/${event.slug!.current}`}
                  key={event._id}
                  className="hover:no-underline"
                >
                  <AnimatedSection key={event._id} delay={(1 + index) * DURATION_TWO_FRAMES}>
                    <EventCard event={event} />
                  </AnimatedSection>
                </Link>
              ))}
            </div>
          </>
        )}
      </SectionContainer>
    </main>
  )
}
