import { Button } from "@/components/ui/button"
import { Typography } from "@/components/atoms/typography/Typography"
import { Heading } from "@/components/atoms/typography/Heading"
import { formatDateTime } from "@/lib/utils/date"
import type { Event, internalGroqTypeReferenceTo } from "@/sanity/sanity.types"
import { urlFor } from "@/sanity/lib/image"
import { Image } from "@/components/atoms/media/Image"
import { AirplaneLanding01Icon, AirplaneTakeOff01Icon, ArrowRight01Icon } from "hugeicons-react"

type EventWithExpandedSeries = Omit<Event, "series"> & {
  series?: {
    _ref: string
    _type: "reference"
    title?: string
    [internalGroqTypeReferenceTo]?: "eventSeries"
  }
}

interface EventHeroProps {
  title: string
  cover?: Event["cover"]
  eventPeriod?: Event["eventPeriod"]
  location?: Event["location"]
  cta?: Event["cta"]
  organiser: string
  series?: EventWithExpandedSeries["series"]
}

export function EventHero({ title, cover, eventPeriod, location, cta, organiser, series }: EventHeroProps) {
  return (
    <section className="relative max-h-[600px] min-h-[400px] overflow-hidden rounded-lg bg-slate-800">
      {/* Background image with gradient overlay */}
      {cover && (
        <>
          <div className="absolute inset-0">
            <Image
              src={urlFor(cover).auto("format").width(1600).height(500).url()}
              alt={title}
              withContainer={false}
              width={1600}
              height={500}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/20" />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 p-4 md:p-6 lg:p-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col justify-end">
            {/* Basic Info */}
            <div className="md:pb-4">
              <Typography
                as="span"
                variant="small"
                className="mb-1 inline-block rounded-full border border-slate-200 px-3 py-1 text-slate-200"
              >
                {series?.title}
              </Typography>
              <Heading level={title.length < 40 ? 1 : 2} className="mb-2 mt-4 text-white md:mt-0">
                {title}
              </Heading>

              {/* Organiser */}
              <Typography variant="large" className="text-white/80">
                By {organiser}
              </Typography>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="w-full max-w-md space-y-6 rounded-lg bg-white/95 p-4 backdrop-blur-sm md:p-6">
              {/* Location section */}
              {location?.name && (
                <div className="flex flex-col space-y-2">
                  <Heading level={4} className="text-slate-800">
                    Location
                  </Heading>
                  <div className="flex gap-4">
                    <div className="flex-1">
                      <Typography variant="muted" className="text-md">
                        <b>{location.name}</b>
                      </Typography>
                      {location.address && (
                        <Typography variant="muted" className="text-md">
                          {location.address}
                        </Typography>
                      )}
                    </div>
                    {location.coordinates && (
                      <div className="flex-shrink-0">
                        <a
                          href={`https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-md"
                        >
                          <Image
                            src={`https://maps.googleapis.com/maps/api/staticmap?center=${location.coordinates.lat},${location.coordinates.lng}&zoom=15&size=120x100&markers=color:red%7C${location.coordinates.lat},${location.coordinates.lng}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
                            alt={`Map showing location of ${location.name}`}
                            width={120}
                            height={80}
                            className="h-[80px] w-[120px] object-cover"
                          />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Time section */}
              <div className="flex flex-col space-y-2">
                <Heading level={4} className="text-slate-800">
                  Time
                </Heading>
                <div className="flex w-full items-center justify-center rounded-lg bg-slate-200/75 p-4">
                  {eventPeriod?.startDate && (
                    <div className="flex flex-col items-center">
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
                      <div className="mx-4">
                        <ArrowRight01Icon className="h-8 w-8" />
                      </div>
                      <div className="flex flex-col items-center">
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

              {/* CTA Button */}
              {cta?.url && (
                <Button className="w-full bg-primary hover:bg-primary/80" size="lg" asChild>
                  <a href={cta.url} target="_blank" rel="noopener noreferrer">
                    {cta.text ?? "Registrati all'evento"}
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
