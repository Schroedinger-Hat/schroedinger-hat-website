import OSDay2021 from '@/i18n/events/event/osday-21.json'
import OSDay2023 from '@/i18n/events/event/osday-23.json'
import Qwik0623 from '@/i18n/events/session/qwik-06-23.json'
import Qwik0624 from '@/i18n/events/session/qwik-06-24.json'
import Page from '@/i18n/events/page.json'

interface Detail {
  id: string
  value: string
}

interface Description {
  short: string
  long: string
}

interface Location {
  city: string
  name: string
  URL: string
}

interface Schedule {
  day: string
  start: string
  end: string
}

interface Image {
  alt: string
  URL: string
}

export interface Event {
  id: string
  category: string
  featured: boolean
  headline: string
  ticketsURL: string
  title: string
  details: Detail[]
  description: Description
  image: Image
  location: Location
  schedule: Schedule
}

interface EventJSON {
  en: Event
  it: Event
}

interface LanguageItem<T> {
  en: T
  it: T
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

const eventsJSON: EventJSON[] = [OSDay2021, OSDay2023, Qwik0623, Qwik0624]

export const messages = {
  data: groupByLanguage(eventsJSON),
  copy: Page,
}
