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
  event: Pick<Event, "title" | "abstract" | "startDate" | "endDate" | "cover">;
}

export function EventHero({ event }: EventHeroProps) {
  return (
    <section className="relative overflow-hidden rounded-lg bg-slate-800">
      {/* Background image with overlay */}
      {event.cover && (
        <>
          <div className="absolute inset-0">
            <Image
              src={urlFor(event.cover).width(1920).height(600).url()}
              alt={event.title!}
              className="brightness-75"
              withContainer={false}
              width={1920}
              height={600}
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
              level={event.title!.length < 40 ? 1 : 2}
              className="mb-4 text-white"
            >
              {event.title}
            </Heading>

            <Typography variant="large" className="mb-2 pl-4 text-white/80">
              By Schroedinger Hat
            </Typography>

            <Typography variant="large" className="pl-4 text-white/90">
              Piazza di Cestello 10, Firenze, Italy
            </Typography>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white/95 p-6 backdrop-blur-sm">
              <div className="space-y-2">
                <div className="flex w-full items-center justify-center rounded-lg bg-slate-200/75 p-2 px-12">
                  {event.startDate && (
                    <div className="flex-shrink-0">
                      <AirplaneTakeOff01Icon className="h-8 w-8" />
                      <Typography variant="muted" className="font-bold">
                        {formatDateTime(event.startDate, "EEEE")}
                      </Typography>
                      <Typography variant="muted">
                        {formatDateTime(event.startDate, "d MMM, yyyy")}
                      </Typography>
                      <Typography variant="muted">
                        {formatDateTime(event.startDate, "HH:mm a")}
                      </Typography>
                    </div>
                  )}
                  {event.endDate && (
                    <>
                      <div className="flex-shrink-0 px-4">
                        <ArrowRight01Icon className="h-8 w-8" />
                      </div>
                      <div className="flex-shrink-0">
                        <AirplaneLanding01Icon className="h-8 w-8" />
                        <Typography variant="muted" className="font-bold">
                          {formatDateTime(event.endDate, "EEEE")}
                        </Typography>
                        <Typography variant="muted">
                          {formatDateTime(event.endDate, "d MMM, yyyy")}
                        </Typography>
                        <Typography variant="muted">
                          {formatDateTime(event.endDate, "HH:mm a")}
                        </Typography>
                      </div>
                    </>
                  )}
                </div>

                {/* <button className="inline-flex items-center text-primary hover:text-primary/80"> */}
                {/* <Plus className="mr-2 h-4 w-4" /> */}
                {/* Add to Calendar */}
                {/* </button> */}
              </div>

              <Button
                className="w-full bg-primary hover:bg-primary/80"
                size="lg"
              >
                Book Now (Free)
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
