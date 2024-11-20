import { type Project } from "@/sanity/sanity.types";
import { PortableText } from "@portabletext/react";
import { createPortableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { Image } from "../atoms/media/Image";
import { urlFor } from "@/sanity/lib/image";
import { Heading } from "../atoms/typography/Heading";
import { GitHubStars } from "./github-stars";
import { Badge } from "../ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg bg-black/90 p-2 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square w-full md:aspect-auto md:w-[500px]">
          {project.coverImage && (
            <Image
              src={urlFor(project.coverImage)
                .auto("format")
                .width(500)
                .height(250)
                .url()}
              alt={project.title ?? ""}
              width={500}
              height={250}
              className="rounded-lg"
              withContainer={false}
            />
          )}
        </div>

        <div className="flex w-full flex-col justify-between space-y-4 py-2 pl-4 md:w-1/2">
          <div>
            <Heading className="mb-2 text-white" level={2}>
              {project.title}
            </Heading>
            <div className="text-white">
              <PortableText
                value={project.abstract ?? []}
                components={createPortableTextComponents("text-white")}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.repositoryUrl && project.showStars && (
              <Badge>
                <GitHubStars url={project.repositoryUrl} />
              </Badge>
            )}
            {project.technologies && (
              <div className="flex flex-wrap gap-1">
                {project.technologies.map((technology) => (
                  <Badge key={technology} variant={"secondary"}>
                    {technology}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
