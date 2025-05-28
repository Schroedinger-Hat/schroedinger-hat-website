import { defineQuery } from "next-sanity"

const projectsQuery = defineQuery(`*[_type == "project"] | order(sortIndex asc) {
    ...,
    maintainers[]->{
      _id,
      name,
      surname,
      role,
      githubUrl,
      image {
        "dimensions": asset->metadata.dimensions,
        "url": asset->url,
        backgroundColor
      }
    }
  }`)

export { projectsQuery }
