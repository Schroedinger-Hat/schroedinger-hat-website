import { Project } from "@/sanity/sanity.types";
import { PortableText } from "@portabletext/react";
import { createPortableTextComponents } from "@/app/(website)/page/[slug]/portableTextComponents";
import { Image } from "../atoms/media/Image";
import { urlFor } from "@/sanity/lib/image";
import { Heading } from "../atoms/typography/Heading";
import { GitHubStars } from "./github-stars";
import { Badge } from "../ui/badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg bg-black/80 p-2 text-white">
      <div className="flex flex-col md:flex-row">
        <div className="aspect-square w-full md:aspect-auto md:w-[500px]">
          <Image
            src={
              urlFor(project.coverImage)
                .auto("format")
                .width(500)
                .height(300)
                .url() ?? ""
            }
            alt={project.title ?? ""}
            width={500}
            height={300}
            className="rounded-lg"
            withContainer={false}
          />
        </div>

        <div className="w-full space-y-4 p-6 md:w-1/2">
          <div className="space-y-4">
            <Heading className="mb-0 text-white" level={3}>
              {project.title}
            </Heading>
            <div className="text-white">
              <PortableText
                value={project.abstract ?? []}
                components={createPortableTextComponents("text-white")}
              />

              <div className="flex flex-wrap gap-2">
                {project.repositoryUrl && (
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
      </div>
    </div>
  );
}
