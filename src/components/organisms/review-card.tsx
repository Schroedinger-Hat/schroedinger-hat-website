import { Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Typography } from "../atoms/typography/Typography"

interface ReviewCardProps {
  name: string
  rating: number
  description: string
}

export default function ReviewCard(
  { name, rating, description }: ReviewCardProps = {
    name: "",
    rating: 5,
    description: "",
  },
) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <Card className="w-[300px]">
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
      </CardHeader>
      <CardContent>
        <Typography variant="medium">{description}</Typography>
      </CardContent>
    </Card>
  )
}
