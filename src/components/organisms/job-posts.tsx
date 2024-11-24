import { Typography } from "@/components/atoms/typography/Typography";
import { Heading } from "@/components/atoms/typography/Heading";
import { PortableText } from "@portabletext/react";
import { Clock4 } from "lucide-react";
import { sanityClient } from "@/sanity/lib/client";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

interface JobPost {
  _id: string;
  title: string;
  description: any[];
  location: string;
  effort: string;
  publishedAt: string;
}

async function getJobPosts() {
  const query = `*[_type == "jobPost" && isActive == true && publishedAt < now()] | order(publishedAt desc) {
    _id,
    title,
    description,
    location,
    effort,
    publishedAt
  }`;

  return sanityClient.fetch<JobPost[]>(query);
}

const effortColorMap = {
  low: "green",
  moderate: "yellow",
  elevate: "red",
};

const effortLabelMap = {
  low: "Low effort (<4 hours/month)",
  moderate: "Moderate effort (4-8 hours/month)",
  elevate: "High effort (>8 hours/month)",
};

export async function JobPosts() {
  const jobs = await getJobPosts();

  if (!jobs.length) {
    return null;
  }

  return (
    <div>
      <Heading level={2} className="mb-2">
        Skilled Opportunities
      </Heading>
      <Typography className="mb-8">
        If you're a professional looking to contribute we have a series of
        specialized roles that may be of interest.
      </Typography>
      <div className="grid gap-8">
        {jobs.map((job) => (
          <div key={job._id} className="">
            <div className="flex items-start justify-between">
              <Heading level={3} className="mb-2">
                {job.title}
              </Heading>
              <div className="mb-4 flex items-center gap-4">
                <Badge>{job.location}</Badge>
                <Badge
                  variant={
                    effortColorMap[job.effort as keyof typeof effortColorMap]
                  }
                >
                  <Clock4 className="mr-1 h-3 w-3" />
                  {effortLabelMap[job.effort as keyof typeof effortLabelMap]}
                </Badge>
                <a
                  href={`mailto:hello@schroedinger-hat.org?subject=Application for ${job.title}`}
                >
                  <Button variant="outline">Apply</Button>
                </a>
              </div>
            </div>
            <div className="prose prose-sm max-w-none flex-1 rounded-lg border-l-4 border-gray-300 bg-gray-50 p-4 italic">
              <PortableText value={job.description} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
