import { sanityClient } from "@/sanity/lib/client"
import { BlogPostCard } from "@/components/molecules/cards/BlogPostCard"
import type { Author, BlogPost } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { Heading } from "@/components/atoms/typography/Heading"
import { constructMetadata } from "@/lib/utils/metadata"

// Use intersection type to define exactly what we get from the query
type BlogPostWithAuthors = BlogPost & { authors: Author[] }

export const metadata = constructMetadata({
  title: "Blog | Schrödinger Hat",
  description: "Latest articles, tutorials and news from Schrödinger Hat",
})

export default async function BlogPage() {
  const posts = await sanityClient.fetch<BlogPostWithAuthors[]>(`
    *[_type == "blogPost"] | order(publishedAt desc) {
      ...,
      "authors": authors[]->{
        firstName,
        lastName
      }
    }
  `)

  return (
    <SectionContainer size="wide">
      <Heading level={2} className="mb-8">
        Blog
      </Heading>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>
    </SectionContainer>
  )
}
