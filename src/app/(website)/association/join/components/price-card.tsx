import { Check } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface PriceCardProps {
  price: number
  cta: React.ReactNode
  legalInfo: string
  benefits: string[]
}

export function PriceCard({ price, cta, legalInfo, benefits }: PriceCardProps) {
  return (
    <Card className="mx-auto w-full max-w-md overflow-hidden rounded-xl bg-gradient-to-br from-red-700 to-red-800 text-white shadow-xl">
      <CardHeader className="relative z-10 text-center"></CardHeader>
      <CardContent className="relative z-10 text-center">
        <div className="mb-2 text-6xl font-bold text-yellow-400">
          {price}€<span className="text-2xl font-normal text-white opacity-75">/year</span>
        </div>
        <ul className="mt-6 space-y-3 text-left">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="mr-2 mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-400" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="relative z-10 mt-8 flex flex-col">
        {cta}
        <p className="mt-4 w-full text-center text-xs text-white opacity-75">{legalInfo}</p>
      </CardFooter>
    </Card>
  )
}
