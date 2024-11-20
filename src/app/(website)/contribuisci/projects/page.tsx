import { sanityClient } from "@/sanity/lib/client";
import { ProjectCard } from "@/components/organisms/project-card";
import { Heading } from "@/components/atoms/typography/Heading";
import { type Project } from "@/sanity/sanity.types";
import Link from "next/link";
import { Typography } from "@/components/atoms/typography/Typography";

async function getProjects() {
  const projects = await sanityClient.fetch<Project[]>(`*[_type == "project"] {
    ...
  } | order(featured desc, order asc, publishedAt desc)`);

  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto max-w-7xl py-16">
      <section>
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
              <ProjectCard project={project} />
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
