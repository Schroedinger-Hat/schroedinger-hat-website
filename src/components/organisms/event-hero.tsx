import { Plus } from "lucide-react";
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
  abstract?: Event["abstract"];
  cover?: Event["cover"];
  eventPeriod?: Event["eventPeriod"];
  location?: Event["location"];
  cta?: Event["cta"];
}

export function EventHero({
  title,
  abstract,
  cover,
  eventPeriod,
  location,
  cta,
}: EventHeroProps) {
  return (
    <section className="relative max-h-[600px] overflow-hidden rounded-lg bg-slate-800">
      {/* Background image with overlay */}
      {cover && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={urlFor(cover)
                .auto("format")
                .width(1200)
                .height(600)
                .blur(5)
                .url()}
              alt={title}
              withContainer={false}
              width={1920}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-slate-900/70" />
        </>
      )}

      {/* Content */}
      <div className="container relative px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-end">
            <Heading
              level={title.length < 40 ? 1 : 2}
              className="mb-4 text-white"
            >
              {title}
            </Heading>

            <Typography variant="large" className="mb-2 pl-4 text-white/80">
              By Schroedinger Hat
            </Typography>

            {location?.name && (
              <Typography variant="large" className="pl-4 text-white/90">
                {location.name}
                {location.address && `, ${location.address}`}
              </Typography>
            )}
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white/95 p-6 backdrop-blur-sm">
              <div className="space-y-2">
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
