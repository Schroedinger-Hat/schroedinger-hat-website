import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { useLocalStorage } from "@uidotdev/usehooks"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function BannerCode() {
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
            <DialogTitle>Available codes:</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data
              from our servers.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
}
