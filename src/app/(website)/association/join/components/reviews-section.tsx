"use client";

import { useEffect, useState } from "react";
import { Heading } from "@/components/atoms/typography/Heading";
import { Typography } from "@/components/atoms/typography/Typography";
import ReviewCard from "@/components/organisms/review-card";
import type { Review } from "../types";
import reviews from "../reviews.json";

function getRandomReviews(reviews: Review[], count: number) {
  return [...reviews].sort(() => 0.5 - Math.random()).slice(0, count);
}

export function ReviewsSection() {
  const [selectedReviews, setSelectedReviews] = useState<Review[]>([]);

  useEffect(() => {
    setSelectedReviews(getRandomReviews(reviews, 12));
  }, []);

  return (
    <div className="container mx-auto max-w-7xl py-16">
      <div className="mb-12 text-center">
        <Heading level={2}>What people say about it</Heading>
        <Typography variant="medium">
          Truth be told, we don't have many reviews yet.
          <br />
          And your nonprofit membership is not something that you talk about
          everyday or review on Google.
          <br />
          So we asked ChatGTP to imagine what people would say about it.
        </Typography>
      </div>
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen">
        <div className="reviews-scroll flex snap-x snap-mandatory gap-2 overflow-x-auto px-16 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {selectedReviews.map((review) => (
            <div key={review.name} className="flex-none snap-center">
              <ReviewCard
                name={review.name}
                rating={5}
                description={review.review}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
