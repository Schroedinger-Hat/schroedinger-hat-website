import { type Event } from "@/sanity/sanity.types";
import { formatDateTime } from "@/lib/utils/date";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { Calendar01Icon, MapPinIcon } from "hugeicons-react";
import { urlFor } from "@/sanity/lib/image";

export function EventCard({ event }: { event: Event }) {
  if (!event.title || !event.slug) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[250px] flex-col justify-end bg-gradient-to-t from-slate-900/90 to-slate-900/0 p-6">
        {event.cover?.asset && (
          <Image
            src={urlFor(event.cover)
              .auto("format")
              .width(600)
              .height(400)
              .url()}
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

export function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <div className="relative mb-12 w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[400px] flex-col justify-end bg-gradient-to-t from-slate-900/90 to-slate-900/0 p-8">
        <Image
          src={urlFor(event.cover).auto("format").width(1200).height(800).url()}
          alt={event.title || ""}
          className="absolute inset-0 -z-10 h-full w-full object-cover transition-all duration-300 group-hover:brightness-75"
          withContainer={false}
          height={800}
          width={1200}
          priority
        />

        <div className="relative z-10 max-w-3xl">
          <Heading level={2} className="mb-3 text-4xl text-slate-100">
            {event.title}
          </Heading>

          <div className="mb-0 flex flex-wrap gap-6 text-base text-slate-200">
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
        </div>
      </div>
    </div>
  );
}
