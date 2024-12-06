import Image from "next/image"

interface GradientCardProps {
  imageSrc: string
  imageAlt: string
  title: string
  description: string
  fromColor?: string
  toColor?: string
}

export default function GradientCard({ imageSrc, imageAlt, title, description }: GradientCardProps) {
  return (
    <div className="max-w-md rounded-2xl bg-white bg-gradient-to-r from-orange-200 to-orange-400 p-8 text-center shadow-lg">
      <div className="mb-4 flex justify-center">
        <Image src={imageSrc} alt={imageAlt} width={100} height={100} className="rounded-full" />
      </div>
      <h2 className="mb-2 text-xl font-semibold">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </div>
  )
}
