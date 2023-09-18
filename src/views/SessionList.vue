<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, ref } from 'vue'
import type { CityType, SessionOrEventType } from '@/i18n/events'
import { events } from '@/i18n/events'
import FilterPill from '@/components/FilterPill.vue'

const activeCategoryFilters = ref([] as Array<SessionOrEventType>)
const activeCityFilters = ref([] as Array<CityType>)

const categoriesFilter = events.map(e => e.category).filter((value, index, self) => {
  return self.indexOf(value) === index
}) as Array<SessionOrEventType>
const cityFilter = events.map(e => e.location.city).filter((value, index, self) => {
  return self.indexOf(value) === index
}) as Array<CityType>

const handleClickCatFilters = (filter: SessionOrEventType) => {
  if (!activeCategoryFilters.value.includes(filter))
    activeCategoryFilters.value.push(filter)
  else
    activeCategoryFilters.value = activeCategoryFilters.value.filter(e => e !== filter)

  console.log(activeCategoryFilters.value)
}
const handleClickCytFilters = (filter: CityType) => {
  if (!activeCityFilters.value.includes(filter))
    activeCityFilters.value.push(filter)
  else
    activeCityFilters.value = activeCityFilters.value.filter(e => e !== filter)

  console.log(activeCityFilters.value)
}

const filteredEvents = computed(() => {
  return events.filter((event) => {
    const categoryMatch = activeCategoryFilters.value.length === 0 || activeCategoryFilters.value.includes(event.category)
    const cityMatch = activeCityFilters.value.length === 0 || activeCityFilters.value.includes(event.location.city)
    return categoryMatch && cityMatch
  })
})
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full">
    <h1
      class="head-3 mb-4 py-8 text-center"
      data-test="events-header"
    >
      {{ $t(`navbar.sessions`) }}
    </h1>

    <div class="mb-8 flex flex-col items-center">
      <h3 class="mb-2">
        Categories:
      </h3>
      <ul class="flex gap-2">
        <FilterPill v-for="(cat) in categoriesFilter" :key="cat" :text="cat" :is-active="activeCategoryFilters.includes(cat)" @click="handleClickCatFilters(cat)" />
      </ul>
    </div>
    <div class="mb-8 flex flex-col items-center">
      <h3 class="mb-2">
        Cities:
      </h3>
      <ul class="flex gap-2">
        <FilterPill v-for="(cyt) in cityFilter" :key="cyt" :text="cyt" :is-active="activeCityFilters.includes(cyt)" @click="handleClickCytFilters(cyt)" />
      </ul>
    </div>

    <div v-if="filteredEvents.length > 0" class="flex flex-col items-center">
      <div v-for="event in filteredEvents" :key="event.title">
        {{ event.title }} -- {{ event.category }} -- {{ event.location.city }}
      </div>
    </div>
    <div v-else>
      Nessun evento trovato
    </div>
  </main>
</template>

<style scoped>

</style>
