<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { computed, reactive } from 'vue'
import type { EventData } from '@/i18n/events/index'
import messages from '@/i18n/messages'
import type { LanguageCodes } from '@/i18n/types'
import IconDetail from '@/components/IconDetail.vue'
import EventCard from '@/components/EventCard.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'

const { t, locale } = useI18n()

const filters = reactive({
  city: undefined,
  category: undefined,
  date: undefined,
})

const events = computed(() => messages[locale.value as LanguageCodes].events)
const featuredEvent = computed(() => events.value.find(event => event.featured))
const notFeaturedEvents = computed(() => events.value.filter(event => !event.featured))

const eventsCities = computed(() => events.value.map(event => event.location.city))
const eventsCategory = computed(() => events.value.map(event => event.category))
const eventDates = computed(() => events.value.map(event => event.date.day))

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
    <form>
      <label for="cities" class="block">Location</label>
      <select id="cities" v-model="filters.city" name="Cities" class="p-1 bg-dark-bg-secondary">
        <option disabled value="">Please select a city...</option>
        <option v-for="city in eventsCities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
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
