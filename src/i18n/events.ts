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

export interface Event {
  arguments: string
  category: Category
  community_sponsors?: Sponsor[]
  ctas?: CtaType[]
  description: string
  id: number
  shortDescription: string
  speakers: string
  sponsors?: Sponsor[]
  subtitle?: string
  ticketHref?: string
  title: string
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
    ticketHref: 'https://www.wikipedia.org/',
  },
  {
    id: 2,
    category: 'event',
    title: 'Open Source Day 2023 - Firenze',
    subtitle: 'open-source-day-2023-florence',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik',
    description: 'Stiamo per tornare con una nuova edizione dell\'Open Source Day. In questa stagione distruggeremo tutto. Unisciti a noi il 24 marzo 2023!',
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
    ticketHref: '#',
  },
  {
    id: 3,
    category: 'event',
    title: 'Open Source Day 2021',
    subtitle: 'open-source-day-2021-florence-student-hotel',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik',
    description: 'L\'evento FOSS Explorer digitale dedicato all\'open source si espande e diventa un evento fisico! Speaker & Sviluppatori, stay tuned!',
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
    ticketHref: '#',
  },
  {
    id: 4,
    category: 'event',
    title: 'Typing Day 2021 - Florence',
    subtitle: 'typing-day-florence-2021-student-hotel',
    shortDescription: 'A new session with Miško Hevery, creator of Angular, co-creator of KarmaJS and creator of Qwik',
    description: 'Il Typing Day è un evento open source che permette a chiunque di intraprendere la carriera da speaker. È inoltre una competizione "Type Racer" che mette in palio una tastiera Keychron',
    image: {
      url: 'https://images.unsplash.com/photo-1555532538-dcdbd01d373d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1131&q=80',
      alt: 'this image is a placeholder',
    },
    date: {
      day: '2021-10-23',
      start: '16:00',
      end: '18:00',
    },
    location: {
      name: 'The Student Hotel, Firenze',
      city: 'Firenze',
      url: 'https://www.google.es/maps/place/The+Student+Hotel+Florence+Lavagnini/@43.7822111,11.251005,17z/data=!3m1!4b1!4m8!3m7!1s0x132a541e08073c43:0x67b49ce676d42454!5m2!4m1!1i2!8m2!3d43.7821888!4d11.2532025',
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
    ticketHref: '#',
  },
  // {
  //   id: 5,
  //   category: 'workshop',
  //   title: 'pluto',
  //   subtitle: 'sub-pluto',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
  //   image: {
  //     url: 'https://picsum.photos/200/300',
  //     alt: 'this image is a placeholder',
  //   },
  //   date: {
  //     day: '2021-09-23',
  //     starts_at: '11:00',
  //     ends_at: '14:00',
  //   },
  //   location: {
  //     name: 'Lampredotteria fierissima',
  //     city: 'Firenze',
  //     url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
  //   },
  //   speakers: 'caressa & bergomi',
  //   arguments: 'frontend',
  //   community_sponsors: [],
  //   ctas: [],
  //   ticketHref: '#',
  // },
  // {
  //   id: 6,
  //   category: 'workshop',
  //   title: 'paperino',
  //   subtitle: 'sub-paperino',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
  //   image: {
  //     url: 'https://picsum.photos/200/300',
  //     alt: 'this image is a placeholder',
  //   },
  //   date: {
  //     day: '2021-09-24',
  //     starts_at: '19:00',
  //     ends_at: '23:00',
  //   },
  //   location: {
  //     name: 'Spritzzeria',
  //     city: 'Verona',
  //     url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
  //   },
  //   speakers: 'schelotto & di natale',
  //   arguments: 'backend',
  //   community_sponsors: [],
  //   ctas: [],
  //   ticketHref: '#',
  // },
  // {
  //   id: 7,
  //   category: 'event',
  //   title: 'pippo',
  //   subtitle: 'sub-pippo',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
  //   image: {
  //     url: 'https://picsum.photos/200/300',
  //     alt: 'this image is a placeholder',
  //   },
  //   date: {
  //     day: '2021-09-21',
  //     starts_at: '18:00',
  //     ends_at: '21:00',
  //   },
  //   location: {
  //     name: 'Polenta e osei',
  //     city: 'Verona',
  //     url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
  //   },
  //   speakers: 'totti & cassano',
  //   arguments: 'devOPS',
  //   community_sponsors: [],
  //   ctas: [],
  //   ticketHref: '#',
  // },
  // {
  //   id: 8,
  //   category: 'workshop',
  //   title: 'pluto',
  //   subtitle: 'sub-pluto',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
  //   image: {
  //     url: 'https://picsum.photos/200/300',
  //     alt: 'this image is a placeholder',
  //   },
  //   date: {
  //     day: '2021-09-23',
  //     starts_at: '11:00',
  //     ends_at: '14:00',
  //   },
  //   location: {
  //     name: 'Ape amio',
  //     city: 'Milano',
  //     url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
  //   },
  //   speakers: 'caressa & bergomi',
  //   arguments: 'frontend',
  //   community_sponsors: [],
  //   ctas: [],
  //   ticketHref: '#',
  // },
  // {
  //   id: 9,
  //   category: 'workshop',
  //   title: 'paperino',
  //   subtitle: 'sub-paperino',
  //   description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi pretium tellus sed suscipit vulputate. Quisque diam sapien, pulvinar vel ante.',
  //   image: {
  //     url: 'https://picsum.photos/200/300',
  //     alt: 'this image is a placeholder',
  //   },
  //   date: {
  //     day: '2021-09-24',
  //     starts_at: '19:00',
  //     ends_at: '23:00',
  //   },
  //   location: {
  //     name: 'Via degli dei',
  //     city: 'Firenze',
  //     url: 'https://maps.app.goo.gl/AZuXT249ffyP6JzY9',
  //   },
  //   speakers: 'schelotto & di natale',
  //   arguments: 'backend',
  //   community_sponsors: [],
  //   ctas: [],
  //   ticketHref: '#',
  // },
]
