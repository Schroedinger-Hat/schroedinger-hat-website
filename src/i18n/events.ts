export type SessionOrEventType = 'workshop' | 'event' // session page filter
export type CityType = 'Firenze' | 'Milano' | 'Verona' // session page filter
export type WeekType = 'passed' | 'thisWeek' | 'coming' | undefined // session page filter
type CtaIdType = 'cfp' | 'donation' | 'sign-up' | 'video' | 'website'

interface SponsorType {
  name: string
  image: {
    url: string
    alt: string
  }
  link: string
}

interface CtaType {
  id: CtaIdType
  href: string
}

export default interface EventType {
  id: number
  category: SessionOrEventType
  title: string
  subtitle?: string
  description: string
  image: {
    url: string
    alt: string
  }
  date: {
    day: string
    starts_at: string
    ends_at: string
  }
  location: {
    name: string
    city: CityType
    url: string
  }
  speakers: string
  arguments: string
  sponsors?: SponsorType[]
  community_sponsors?: SponsorType[]
  ctas?: CtaType[]
  ticketHref?: string
}

// NOTE: id for the key(s) would be: title + start_date
export const events: EventType[] = [
  {
    id: 1,
    category: 'event',
    title: 'pippo',
    subtitle: 'sub-pippo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-08-21',
      starts_at: '18:00',
      ends_at: '21:00',
    },
    location: {
      name: 'Nana Bianca',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'totti & cassano',
    arguments: 'devOPS',
    community_sponsors: [],
    ctas: [],
    ticketHref: 'https://www.wikipedia.org/',
  },
  {
    id: 2,
    category: 'workshop',
    title: 'pluto',
    subtitle: 'sub-pluto',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-11-23',
      starts_at: '11:00',
      ends_at: '14:00',
    },
    location: {
      name: 'San Siro',
      city: 'Milano',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'caressa & bergomi',
    arguments: 'frontend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 3,
    category: 'workshop',
    title: 'paperino',
    subtitle: 'sub-paperino',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-24',
      starts_at: '19:00',
      ends_at: '23:00',
    },
    location: {
      name: 'Bacareto vecio',
      city: 'Verona',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'schelotto & di natale',
    arguments: 'backend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 4,
    category: 'event',
    title: 'pippo',
    subtitle: 'sub-pippo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-21',
      starts_at: '18:00',
      ends_at: '21:00',
    },
    location: {
      name: 'Duomo',
      city: 'Milano',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'totti & cassano',
    arguments: 'devOPS',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 5,
    category: 'workshop',
    title: 'pluto',
    subtitle: 'sub-pluto',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-23',
      starts_at: '11:00',
      ends_at: '14:00',
    },
    location: {
      name: 'Lampredotteria fierissima',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'caressa & bergomi',
    arguments: 'frontend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 6,
    category: 'workshop',
    title: 'paperino',
    subtitle: 'sub-paperino',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-24',
      starts_at: '19:00',
      ends_at: '23:00',
    },
    location: {
      name: 'Spritzzeria',
      city: 'Verona',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'schelotto & di natale',
    arguments: 'backend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 7,
    category: 'event',
    title: 'pippo',
    subtitle: 'sub-pippo',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-21',
      starts_at: '18:00',
      ends_at: '21:00',
    },
    location: {
      name: 'Polenta e osei',
      city: 'Verona',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'totti & cassano',
    arguments: 'devOPS',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 8,
    category: 'workshop',
    title: 'pluto',
    subtitle: 'sub-pluto',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-23',
      starts_at: '11:00',
      ends_at: '14:00',
    },
    location: {
      name: 'Ape amio',
      city: 'Milano',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'caressa & bergomi',
    arguments: 'frontend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
  {
    id: 9,
    category: 'workshop',
    title: 'paperino',
    subtitle: 'sub-paperino',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-24',
      starts_at: '19:00',
      ends_at: '23:00',
    },
    location: {
      name: 'Via degli dei',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: 'schelotto & di natale',
    arguments: 'backend',
    community_sponsors: [],
    ctas: [],
    ticketHref: '#',
  },
]
