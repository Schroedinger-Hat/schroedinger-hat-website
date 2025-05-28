import type { SanityImageDimensions } from "@/sanity/sanity.types"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface AvatarComponentProps {
  displayName?: boolean
  image: {
    dimensions: SanityImageDimensions | null
    url: string | null
    backgroundColor: string | null
  } | null
  name: string | null
  surname: string | null
}

function getInitials(name: string | null, surname: string | null) {
  if (!name || !surname) return "?"
  const nameInitial = name?.charAt(0).toUpperCase() || ""
  const surnameInitial = surname?.charAt(0).toUpperCase() || ""
  return `${nameInitial}${surnameInitial}`
}

export function AvatarComponent({ image, name, surname, displayName }: AvatarComponentProps) {
  return (
    <div className="flex items-center justify-start gap-x-2">
      <Avatar
        className="size-10 border-2 border-black/20"
        style={{
          backgroundColor: image?.backgroundColor ?? "transparent",
        }}
      >
        <AvatarImage src={image?.url ?? undefined} />
        <AvatarFallback>{getInitials(name, surname)}</AvatarFallback>
      </Avatar>
      {displayName && (
        <span className="text-xs">
          {name} {surname}
        </span>
      )}
    </div>
  )
}
