import { type ProjectsQueryResult } from "@/sanity/sanity.types"
import type { ArrayElement } from "@/app/types/utils"
import { AvatarComponent } from "@/components/atoms/AvatarComponent"
import { PortableText } from "next-sanity"
import { Badge } from "@/components/ui/badge"
import { CardContent, CardHeader } from "@/components/ui/card"
import { createPortableTextComponents } from "../../../page/[slug]/portableTextComponents"
import { GitHubStars } from "@/components/organisms/github-stars"
import { formatDateTime } from "@/lib/utils/date"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TypescriptIcon } from "../assets/Typescripticon"
import { JavascriptIcon } from "../assets/JavascriptIcon"
import { PythonIcon } from "../assets/PythonIcon"
import { GolandIcon } from "../assets/GolangIcon"
import { RustIcon } from "../assets/RustIcon"
import { Typography } from "@/components/atoms/typography/Typography"
import { cn } from "@/lib/utils"

const LANGUAGE_ICONS: Record<string, React.ComponentType> = {
  typescript: TypescriptIcon,
  javascript: JavascriptIcon,
  python: PythonIcon,
  go: GolandIcon,
  rust: RustIcon,
}

export function ProjectCard(project: ArrayElement<ProjectsQueryResult>) {
  if (!project.language) return null

  const Icon = LANGUAGE_ICONS[project.language]

  return (
    <div className="rounded-lg bg-slate-50">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-4">
        {/* Main Content Column - 3/4 width */}
        <div className="md:col-span-3">
          <CardHeader className="flex flex-row items-center gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full p-2 text-primary",
                {
                  "bg-[#007ACC]": project.language === "typescript",
                  "bg-[#EFDB50]": project.language === "javascript",
                  "bg-primary/10":
                    project.language === "python" || project.language === "go" || project.language === "rust",
                },
              )}
            >
              {Icon && <Icon />}
            </div>
            <h3 className="text-xl font-semibold">{project.title}</h3>
          </CardHeader>
          <CardContent>
            <div className="prose prose-gray dark:prose-invert">
              <PortableText value={project.description!} components={createPortableTextComponents()} />
            </div>
          </CardContent>
        </div>

        {/* Meta Column - 1/4 width */}
        <div className="p-6 pt-0 md:col-span-1 md:pt-6">
          <div className="flex flex-col gap-6 rounded-lg border bg-white p-4">
            {/* Tech Stack */}
            <div className="space-y-2">
              <Typography variant="small" className="font-semibold">
                Tech Stack
              </Typography>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack?.map((technology) => (
                  <Badge key={technology} variant="secondary" className="text-sm">
                    {technology}
                  </Badge>
                ))}
              </div>
            </div>

            {/* GitHub Stars */}
            {project.showStars && project.repositoryUrl && (
              <div className="space-y-2">
                <Typography variant="small" className="font-semibold">
                  GitHub Stars
                </Typography>
                <GitHubStars url={project.repositoryUrl} />
              </div>
            )}

            {/* Launch Date */}
            {project.launchedAt && (
              <div className="space-y-2">
                <Typography variant="small" className="font-semibold">
                  Launch Date
                </Typography>
                <Typography variant="small">{formatDateTime(project.launchedAt)}</Typography>
              </div>
            )}

            {/* Maintainers */}
            {project.maintainers && project.maintainers.length > 0 && (
              <div className="space-y-2">
                <Typography variant="small" className="font-semibold">
                  Maintainers
                </Typography>
                <div className="space-y-1 pt-1">
                  {project.maintainers.map((maintainer) => (
                    <AvatarComponent
                      key={maintainer._id}
                      displayName={true}
                      image={maintainer.image}
                      name={maintainer.name}
                      surname={maintainer.surname}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Add Contribute Button */}
            {project.repositoryUrl && (
              <div className="mt-auto">
                <Button asChild className="w-full">
                  <Link href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                    Contribute
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
