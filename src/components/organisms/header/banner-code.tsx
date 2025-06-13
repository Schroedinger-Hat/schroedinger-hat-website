"use client"
import { cn } from "@/lib/utils"
import { X, Copy, Check } from "lucide-react"
import { useLocalStorage, useCopyToClipboard } from "@uidotdev/usehooks"
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
import { setTimeout } from "node:timers"

function EventCode({ code, title }: { code: string; title: string }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard()
  const [hasCopiedText, setHasCopiedText] = useState(Boolean(copiedText))

  async function handleCopyToClipboard(code: string) {
    await copyToClipboard(code)
    setHasCopiedText(true)

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
