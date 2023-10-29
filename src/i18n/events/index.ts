import OSDay2023 from '@/i18n/events/event/osday-23.json'
import OSDay2021 from '@/i18n/events/event/osday-21.json'
import Qwik0623 from '@/i18n/events/session/qwik-06-23.json'

interface EventData {
  id: string | number
  category: string
  title: string
  subtitle: string
  shortDescription: string
  description: string
  details: {
    id: string
    text: string
  }[]
  image: {
    url: string
    alt: string
  }
  date: {
    day: string
    start: string
    end: string
  }
  location: {
    name: string
    city: string
    url: string
  }
  speakers: string
  arguments: string
  community_sponsors: any[]
  ctas: {
    id: string
    href: string | null
  }[]
  ticketsURL: string
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
