import OSDay2023 from '@/i18n/events/event/osday-23.json'
import OSDay2021 from '@/i18n/events/event/osday-21.json'
import Qwik0623 from '@/i18n/events/session/qwik-06-23.json'

interface Detail {
  id: string
  text: string
}

export interface EventData {
  arguments: string
  category: string
  community_sponsors: any[]
  description: string
  featured: boolean
  id: string | number
  overline?: string
  shortDescription: string
  speakers: string
  subtitle: string
  title: string
  ctas: {
    id: string
    href: string | null
  }[]
  ticketsURL: string
  details: Detail[]
  image: {
    url: string
    alt: string
  }
  date: {
    // TODO: Add UTC object for date
    day: string
    start: string
    end: string
  }
  location: {
    name: string
    city: string
    url: string
  }
}

interface EventJSON {
  en: EventData
  it: EventData
}

const groupEventByLanguage = () => {
  const events: EventJSON[] = [OSDay2023, OSDay2021, Qwik0623]

  const group = events.reduce(
    (acc, ev) => {
      acc.en.push(ev.en)
      acc.it.push(ev.it)
      return acc
    },
    { en: [] as EventData[], it: [] as EventData[] },
  )

  return group
}

export const events = groupEventByLanguage()
