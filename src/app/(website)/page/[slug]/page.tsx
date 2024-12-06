import { notFound } from "next/navigation"
import { PortableText } from "@portabletext/react"
import { urlFor } from "@/sanity/lib/image"
import { sanityClient } from "@/sanity/lib/client"
import { createPortableTextComponents } from "./portableTextComponents"
import { Heading } from "@/components/atoms/typography/Heading"
import { Image } from "@/components/atoms/media/Image"
import { formatDateTime } from "@/lib/utils/date"
import { Typography } from "@/components/atoms/typography/Typography"
import type { Page } from "@/sanity/sanity.types"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { type Metadata } from "next"
import { extractFirstParagraph } from "@/lib/seo"
import { constructMetadata } from "@/lib/utils/metadata"

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const pageData = await sanityClient.fetch<Page | null>(`*[_type == "page" && slug.current == $slug][0]`, {
    slug,
  })
  return constructMetadata({
    title: `${pageData?.title} | Schrödinger Hat`,
    description: extractFirstParagraph(pageData?.content ?? []),
  })
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params

  const pageData = await sanityClient.fetch<Page | null>(`*[_type == "page" && slug.current == $slug][0]`, {
    slug,
  })

  if (!pageData) {
    notFound()
  }

  const headerImage = pageData.headerImage?.asset
    ? urlFor(pageData.headerImage.asset).width(1000).url()
    : null

  return (
    <SectionContainer size="medium" className="px-8 md:px-0">
      {headerImage && (
        <Image
          src={headerImage}
          alt={pageData.title!}
          width={1000}
          height={500}
          withContainer={false}
          className="mb-8 h-auto w-full rounded-xl shadow-xl"
        />
      )}

      <Heading level={1} className="mb-4">
        {pageData.title}
      </Heading>
      {pageData.publishedAt && (
        <Typography variant="large" className="text-slate-500">
          {formatDateTime(pageData.publishedAt, "d MMMM, yyyy")}
        </Typography>
      )}

      <hr className="my-8" />

      <div className="prose prose-lg max-w-none">
        <PortableText value={pageData.content!} components={createPortableTextComponents()} />
      </div>
    </SectionContainer>
  )
}

export async function generateStaticParams() {
  const pages = await sanityClient.fetch<Array<{ slug: { current: string } }>>(`*[_type == "page"]{slug}`)

  return pages.map((page) => ({
    slug: page.slug.current,
  }))
}
