import { sanityClient } from "@/sanity/lib/client";
import { ProjectCard } from "@/components/organisms/project-card";
import { Heading } from "@/components/atoms/typography/Heading";
import { type Project } from "@/sanity/sanity.types";
import Link from "next/link";
import { Typography } from "@/components/atoms/typography/Typography";
import { BlurredBackground } from "@/components/organisms/blurred-background";
import ImageCard from "@/components/organisms/image-card";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import { createPortableTextComponents } from "../../page/[slug]/portableTextComponents";
import { Badge } from "@/components/ui/badge";
import { SectionContainer } from "@/components/atoms/layout/SectionContainer";
import { type Metadata } from "next";

async function getProjects() {
  const projects = await sanityClient.fetch<Project[]>(`*[_type == "project"] {
    ...
  } | order(featured desc, order asc, publishedAt desc)`);

  return projects;
}
export const metadata: Metadata = {
  title: "Schrödinger Hat: Projects",
  description:
    "This is a list of all the projects we're currently contributing to. You can find more information about each project by clicking on the project card.",
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main>
      <SectionContainer size="medium">
        <Heading level={2} className="mb-2">
          All Projects
        </Heading>
        <Typography variant="medium">
          This is a list of all the projects we're currently contributing to.
          You can find more information about each project by clicking on the
          project card.
        </Typography>

        <div className="mt-8 grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <Link
              key={project._id}
              href={project.url!}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-opacity hover:opacity-80"
            >
              <ImageCard
                title={project.title!}
                image={urlFor(project.coverImage)
                  .auto("format")
                  .width(1200)
                  .height(630)
                  .url()}
                content={
                  <>
                    <PortableText
                      value={project.description!}
                      components={createPortableTextComponents()}
                    />
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((technology) => (
                          <Badge key={technology} variant={"default"}>
                            {technology}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </>
                }
              />
            </Link>
          ))}
        </div>
      </SectionContainer>
    </main>
  );
}
