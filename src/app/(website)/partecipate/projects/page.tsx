import { sanityClient } from "@/sanity/lib/client"
import { Heading } from "@/components/atoms/typography/Heading"
import { type Project } from "@/sanity/sanity.types"
import { Typography } from "@/components/atoms/typography/Typography"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { type Metadata } from "next"
import { ProjectCard } from "./components/project-card"
import { constructMetadata } from "@/lib/utils/metadata"
import { AnimatedSection } from "@/components/atoms/layout/AnimatedSection"
import { DURATION_TWO_FRAMES } from "@/components/atoms/layout/const"

async function getProjects() {
  const projects = await sanityClient.fetch<Project[]>(`*[_type == "project"] {
    ...
  } | order(order asc, publishedAt desc)`)

  return projects
}

export const metadata: Metadata = constructMetadata({
  title: "Projects | Schrödinger Hat",
  description:
    "This is a list of all the projects we're currently contributing to. You can find more information about each project by clicking on the project card.",
})

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <main>
      <SectionContainer size="medium">
        <Heading level={2}>All Projects</Heading>
        <Typography variant="medium">
          This is a list of all the projects we&apos;re currently contributing to.
          <br />
          You can find more information about each project by clicking on the project card.
        </Typography>
      </SectionContainer>

      <SectionContainer size="medium" withBackground notAnimated>
        <div className="grid grid-cols-1 gap-4">
          {projects.map((project, index) => (
            <AnimatedSection key={project._id} delay={index * DURATION_TWO_FRAMES * 4}>
              <ProjectCard key={project._id} project={project} />
            </AnimatedSection>
          ))}
        </div>
      </SectionContainer>
    </main>
  )
}
