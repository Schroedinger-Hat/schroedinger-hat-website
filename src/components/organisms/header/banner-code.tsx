"use client"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast"
import { formatDateTime } from "@/lib/utils/date"
import { X, Copy, Check, Tag, Gift, Sparkles, Calendar } from "lucide-react"
import { useLocalStorage, useCopyToClipboard } from "@uidotdev/usehooks"
import { useEffect, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { EventCodesQueryResult } from "@/sanity/sanity.types"
import { useState } from "react"

function createEventCodesHash(eventCodes: EventCodesQueryResult): string {
  const dataToHash = eventCodes.map((event) => ({
    id: event._id,
    code: event.code,
    name: event.name,
    partner: event.partner?.name,
  }))
  return JSON.stringify(dataToHash)
}

function EventCode({ code, description }: { code: string; description: string }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [hasCopiedText, setHasCopiedText] = useState(Boolean(copiedText))
  const { addToast } = useToast()

  async function handleCopyToClipboard(code: string) {
    await copyToClipboard(code)
    setHasCopiedText(true)

    addToast({
      variant: "success",
      children: (
        <div className={cn("w-96")}>
          <p className="font-semibold">Copied!</p>
          <p className="text-sm">Code copied to clipboard</p>
        </div>
      ),
    })

    setTimeout(() => {
      setHasCopiedText(false)
    }, 2000)
  }

  return (
    <div
      className={cn(
        "group relative flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50/50 p-3",
        "transition-all duration-200 hover:border-gray-300 hover:bg-gray-50",
      )}
    >
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <Tag className="h-3 w-3 text-gray-500" />
          <span className="text-xs font-medium uppercase tracking-wider text-gray-600">Promo Code</span>
          <div className="flex items-center">
            <div className="rounded-full bg-green-100 px-3 py-0.5 text-xs font-medium text-green-800">
              {description}
            </div>
          </div>
        </div>
        <code
          className={cn(
            "break-all font-mono text-sm font-semibold text-gray-900",
            "rounded border bg-white px-2 py-1",
          )}
        >
          {code}
        </code>
      </div>

      <button
        onClick={() => handleCopyToClipboard(code)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-200",
          hasCopiedText
            ? "border-green-200 bg-green-50 text-green-600"
            : "border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50",
        )}
        title={hasCopiedText ? "Copied!" : "Copy code"}
      >
        {hasCopiedText ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

function PartnerIcon({ partnerName }: { partnerName: string }) {
  const getPartnerColor = (name: string) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-orange-500", "bg-pink-500"]
    const index = name.length % colors.length
    return colors[index]
  }

  return (
    <div
      className={cn(
        "flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg text-sm font-semibold text-white",
        getPartnerColor(partnerName),
      )}
    >
      {partnerName.charAt(0).toUpperCase()}
    </div>
  )
}

export function BannerCode({ eventCodes }: { eventCodes: EventCodesQueryResult }) {
  const [isBannerVisible, setIsBannerVisible] = useLocalStorage("banner-visible", true)
  const [lastDataHash, setLastDataHash] = useLocalStorage("banner-data-hash", "")

  const currentDataHash = useMemo(() => createEventCodesHash(eventCodes), [eventCodes])

  useEffect(() => {
    if (lastDataHash && lastDataHash !== currentDataHash) {
      setIsBannerVisible(true)
    }
    setLastDataHash(currentDataHash)
  }, [currentDataHash, lastDataHash, setIsBannerVisible, setLastDataHash])

  if (!isBannerVisible) {
    return null
  }

  return (
    <div className="sticky top-0 w-full">
      <div
        className={cn(
          "relative flex w-full items-center justify-center",
          "bg-gradient-to-r from-purple-600 to-blue-600 p-4 text-center text-sm text-white",
        )}
      >
        <Dialog>
          <DialogTrigger
            className={cn(
              "flex items-center gap-2 transition-all duration-300 hover:from-purple-700 hover:to-blue-700",
            )}
          >
            <Gift className="size-4" />
            <p className="font-medium">Special discount codes available from our partners - Click to view!</p>
            <Gift className="size-4" />
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] max-w-2xl overflow-y-auto">
            <DialogHeader className="pb-1">
              <DialogTitle className="flex items-center gap-2 text-xl">
                <Gift className="h-5 w-5 text-purple-600" />
                Available Discount Codes
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                Use these exclusive codes from our partners to attend their events
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6">
              {eventCodes.map((event) => (
                <div
                  key={event._id}
                  className={cn(
                    "rounded-xl border border-gray-200 bg-white p-6 shadow-sm",
                    "transition-shadow duration-200 hover:shadow-md",
                  )}
                >
                  <div className="mb-4 flex items-start gap-4">
                    {event.partner?.name && <PartnerIcon partnerName={event.partner.name} />}
                    <div className="flex-1">
                      <h3 className="mb-1 text-lg font-semibold text-gray-900">
                        {event.partner?.name ?? "Partner"}
                      </h3>
                      {event.name && (
                        <p className="flex items-center gap-1 text-sm text-gray-600">
                          <Sparkles className="size-3" />
                          {event.url ? (
                            <a
                              href={event.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline decoration-gray-300 underline-offset-2 transition-colors duration-150 hover:decoration-gray-500"
                            >
                              {event.name}
                            </a>
                          ) : (
                            event.name
                          )}
                          -
                          {event.date && (
                            <>
                              <Calendar className="size-3" />
                              <span className="text-sm">{formatDateTime(event.date, "d MMMM, yyyy")}</span>
                            </>
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                  {event.code && event.description && (
                    <EventCode code={event.code} description={event.description} />
                  )}
                </div>
              ))}
            </div>

            {eventCodes.length === 0 && (
              <div className="py-12 text-center">
                <Gift className="mx-auto mb-4 size-12 text-gray-300" />
                <p className="text-gray-500">No codes available at the moment</p>
              </div>
            )}
          </DialogContent>
        </Dialog>

        <button
          onClick={() => setIsBannerVisible(false)}
          className={cn(
            "absolute right-2 flex size-6 items-center justify-center rounded-md transition-colors hover:bg-white/20",
          )}
        >
          <X className="size-4" />
        </button>
      </div>
    </div>
  )
}
