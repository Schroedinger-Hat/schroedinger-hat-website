import { defineQuery } from "next-sanity"

const projectsQuery = defineQuery(`*[_type == "project"] | order(order asc, publishedAt desc) {
    ...,
    maintainers[]->{
      _id,
      name,
      surname,
      role,
      image {
        "dimensions": asset->metadata.dimensions,
        "url": asset->url,
        backgroundColor
      }
    }
  }`)

export { projectsQuery }
