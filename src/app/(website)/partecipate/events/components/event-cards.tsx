import {
  type internalGroqTypeReferenceTo,
  type Event,
} from "@/sanity/sanity.types";
import { formatDateTime } from "@/lib/utils/date";
import { Heading } from "@/components/atoms/typography/Heading";
import { Image } from "@/components/atoms/media/Image";
import { Calendar01Icon, Location01Icon } from "hugeicons-react";
import { urlFor } from "@/sanity/lib/image";
import { Typography } from "@/components/atoms/typography/Typography";

type EventWithExpandedSeries = Omit<Event, "series"> & {
  series?: {
    _ref: string;
    _type: "reference";
    title?: string;
    [internalGroqTypeReferenceTo]?: "eventSeries";
  };
};

export function EventCard({ event }: { event: EventWithExpandedSeries }) {
  if (
    !event.title ||
    !event.slug ||
    !event.eventPeriod?.startDate ||
    !event.location?.city
  )
    return null;

  const imageAsset =
    event.cardImage === "cover" && event.cover?.asset
      ? event.cover.asset
      : event.background?.asset;

  return (
    <div className="relative w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[250px] flex-col justify-end bg-gradient-to-t from-slate-900/95 to-slate-900/40 p-6">
        {imageAsset && (
          <Image
            src={urlFor(imageAsset).auto("format").width(600).height(400).url()}
            alt={event.title ?? ""}
            className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75 transition-all duration-300 group-hover:brightness-50"
            withContainer={false}
            height={400}
            width={600}
          />
        )}

        <div className="relative z-10 max-w-2xl">
          <Typography
            as="span"
            variant="small"
            className="mb-1 inline-block rounded-full border border-slate-200 px-3 py-1 text-slate-200"
          >
            {event.series?.title}
          </Typography>
          <Heading level={3} className="mb-2 text-slate-100 md:mb-2">
            {event.title}
          </Heading>

          <div className="space-y-1.5 text-sm text-slate-200">
            <div className="inline-flex items-center gap-1">
              <Calendar01Icon className="h-4 w-4" />
              {formatDateTime(event.eventPeriod.startDate, "d MMMM yyyy")}
            </div>
            <div className="inline-flex items-center gap-1 overflow-hidden truncate pl-4">
              <Location01Icon className="h-4 w-4" />
              {event.location.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedEventCard({
  event,
}: {
  event: EventWithExpandedSeries;
}) {
  if (
    !event.title ||
    !event.slug ||
    !event.eventPeriod?.startDate ||
    !event.location?.city
  )
    return null;

  const imageAsset =
    event.cardImage === "cover" && event.cover?.asset
      ? event.cover.asset
      : event.background?.asset;

  return (
    <div className="relative mb-12 w-full overflow-hidden rounded-lg">
      <div className="group relative flex min-h-[400px] flex-col justify-end bg-gradient-to-t from-slate-900/95 to-slate-900/40 p-8">
        {imageAsset && (
          <Image
            src={urlFor(imageAsset)
              .auto("format")
              .width(1200)
              .height(800)
              .url()}
            alt={event.title ?? ""}
            className="absolute inset-0 -z-10 h-full w-full object-cover brightness-75 transition-all duration-300 group-hover:brightness-50"
            withContainer={false}
            height={800}
            width={1200}
            priority
          />
        )}

        <div className="relative z-10 max-w-3xl">
          <Typography
            as="span"
            variant="small"
            className="mb-1 inline-block rounded-full border border-slate-200 px-3 py-1 text-slate-200"
          >
            {event.series?.title}
          </Typography>
          <Heading level={2} className="mb-2 text-4xl text-slate-100 md:mb-2">
            {event.title}
          </Heading>

          <div className="space-y-1.5 text-sm text-slate-200">
            <div className="inline-flex items-center gap-1">
              <Calendar01Icon className="h-4 w-4" />
              {formatDateTime(event.eventPeriod.startDate, "d MMMM yyyy")}
            </div>
            <div className="inline-flex items-center gap-1 overflow-hidden truncate pl-4">
              <Location01Icon className="h-4 w-4" />
              {event.location.city}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
