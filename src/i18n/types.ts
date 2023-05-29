export type MessageType = {
  [key in LanguageCodes]: MessageContent
}

interface MessageContent {
  message: {
    common: {
      [key in CommonMessage]: string
    }
  }
  navbar: {
    team: string
    events: string
    codeOfConduct: string
  }
  main: {
    h1: string
    h2: string
    links: {
      youtube: string
      spotify: string
      openCollective: string
    }
  }
  contributing: {
    [key in ContributionMessage]: string
  }
  pages: {
    [key in PagesMessage]: string
  }
  redirect: {
    profile: string
  }
  team: TeamMessage
  events: EventMessage
}

interface TeamMessage {
  [key: TeamMemberName]: TeamMemberInfo
}

interface TeamMemberInfo {
  description: string
  github: string
  github_url: string
  image: string
  linkedin_url: string
  name: string
  permalink: string
  secondary_image: string
  twitter_url: string
  website: string
}

type EventMessage = {
  [key in EventMessageName]: EventInfo
}

interface EventInfo {
  'community-sponsors': string
  'location-link': string
  'signup-link': string
  cfp: string
  date: string
  description: string
  donation: string
  image: string
  location: string
  permalink: string
  sponsors: string
  subtitle: string
  title: string
  'conference-website': string

}

type LanguageCodes = 'it' | 'en'

type CommonMessage =
  'read-more' |
  'go-to-event' |
  'go-to-donation' |
  'go-to-cfp' |
  'go-to-conference-website'

type ContributionMessage =
  'cta' |
  'is-a-project' |
  'title'

type PagesMessage = 'code-of-conduct'

type TeamMemberName = string

export type EventMessageName =
  'open-source-day-2023-florence' |
  'open-source-day-2021-florence-student-hotel' |
  'typing-day-florence-2021-student-hotel'

export interface Project {
  name: string
  gitUrl: string
  redditUrl: string
  discordUrl: string
  description: string
  category: string
  tags: string[]
  owners: {
    name: string
    surname: string
    avatar: string
  }[]
}
