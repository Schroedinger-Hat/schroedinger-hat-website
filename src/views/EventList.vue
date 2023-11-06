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
import EventForm from '@/components/EventForm.vue'

const { t, locale } = useI18n()
const events = computed(() => messages[locale.value as LanguageCodes].events)

const filters = ref({
  category: undefined,
  city: undefined,
  date: undefined,
})

const calculateDate = (dateFilter: number, date: string) => {
  return Number(date.split('-')[1]) === dateFilter
}

const featuredEvent = computed(() => events.value.find(event => event.featured))
const notFeaturedEvents = computed(() => events.value.filter((event) => {
  const categoryCondition = !filters.value.category || event.category === filters.value.category
  const cityCondition = !filters.value.city || event.location.city === filters.value.city
  const dateCondition = !filters.value.date || calculateDate(filters.value.date, event.date.day)
  return categoryCondition && cityCondition && dateCondition && !event.featured
}))

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
    <EventForm
      v-model:model-category="filters.category"
      v-model:model-city="filters.city"
      v-model:model-date="filters.date"
      :events="events"
    />
    <div v-if="notFeaturedEvents.length" class="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 md:gap-6 2xl:gap-8">
      <EventCard v-for="event in notFeaturedEvents" :key="event.id" :event="event">
        <IconDetail v-for="{ id, text } in event.details" :id="id" :key="id" :text="text" />
        <template #footer>
          <CtaComponent tertiary :href="event.ticketsURL">Get tickets</CtaComponent>
        </template>
      </EventCard>
    </div>
    <div v-else class="head-6 pt-4 text-center">No events yet, want to organize one?</div>
  </main>
</template>
