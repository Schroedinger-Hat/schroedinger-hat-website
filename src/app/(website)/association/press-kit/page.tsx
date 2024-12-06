import { SectionContainer } from "@/components/atoms/layout/SectionContainer"
import { Image } from "@/components/atoms/media/Image"
import { Heading } from "@/components/atoms/typography/Heading"
import { Typography } from "@/components/atoms/typography/Typography"
import { Linkedin01Icon, NewTwitterIcon, YoutubeIcon } from "hugeicons-react"
import { constructMetadata } from "@/lib/utils/metadata"
import type { FC, SVGProps } from "react"

// Images
type LogoType = FC<SVGProps<SVGElement>> & { src: string }

import logoBackground from "@/images/press-kit/logo - background - rounded - flat background.svg"
import logoBackgroundPng from "@/images/press-kit/logo - background - rounded - flat background.png"
import logoBlack from "@/images/press-kit/logo - no background - no padding.svg"
import logoBlackPng from "@/images/press-kit/logo - no background - no padding.png"
import logoWhite from "@/images/press-kit/logo white - no background - no padding.svg"
import logoWhitePng from "@/images/press-kit/logo white - no background - no padding.png"

export const metadata = constructMetadata({
  title: "Schrödinger Hat: Press Kit",
  description: "Download our brand assets, logos, and official press materials.",
})

export default function PressKitPage() {
  return (
    <main>
      <SectionContainer size="full" padding="header">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="flex flex-col items-center text-center">
            <div className="max-w-4xl">
              <h1 className="mb-8 font-lexend text-[100px] font-medium leading-none tracking-[-7px] text-slate-800">
                Press Kit
              </h1>
            </div>
            <div className="max-w-2xl">
              <h2 className="text-[22px] font-normal text-slate-800">
                So you have decided to tell a story about us?
                <br />
                Cool, we prepared some assets for you to use
              </h2>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <Heading level={2}>Logo</Heading>
        <div className="flex flex-col gap-8 lg:flex-row">
          <div className="flex-1">
            <div className="rounded-lg border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-lg p-4">
                <Image src={logoBackground} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">With Background</p>
                <br />
                <a href={(logoBackground as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoBackgroundPng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-lg border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-lg p-4">
                <Image src={logoBlack} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Black</p>
                <br />
                <a href={(logoBlack as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoBlackPng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-lg border border-gray-200 bg-slate-200 p-8">
              <div className="aspect-square w-full rounded-lg p-4">
                <Image src={logoWhite} alt="Logo" />
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">White</p>
                <br />
                <a href={(logoWhite as LogoType).src} download>
                  <Typography as="span" variant="small">
                    Download SVG
                  </Typography>
                </a>
                {" | "}
                <a href={logoWhitePng.src} download>
                  <Typography as="span" variant="small">
                    Download PNG
                  </Typography>
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>
      <SectionContainer withBackground>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={2}>Colors</Heading>
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-[#EE0000]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Primary Red
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #EE0000
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-[#000000]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Primary Black
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #000000
                  </Typography>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-lg bg-[#FFFFFF]"></div>
                <div>
                  <Typography variant="medium" className="font-medium">
                    Primary White
                  </Typography>
                  <Typography variant="small" className="text-gray-600">
                    #FFFFFF
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <Heading level={2}>Typography</Heading>
            <div className="mt-8 space-y-8">
              <div>
                <Typography variant="muted" className="mb-0">
                  Headings
                </Typography>
                <Typography as="span" className="mt-0 font-lexend text-2xl">
                  Lexend
                </Typography>
              </div>

              <div>
                <Typography variant="muted" className="mb-0">
                  Body
                </Typography>
                <Typography as="span" className="font-inter mt-0 text-2xl">
                  Inter
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={2}>What we do, in a nutshell</Heading>
            <Typography variant="blockquote">
              Schrödinger&apos;s Hat is a nonprofit collective dedicated to fostering innovation, inclusivity,
              and collaboration in the tech world. Rooted in the principles of open-source, we empower
              individuals and communities by making knowledge and resources universally accessible.
            </Typography>
          </div>
          <div className="flex-1">
            <Heading level={2}>What we do, in detail</Heading>
            <Typography variant="blockquote">
              &quot;Schrödinger&apos;s Hat is a nonprofit organization and a thriving collective of
              developers, innovators, and community leaders driven by a shared vision: to create an inclusive,
              sustainable, and open-source-driven tech ecosystem.
              <br />
              <br />
              Founded with the belief that collaboration and shared knowledge are the keys to meaningful
              innovation, we go beyond software. We empower individuals and communities by making resources,
              knowledge, and opportunities universally accessible.
              <br />
              <br />
              At the heart of our mission lies Open Source Day, our flagship international event that gathers
              thousands of participants and thought leaders to inspire, engage, and innovate. Complementing
              this are our workshops, meetups, and community-driven projects that offer hands-on learning,
              networking opportunities, and a platform to discuss and shape the future of technology.
            </Typography>
          </div>
        </div>
      </SectionContainer>

      <SectionContainer withBackground>
        <div className="flex flex-col gap-16 lg:flex-row">
          <div className="flex-1">
            <Heading level={2}>Contact</Heading>
            <Typography>
              For any press inquiries, please contact us at{" "}
              <a href="mailto:event@schroedingershat.com">event@schroedingershat.com</a>
            </Typography>
          </div>
          <div className="flex-1">
            <Heading level={2}>Socials</Heading>
            <Typography>
              <div className="space-y-4">
                <a
                  href="https://www.linkedin.com/company/schroedingershat/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Typography className="flex items-center gap-2" variant="large">
                    <Linkedin01Icon className="h-6 w-6" />
                    LinkedIn
                  </Typography>
                </a>
                <a
                  href="https://twitter.com/schroedingershat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Typography className="flex items-center gap-2" variant="large">
                    <NewTwitterIcon className="h-6 w-6" />X
                  </Typography>
                </a>
                <a
                  href="https://x.com/schroedingershat"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Typography className="flex items-center gap-2" variant="large">
                    <YoutubeIcon className="h-6 w-6" />
                    YouTube
                  </Typography>
                </a>
              </div>
            </Typography>
          </div>
        </div>
      </SectionContainer>
    </main>
  )
}
