<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import type { EventData } from '@/i18n/events/index'
import messages from '@/i18n/messages'
import type { LanguageCodes } from '@/i18n/types'
import IconDetail from '@/components/IconDetail.vue'
import EventCard from '@/components/EventCard.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'

const { t, locale } = useI18n()
const events = computed(() => messages[locale.value as LanguageCodes].events)

const featuredEvent = computed(() => events.value.find(event => event.featured))
const notFeaturedEvents = computed(() => events.value.filter(event => !event.featured))

const filters = ref({
  category: undefined,
  city: undefined,
  date: undefined,
})

const options = ref({
  categories: computed(() => new Set(events.value.map(event => event.category))),
  cities: computed(() => new Set(events.value.map(event => event.location.city))),
  dates: computed(() => new Set(events.value.map(event => event.date.day))),
})

useHead({
  title: t('head.events.title'),
  meta: [{ name: t('head.events.meta.name'), content: t('head.events.meta.content') }],
})
</script>

<template>
  <main class="w-full p-8 max-w-7xl mx-auto">
    <h1 class="head-3 mb-4 text-center" data-test="events-header">
      {{ $t(`navbar.events`) }}
    </h1>
    <EventCard v-if="featuredEvent" :event="featuredEvent as EventData" featured class="mb-8">
      <IconDetail v-for="{ id, text } in featuredEvent.details" :id="id" :key="id" :text="text" />
      <template #footer>
        <CtaComponent tertiary :href="featuredEvent.ticketsURL">Get tickets</CtaComponent>
      </template>
    </EventCard>
    <form class="flex justify-evenly items-center mb-8">
      <div>
        <label for="cities" class="block">Location</label>
        <select id="cities" v-model="filters.city" name="Cities" class="p-1 bg-dark-bg-secondary rounded-lg">
          <option disabled value="">Please select one...</option>
          <option v-for="city in options.cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>
      <div>
        <label for="categories" class="block">Category</label>
        <select id="categories" v-model="filters.category" name="Categories" class="capitalize p-1 bg-dark-bg-secondary">
          <option disabled value="">Please select one...</option>
          <option v-for="category in options.categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>
      <div>
        <label for="dates" class="block">Dates</label>
        <select id="dates" v-model="filters.date" name="Dates" class="p-1 bg-dark-bg-secondary">
          <option disabled value="">Please select one...</option>
          <option v-for="date in options.dates" :key="date" :value="date">
            {{ date }}
          </option>
        </select>
      </div>
    </form>
    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6 2xl:gap-8">
      <EventCard v-for="event in notFeaturedEvents" :key="event.id" :event="event">
        <IconDetail v-for="{ id, text } in event.details" :id="id" :key="id" :text="text" />
        <template #footer>
          <CtaComponent tertiary :href="event.ticketsURL">Get tickets</CtaComponent>
        </template>
      </EventCard>
    </div>
  </main>
</template>
