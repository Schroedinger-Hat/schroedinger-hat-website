"use client"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/toast"
import { X, Copy, Check } from "lucide-react"
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
    code: event.eventCode,
    name: event.eventName,
    partner: event.partner?.name,
  }))
  return JSON.stringify(dataToHash)
}
import { setTimeout } from "node:timers"

function EventCode({ code, title }: { code: string; title: string }) {
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
    <div className={cn("flex justify-between")}>
      <dt className={cn("text-sm")}>{title}</dt>
      <div className={cn("flex items-center space-x-2 rounded-md border p-1")}>
        <dd className={cn("text-xs")}>{code}</dd>
        <button onClick={() => handleCopyToClipboard(code)}>
          {hasCopiedText ? <Check className={cn("size-4")} /> : <Copy className={cn("size-4")} />}
        </button>
      </div>
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
  } else {
    return (
      <Dialog>
        <DialogTrigger
          className={cn(
            "sticky top-0 flex w-full items-center justify-center bg-black p-4 text-center text-sm text-white",
          )}
        >
          <p>&#127881; We have some discount codes available from our parnters, use them now! &#127881;</p>
          <div className={cn("absolute right-2")} onClick={() => setIsBannerVisible(false)}>
            <X />
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Available codes</DialogTitle>
            <DialogDescription asChild>
              <div className={cn("space-y-2 divide-y")}>
                {eventCodes.map((event) => (
                  <div key={event._id} className={cn(":not(:last):pt-0 pt-2")}>
                    <span className={cn("mb-1 block text-base font-medium text-black/80")}>
                      {event.partner?.name}
                    </span>
                    {event.eventCode && event.eventName && (
                      <EventCode code={event.eventCode} title={event.eventName} />
                    )}
                  </div>
                ))}
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
}
