import { type ProjectsQueryResult } from "@/sanity/sanity.types"
import { AvatarComponent } from "@/components/atoms/AvatarComponent"
import type { ArrayElement } from "@/app/types/utils"

type Project = ArrayElement<ProjectsQueryResult>
type Maintainer = ArrayElement<NonNullable<Project["maintainers"]>> & {
  className?: string
}

export function MaintainerItem({ maintainer, className }: { maintainer: Maintainer; className?: string }) {
  const avatar = (
    <AvatarComponent
      displayName={true}
      image={maintainer.image}
      name={maintainer.name}
      surname={maintainer.surname}
      className={className}
    />
  )

  return maintainer.githubUrl ? (
    <a href={maintainer.githubUrl} target="_blank" rel="noopener noreferrer" className={className}>
      {avatar}
    </a>
  ) : (
    avatar
  )
}
