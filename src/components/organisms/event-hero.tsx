import { Button } from "@/components/ui/button";
import { Typography } from "@/components/atoms/typography/Typography";
import { Heading } from "@/components/atoms/typography/Heading";
import { formatDateTime } from "@/lib/utils/date";
import type { Event } from "@/sanity/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import { Image } from "@/components/atoms/media/Image";
import {
  AirplaneLanding01Icon,
  AirplaneTakeOff01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

interface EventHeroProps {
  title: string;
  cover?: Event["cover"];
  eventPeriod?: Event["eventPeriod"];
  location?: Event["location"];
  cta?: Event["cta"];
  organiser: string;
}

export function EventHero({
  title,
  cover,
  eventPeriod,
  location,
  cta,
  organiser,
}: EventHeroProps) {
  return (
    <section className="relative max-h-[600px] overflow-hidden rounded-lg bg-slate-800">
      {/* Background image with gradient overlay */}
      {cover && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={urlFor(cover).auto("format").width(1920).height(500).url()}
              alt={title}
              withContainer={false}
              width={1920}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        </>
      )}

      {/* Content */}
      <div className="container relative p-4">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-end">
            {/* Basic Info */}
            <div className="pb-4 pl-4">
              <Heading
                level={title.length < 40 ? 1 : 2}
                className="mb-2 text-white"
              >
                {title}
              </Heading>

              {/* Organiser */}
              <Typography variant="large" className="mb-0 text-white/80">
                By {organiser}
              </Typography>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white/95 p-6 backdrop-blur-sm">
              {location?.name && (
                <div>
                  <Heading level={4} className="mb-1 text-slate-800">
                    Location
                  </Heading>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Typography variant="muted" className="text-md mt-0">
                        {location.name}
                      </Typography>
                      <Typography variant="muted" className="text-md mt-0">
                        {location.address && location.address}
                      </Typography>
                    </div>
                    {location.coordinates && (
                      <div className="flex-shrink-0">
                        <a
                          href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.lng}&zoom=15&size=120x100&markers=color:red%7C${location.coordinates.lat},${location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                            alt={`Map showing location of ${location.name}`}
                            width={120}
                            height={80}
                            className="overflow-hidden rounded-md"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="space-y-2">
                <Heading level={4} className="mb-1 text-slate-800">
                  Time
                </Heading>
                <div className="flex w-full items-center justify-center rounded-lg bg-slate-200/75 p-2 px-12">
                  {eventPeriod?.startDate && (
                    <div className="flex-shrink-0">
                      <AirplaneTakeOff01Icon className="h-8 w-8" />
                      <Typography variant="muted" className="font-bold">
                        {formatDateTime(eventPeriod.startDate, "EEEE")}
                      </Typography>
                      <Typography variant="muted">
                        {formatDateTime(eventPeriod.startDate, "d MMM, yyyy")}
                      </Typography>
                      <Typography variant="muted">
                        {formatDateTime(eventPeriod.startDate, "HH:mm a")}
                      </Typography>
                    </div>
                  )}
                  {eventPeriod?.endDate && (
                    <>
                      <div className="flex-shrink-0 px-4">
                        <ArrowRight01Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-shrink-0">
                        <AirplaneLanding01Icon className="h-8 w-8" />
                        <Typography variant="muted" className="font-bold">
                          {formatDateTime(eventPeriod.endDate, "EEEE")}
                        </Typography>
                        <Typography variant="muted">
                          {formatDateTime(eventPeriod.endDate, "d MMM, yyyy")}
                        </Typography>
                        <Typography variant="muted">
                          {formatDateTime(eventPeriod.endDate, "HH:mm a")}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {cta?.url && (
                <Button
                  className="w-full bg-primary hover:bg-primary/80"
                  size="lg"
                  asChild
                >
                  <a href={cta.url} target="_blank" rel="noopener noreferrer">
                    {cta.text || "Registrati all'evento"}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
