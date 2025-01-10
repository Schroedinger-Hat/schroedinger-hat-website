import { Image } from "@/components/atoms/media/Image"
import { Heading } from "@/components/atoms/typography/Heading"
import { Typography } from "@/components/atoms/typography/Typography"
import { type Metadata } from "next"
import { BlurredBackground } from "@/components/organisms/blurred-background"

// Images
import notFound from "@/images/logo_dead.png"
import { Link } from "@/components/atoms/links/Link"
import { Button } from "@/components/molecules/button"

export const metadata: Metadata = {
  title: "404 - Not Found",
  description: "The page you are looking for does not exist.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
}

export default function NotFound() {
  return (
    <div className="py-24 pb-48">
      <BlurredBackground
        points={3}
        colors={["#f75ccb", "#639aff", "#C81824", "#830B16"]}
        blur={100}
        opacity={0.3}
        size={300}
        positioning="center"
      />

      <div className="flex flex-col items-center justify-center">
        <Image src={notFound.src} alt="Not Found" width={256} height={256} className="mt-8" priority />
        <Heading level={1} className="mt-8">
          Not Found
        </Heading>
        <Typography variant="lead">The page you are looking for does not exist.</Typography>
        <Link href="/" className="mt-4">
          <Button>Back to Home?</Button>
        </Link>
      </div>
    </div>
  )
}
