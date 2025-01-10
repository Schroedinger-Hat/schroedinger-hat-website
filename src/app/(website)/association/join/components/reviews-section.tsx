"use client"

import { useEffect, useState } from "react"
import { Heading } from "@/components/atoms/typography/Heading"
import { Typography } from "@/components/atoms/typography/Typography"
import ReviewCard from "@/components/organisms/review-card"
import type { Review } from "../types"
import reviews from "../reviews.json"
import { SectionContainer } from "@/components/atoms/layout/SectionContainer"

function getRandomReviews(reviews: Review[], count: number) {
  const shuffled = [...reviews]
  const reviewCount = Math.min(count, reviews.length)

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = shuffled[i]!
    shuffled[i] = shuffled[j]!
    shuffled[j] = temp
  }

  return shuffled.slice(0, reviewCount)
}

export function ReviewsSection() {
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([])

  useEffect(() => {
    setSelectedReviews(getRandomReviews(reviews, 12))
  }, [])

  return (
    <SectionContainer size="wide">
      <div className="mb-12 md:text-center">
        <Heading level={2}>What people say about it</Heading>
        <Typography variant="medium">
          Truth be told, we don&apos;t have many reviews yet.
          <br />
          And your nonprofit membership is not something that you talk about everyday or review on Google.
          <br />
          So we asked ChatGTP to imagine what people would say about it.
        </Typography>
      </div>

      <div className="w-full overflow-hidden">
        <div className="reviews-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:px-4 [&::-webkit-scrollbar]:hidden">
          {selectedReviews.map((review) => (
            <div
              key={review.name}
              className="flex-none snap-center first:pl-4 last:pr-4 md:first:pl-0 md:last:pr-0"
            >
              <ReviewCard name={review.name} rating={5} description={review.review} />
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
