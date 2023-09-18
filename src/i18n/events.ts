export type SessionOrEventType = 'session' | 'event' // session page filter
export type CityType = 'Firenze' | 'Milano' | 'Verona' // session page filter
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
  category: SessionOrEventType
  title: string
  subtitle?: string
  description: string
  image: {
    url: string
    alt: string
  }
  start_date: string
  end_date: string
  location: {
    name: string
    city: CityType
    url: string
  }
  sponsors?: Array<SponsorType>
  community_sponsors?: Array<SponsorType>
  ctas?: Array<CtaType>
}

// NOTE: id for the key(s) would be: title + start_date
export const events: Array<EventType> = [
  {
    category: 'event',
    title: 'pippo',
    subtitle: 'sub-pippo',
    description: 'This is a pippo',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    start_date: '2021-09-21 18:00',
    end_date: '2021-09-21 21:00',
    location: {
      name: 'Nana Bianca',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    community_sponsors: [],
    ctas: [],
  },
  {
    category: 'session',
    title: 'pluto',
    subtitle: 'sub-pluto',
    description: 'This is a pluto',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    start_date: '2021-09-23 11:00',
    end_date: '2021-09-23 14:00',
    location: {
      name: 'Nana Bianca',
      city: 'Milano',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    community_sponsors: [],
    ctas: [],
  },
  {
    category: 'session',
    title: 'paperino',
    subtitle: 'sub-paperino',
    description: 'This is a paperino',
    image: {
      url: 'https://picsum.photos/200/300',
      alt: 'this image is a placeholder',
    },
    start_date: '2021-09-24 19:00',
    end_date: '2021-09-24 23:00',
    location: {
      name: 'Nana Bianca',
      city: 'Verona',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    community_sponsors: [],
    ctas: [],
  },
]
