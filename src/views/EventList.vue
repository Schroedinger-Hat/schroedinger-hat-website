<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import messages from '@/i18n/messages'
import type { EventMessageName } from '@/i18n/types'
import type { Category, City, TimeStatus } from '@/i18n/events'
import { events } from '@/i18n/events'
import FilterPill from '@/components/FilterPill.vue'
import EventCardSm from '@/components/EventCardSm.vue'
import EventCard from '@/components/EventCard.vue'
import { getWeekState } from '@/functions/getWeekState'

const { t } = useI18n()
const eventsMessages = Object.keys(messages.it.events) as EventMessageName[]

useHead({
  title: t('head.events.title'),
  meta: [{ name: t('head.events.meta.name'), content: t('head.events.meta.content') }],
})

const activeCategoryFilters = ref([] as Array<Category>)
const activeCityFilters = ref([] as Array<City>)
const activeWeekFilters = ref([] as Array<TimeStatus>)

// const categoriesFilter = eventsMessages.map(e => e.category).filter((value, index, self) => {
//   return self.indexOf(value) === index
// }) as SessionOrEventType[]
// const cityFilter = eventsMessages.map(e => e.location.city).filter((value, index, self) => {
//   return self.indexOf(value) === index
// }) as CityType[]
// const weekFilter = eventsMessages.map(e => getWeekState(e.date.day)).filter((value, index, self) => {
//   return self.indexOf(value) === index
// }) as WeekType[]

const handleClickCatFilters = (filter: Category) => {
  if (!activeCategoryFilters.value.includes(filter))
    activeCategoryFilters.value.push(filter)
  else
    activeCategoryFilters.value = activeCategoryFilters.value.filter(e => e !== filter)
}
const handleClickCytFilters = (filter: City) => {
  if (!activeCityFilters.value.includes(filter))
    activeCityFilters.value.push(filter)
  else
    activeCityFilters.value = activeCityFilters.value.filter(e => e !== filter)
}
const handleClickWeekFilters = (filter: TimeStatus) => {
  if (!activeWeekFilters.value.includes(filter))
    activeWeekFilters.value.push(filter)
  else
    activeWeekFilters.value = activeWeekFilters.value.filter(e => e !== filter)
}

const filteredEvents = computed(() => {
  return events.filter((event) => {
    const categoryMatch = activeCategoryFilters.value.length === 0 || activeCategoryFilters.value.includes(event.category)
    const cityMatch = activeCityFilters.value.length === 0 || activeCityFilters.value.includes(event.location.city)
    const weekMatch = activeWeekFilters.value.length === 0 || activeWeekFilters.value.includes(getWeekState(event.date.day))
    return categoryMatch && cityMatch && weekMatch
  })
})

const firstEvent = computed(() => {
  return events[0]
})
</script>

<template>
  <main class="w-full p-8 max-w-7xl mx-auto">
    <h1 class="head-3 mb-4 text-center" data-test="events-header">
      {{ $t(`navbar.sessions`) }}
    </h1>
    <EventCard :event="firstEvent" featured class="mb-8" />
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-8 lg:gap-x-16 mb-8">
      <div class="mb-4 flex flex-col">
        <h3 class="mb-2">
          Event type
        </h3>
        <ul class="flex flex-wrap gap-2">
          <FilterPill v-for="(cat) in categoriesFilter" :key="cat" :text="cat" :is-active="activeCategoryFilters.includes(cat)" @click="handleClickCatFilters(cat)" />
        </ul>
      </div>
      <div class="mb-4 flex flex-col">
        <h3 class="mb-2">
          Where
        </h3>
        <ul class="flex flex-wrap gap-2">
          <FilterPill v-for="(cyt) in cityFilter" :key="cyt" :text="cyt" :is-active="activeCityFilters.includes(cyt)" @click="handleClickCytFilters(cyt)" />
        </ul>
      </div>
      <div class="mb-4 flex flex-col">
        <h3 class="mb-2">
          When
        </h3>
        <!-- TODO: time-filter -->
        <ul class="flex flex-wrap gap-2">
          <FilterPill v-for="(week) in weekFilter" :key="week" :text="week ? week : ''" :is-active="activeWeekFilters.includes(week)" @click="handleClickWeekFilters(week)" />
        </ul>
      </div>
    </div>

    <!-- Session cards -->
    <div v-if="filteredEvents.length === 0" class="flex flex-col items-center">
      Nessun elemento trovato
    </div>
    <div v-else class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 md:gap-6 2xl:gap-8">
      <EventCardSm v-for="event in filteredEvents" :key="event.id" :event="event" />
    </div>
  </main>
</template>
