import { Typography } from "@/components/atoms/typography/Typography"
import { Heading } from "@/components/atoms/typography/Heading"
import { PortableText } from "@portabletext/react"
import { Clock4 } from "lucide-react"
import { sanityClient } from "@/sanity/lib/client"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"

type EffortLevel = "low" | "moderate" | "elevate"

interface JobPost {
  _id: string
  title: string
  description: any[]
  location: string
  effort: EffortLevel
  publishedAt: string
}

async function getJobPosts() {
  const query = `*[_type == "jobPost" && isActive == true && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    description,
    location,
    effort,
    publishedAt
  }`

  return sanityClient.fetch<JobPost[]>(query)
}

const effortColorMap: Record<EffortLevel, "green" | "yellow" | "red"> = {
  low: "green",
  moderate: "yellow",
  elevate: "red",
} as const

const effortLabelMap: Record<EffortLevel, string> = {
  low: "Low effort (<4 hours/month)",
  moderate: "Moderate effort (4-8 hours/month)",
  elevate: "High effort (>8 hours/month)",
} as const

export async function JobPosts() {
  const jobs = await getJobPosts()

  if (!jobs.length) {
    return null
  }

  return (
    <div>
      <Heading level={2} className="mb-2">
        Skilled Opportunities
      </Heading>
      <Typography className="mb-8">
        If you're a professional looking to contribute we have a series of specialized roles that may be of
        interest.
      </Typography>
      <div className="grid gap-8 space-y-8">
        {jobs.map((job) => (
          <div key={job._id}>
            {/* Jobs Metadata - Responsive Layout */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <Heading level={3} className="mb-0">
                {job.title}
              </Heading>

              {/* Middle section with badges */}
              <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:mr-4">
                <Badge variant="outline">{job.location}</Badge>
                <Badge variant={effortColorMap[job.effort]}>
                  <Clock4 className="mr-1 h-3 w-3" />
                  {effortLabelMap[job.effort]}
                </Badge>
              </div>

              {/* Apply button */}
              <div className="hidden sm:block sm:flex-shrink-0">
                <a href={`mailto:hello@schroedinger-hat.org?subject=Application for ${job.title}`}>
                  <Button variant="default">Apply</Button>
                </a>
              </div>
            </div>

            {/* Jobs Content */}
            <div className="prose prose-sm mt-4 max-w-none flex-1 rounded-lg border-l-4 border-gray-300 bg-gray-50 p-4 italic">
              <PortableText value={job.description} />
            </div>

            <div className="mt-4 block sm:hidden">
              <a href={`mailto:hello@schroedinger-hat.org?subject=Application for ${job.title}`}>
                <Button variant="default">Apply</Button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
