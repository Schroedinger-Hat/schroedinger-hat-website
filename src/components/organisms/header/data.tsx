import { Calendar03Icon } from "hugeicons-react"
import { UserLove01Icon } from "hugeicons-react"

//* Participate Menu Data
export const participateMenuData = [
  {
    title: "Events",
    href: "/participate/events",
    description: "Discover upcoming events and opportunities to connect.",
    icon: <Calendar03Icon className="h-20 w-20 opacity-70" />,
  },
  {
    title: "Projects",
    href: "/participate/projects",
    description: "Collaborate on impactful open-source projects.",
  },
  {
    title: "Local Communities",
    href: "/participate/local-communities",
    description: "Connect with thriving local tech communities near you.",
  },
  {
    title: "Discord",
    href: "https://discord.gg/eK7bDYrnnR",
    description: "Be part of the conversation on our Discord server.",
  },
]

//* Contribute Menu Data
export const contributeMenuData = [
  {
    title: "As Individual",
    href: "/contribute/as-individual",
    description: "Find meaningful ways to contribute as an individual.",
    icon: <UserLove01Icon className="h-20 w-20 opacity-70" />,
  },
  {
    title: "As Speaker",
    href: "/contribute/as-speaker",
    description: "Share your expertise by speaking on our stage.",
  },
  {
    title: "As Sponsor",
    href: "/contribute/as-sponsor",
    description: "Support our initiatives through financial contributions.",
  },
  {
    title: "As Partner",
    href: "/contribute/as-partner",
    description: "Collaborate with us to strengthen and grow our community.",
  },
]

//* Association Menu Data
export const associationMenuData: {
  title: string
  href: string
  description: string
}[] = [
  {
    title: "About Us",
    href: "/association/about-us",
    description: "Learn more about our mission and community.",
  },
  {
    title: "Activate a Membership",
    href: "/association/join",
    description: "Support our mission by becoming a Schroedinger member.",
  },
  {
    title: "Newsletter",
    href: "/association/newsletter",
    description: "Subscribe to our newsletter and stay up to date.",
  },
  {
    title: "Statute",
    href: "/page/statute",
    description: "",
  },
  {
    title: "Administrative Data",
    href: "/page/administrative-data",
    description: "",
  },
  {
    title: "Press Kit",
    href: "/association/press-kit",
    description: "",
  },
  {
    title: "Blog",
    href: "/blog",
    description: "",
  },
]
