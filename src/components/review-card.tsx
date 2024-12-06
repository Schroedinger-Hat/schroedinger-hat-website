"use client"

import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

interface ReviewCardProps {
  name: string
  rating: number
  date: string
  description: string
}

export function ReviewCard(
  { name, rating, date, description }: ReviewCardProps = {
    name: "John Doe",
    rating: 4,
    date: "2023-11-15",
    description:
      "This product exceeded my expectations. The quality is outstanding, and it arrived earlier than expected. I highly recommend it to anyone looking for a reliable and efficient solution.",
  },
) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h3 className="text-lg font-semibold">{name}</h3>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>
        <span className="ml-auto text-sm text-muted-foreground">{date}</span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  )
}
