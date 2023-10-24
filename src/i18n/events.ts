export type Category = 'workshop' | 'event'
export type TimeStatus = 'passed' | 'thisWeek' | 'coming' | undefined
export type CtaIdType = 'cfp' | 'donation' | 'sign-up' | 'video' | 'website'
export type City = string // Create special type based of messages (keyof typeof as const)

interface Sponsor {
  name: string
  link: string
  image: {
    url: string
    alt: string
  }
}

interface CtaType {
  id: CtaIdType
  href: string | null
}

interface Detail {
  id: string
  icon: string
  text: string
}

export interface Event {
  arguments: string
  overline?: string
  category: Category
  community_sponsors?: Sponsor[]
  ctas?: CtaType[]
  description: string
  id: number
  shortDescription: string
  speakers: string
  sponsors?: Sponsor[]
  subtitle?: string
  ticketsURL?: string
  title: string
  details: Detail[]
  date: {
    day: string
    start: string
    end: string
  }
  image: {
    url: string
    alt: string
  }
  location: {
    name: string
    city: string
    url: string
  }
}

export const events: Event[] = [
  {
    id: 1,
    category: 'event',
    title: 'SH Sessions: Qwik',
    subtitle: 'sh-sessions-qwik-workshop',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik.',
    description: 'We are starting the Schrodinger Session: a workshop series fully accessible for everyone, from everywhere with the best engineer from the open source world and organization\nThis year we decided to go big!\nIn this edition we are going to have a mid day with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik and Giorgio Boa, developer, public speaker and top contributor in Qwik!\nDuring the workshop you are going to do a demo, learn and ask questions directly to Miško and Giorgio.\nThe session will be free for everyone, in livestream and in english.',
    details: [
      { id: 'date', icon: 'i-carbon-calendar', text: '2023-06-14' },
      { id: 'speaker', icon: 'i-carbon-time', text: '9:30 - 21:00' },
      { id: 'speaker', icon: 'i-carbon-user-speaker', text: 'Miško Hevery' },
      { id: 'tag', icon: 'i-carbon-tag', text: 'Frontend Development' },
      { id: 'location', icon: 'i-carbon-location-filled', text: 'Nana bianca, Firenze' },
    ],
    image: {
      url: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F507565769%2F565692604981%2F1%2Foriginal.20230504-132216?w=940&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C0%2C2160%2C1080&s=e7d7490b59e1802ad3d53498f66ca59e',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2023-06-14',
      start: '09:30',
      end: '21:00',
    },
    location: {
      name: 'Nana Bianca, Firenze',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: '-',
    arguments: '-',
    community_sponsors: [],
    ctas: [
      {
        id: 'cfp',
        href: null,
      },
      {
        id: 'donation',
        href: 'https://opencollective.com/schrodinger-hat',
      },
      {
        id: 'sign-up',
        href: null,
      },
      {
        id: 'video',
        href: 'https://www.youtube.com/watch?v=_kN3QgaZkcs',
      },
      {
        id: 'website',
        href: null,
      },
    ],
    ticketsURL: 'https://www.wikipedia.org/',
  },
  {
    id: 2,
    category: 'event',
    title: 'Open Source Day 2023',
    subtitle: 'open-source-day-2023-florence',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik',
    description: 'Stiamo per tornare con una nuova edizione dell\'Open Source Day. In questa stagione distruggeremo tutto. Unisciti a noi il 24 marzo 2023!',
    details: [
      { id: 'date', icon: 'i-carbon-calendar', text: '2023-06-14' },
      { id: 'speaker', icon: 'i-carbon-time', text: '9:30 - 21:00' },
      { id: 'speaker', icon: 'i-carbon-user-speaker', text: 'Miško Hevery' },
      { id: 'tag', icon: 'i-carbon-tag', text: 'Frontend Development' },
      { id: 'location', icon: 'i-carbon-location-filled', text: 'Nana bianca, Firenze' },
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2023-03-24',
      start: '09:00',
      end: '18:00',
    },
    location: {
      name: 'Nana Bianca, Firenze',
      city: 'Firenze',
      url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
    },
    speakers: '-',
    arguments: '-',
    community_sponsors: [],
    ctas: [
      {
        id: 'cfp',
        href: null,
      },
      {
        id: 'donation',
        href: 'https://opencollective.com/schrodinger-hat',
      },
      {
        id: 'sign-up',
        href: null,
      },
      {
        id: 'video',
        href: 'https://www.youtube.com/watch?v=ijqCliQQvrY&list=PLdimn0ykJsMgr7XRkttwXuAjO1iLoCMmk',
      },
      {
        id: 'website',
        href: 'https://2023.osday.dev',
      },
    ],
    ticketsURL: '#',
  },
  {
    id: 3,
    category: 'event',
    title: 'Open Source Day 2021',
    subtitle: 'open-source-day-2021-florence-student-hotel',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik',
    description: 'L\'evento FOSS Explorer digitale dedicato all\'open source si espande e diventa un evento fisico! Speaker & Sviluppatori, stay tuned!',
    details: [
      { id: 'date', icon: 'i-carbon-calendar', text: '2023-06-14' },
      { id: 'speaker', icon: 'i-carbon-time', text: '9:30 - 21:00' },
      { id: 'speaker', icon: 'i-carbon-user-speaker', text: 'Miško Hevery' },
      { id: 'tag', icon: 'i-carbon-tag', text: 'Frontend Development' },
      { id: 'location', icon: 'i-carbon-location-filled', text: 'Nana bianca, Firenze' },
    ],
    image: {
      url: 'https://images.unsplash.com/photo-1489389944381-3471b5b30f04?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-09-21',
      start: '18:00',
      end: '21:00',
    },
    location: {
      name: 'The Student Hotel, Firenze',
      city: 'Firenze',
      url: 'https://goo.gl/maps/jEwB3GoBdF2ueNGY8',
    },
    speakers: '-',
    arguments: '-',
    community_sponsors: [],
    ctas: [
      {
        id: 'cfp',
        href: 'https://sessionize.com/open-source-day-2021-florence/',
      },
      {
        id: 'donation',
        href: 'https://opencollective.com/schrodinger-hat',
      },
      {
        id: 'sign-up',
        href: 'https://www.eventbrite.it/e/biglietti-open-source-day-2021-firenze-166034195749',
      },
      {
        id: 'video',
        href: 'https://www.youtube.com/watch?v=_kN3QgaZkcs',
      },
      {
        id: 'website',
        href: null,
      },
    ],
    ticketsURL: '#',
  },
]
