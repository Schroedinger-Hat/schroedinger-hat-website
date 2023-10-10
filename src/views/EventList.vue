<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CityType, SessionOrEventType, WeekType } from '@/i18n/events'
import { events } from '@/i18n/events'
import FilterPill from '@/components/FilterPill.vue'
import EventCardSm from '@/components/EventCardSm.vue'
import EventCardLg from '@/components/EventCardLg.vue'
import { getWeekState } from '@/functions/getWeekState'

const activeCategoryFilters = ref([] as Array<SessionOrEventType>)
const activeCityFilters = ref([] as Array<CityType>)
const activeWeekFilters = ref([] as Array<WeekType>)

const categoriesFilter = events.map(e => e.category).filter((value, index, self) => {
  return self.indexOf(value) === index
}) as SessionOrEventType[]
const cityFilter = events.map(e => e.location.city).filter((value, index, self) => {
  return self.indexOf(value) === index
}) as CityType[]
const weekFilter = events.map(e => getWeekState(e.date.day)).filter((value, index, self) => {
  return self.indexOf(value) === index
}) as WeekType[]

const handleClickCatFilters = (filter: SessionOrEventType) => {
  if (!activeCategoryFilters.value.includes(filter))
    activeCategoryFilters.value.push(filter)
  else
    activeCategoryFilters.value = activeCategoryFilters.value.filter(e => e !== filter)
}
const handleClickCytFilters = (filter: CityType) => {
  if (!activeCityFilters.value.includes(filter))
    activeCityFilters.value.push(filter)
  else
    activeCityFilters.value = activeCityFilters.value.filter(e => e !== filter)
}
const handleClickWeekFilters = (filter: WeekType) => {
  if (!activeWeekFilters.value.includes(filter))
    activeWeekFilters.value.push(filter)
  else
    activeWeekFilters.value = activeWeekFilters.value.filter(e => e !== filter)
}

// TODO: sort by start date
const filteredEvents = computed(() => {
  return events.filter((event) => {
    const categoryMatch = activeCategoryFilters.value.length === 0 || activeCategoryFilters.value.includes(event.category)
    const cityMatch = activeCityFilters.value.length === 0 || activeCityFilters.value.includes(event.location.city)
    const weekMatch = activeWeekFilters.value.length === 0 || activeWeekFilters.value.includes(getWeekState(event.date.day))
    return categoryMatch && cityMatch && weekMatch
  })
})

// TODO: decide logic of main card here (coming event?)
const firstEvent = computed(() => {
  return events[0]
})
</script>

<template>
  <main class="w-full px-24px md:px-16px py-32px">
    <!-- Title -->
    <h1
      class="head-3 mb-4 text-center"
      data-test="events-header"
    >
      {{ $t(`navbar.sessions`) }}
    </h1>

    <!-- Big Card -->
    <EventCardLg :event="firstEvent" class="mb-8" />

    <!-- Filter section -->
    <div class="grid grid-cols-1 gap-x-4 sm:grid-cols-2 md:grid-cols-3 md:gap-x-8 2xl:grid-cols-5 2xl:gap-x-16 mb-8 sm:mx-10%">
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
    <div v-else class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6 2xl:grid-cols-5 2xl:gap-8 sm:mx-10%">
      <EventCardSm v-for="event in filteredEvents" :key="event.id" :event="event" />
    </div>
  </main>
</template>

<style scoped>

</style>
