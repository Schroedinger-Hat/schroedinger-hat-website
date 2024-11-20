import { sanityClient } from "@/sanity/lib/client";
import { ProjectCard } from "@/components/organisms/project-card";
import { Heading } from "@/components/atoms/typography/Heading";
import { Project } from "@/sanity/sanity.types";

async function getProjects() {
  const projects = await sanityClient.fetch<Project[]>(`*[_type == "project"] {
    ...
  } | order(featured desc, order asc, publishedAt desc)`);

  return projects;
}

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="container mx-auto max-w-7xl px-4 py-8">
      {/* All Projects Section */}
      <section>
        <Heading level={2} className="mb-6">
          All Projects
        </Heading>

        <div className="grid grid-cols-1 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </main>
  );
}
