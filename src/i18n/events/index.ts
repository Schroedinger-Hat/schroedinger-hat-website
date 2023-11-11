import OSDay2023 from '@/i18n/events/event/osday-23.json'
import OSDay2021 from '@/i18n/events/event/osday-21.json'
import Qwik0623 from '@/i18n/events/session/qwik-06-23.json'
import Page from '@/i18n/events/page.json'

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

interface LanguageItem<P> {
  en: P
  it: P
}

const groupByLanguage = <T>(items: LanguageItem<T>[]) => {
  const group = items.reduce(
    (acc, item) => {
      acc.en.push(item.en)
      acc.it.push(item.it)
      return acc
    },
    { en: [] as T[], it: [] as T[] },
  )
  return group
}

const eventsJSON: EventJSON[] = [OSDay2021, OSDay2023, Qwik0623]

export const messages = {
  data: groupByLanguage(eventsJSON),
  copy: Page,
}
