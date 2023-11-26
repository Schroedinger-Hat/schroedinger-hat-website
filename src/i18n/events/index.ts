import OSDay2021 from '@/i18n/events/event/osday-21.json'
import OSDay2023 from '@/i18n/events/event/osday-23.json'
import OSDay2024 from '@/i18n/events/event/osday-24.json'
import Qwik0623 from '@/i18n/events/session/qwik-06-23.json'
import Rust2023 from '@/i18n/events/session/rust-11-23.json'
import Verona123 from '@/i18n/events/session/verona1-23.json'
import Verona223 from '@/i18n/events/session/verona2-23.json'
import Milan123 from '@/i18n/events/session/milan1-23.json'
import Milan223 from '@/i18n/events/session/milan2-23.json'
import Verona323 from '@/i18n/events/session/verona3-23.json'
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
  date: string
  start: string
  end: string
}

interface Image {
  alt: string
  URL: string | null
}

export interface Event {
  id: string
  category: string
  featured: boolean
  headline: string | null
  ticketsURL: string | null
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

const eventsJSON: EventJSON[] = [
  OSDay2021,
  OSDay2023,
  OSDay2024,
  Qwik0623,
  Rust2023,
  Verona123,
  Verona223,
  Verona323,
  Milan123,
  Milan223,
]

export const messages = {
  data: groupByLanguage(eventsJSON),
  copy: Page,
}
