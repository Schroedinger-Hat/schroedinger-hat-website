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
const events = computed(() => messages[locale.value as LanguageCodes].page.events.data)

const filters = ref({
  category: undefined,
  city: undefined,
  date: undefined,
})

const calculateDate = (dateFilter: number, date: string) => Number(date.split('/')[1]) === dateFilter

const featuredEvent = computed(() => events.value.find(event => event.featured))
const notFeaturedEvents = computed(() => {
  const filteredEvents = events.value.filter((event) => {
    const categoryCondition = !filters.value.category || event.category === filters.value.category
    const cityCondition = !filters.value.city || event.location.city === filters.value.city
    const dateCondition = !filters.value.date || calculateDate(filters.value.date, event.date.day)
    return categoryCondition && cityCondition && dateCondition && !event.featured
  })

  const sortEvents = (events: EventData[]) => {
    const getYear = (date: string) => Number(date.split('/')[0])
    const getMonth = (date: string) => Number(date.split('/')[1])
    const getDay = (date: string) => Number(date.split('/')[2])

    return events.sort((a, b) => {
      const yearDiff = getYear(b.date.day) - getYear(a.date.day)
      if (yearDiff !== 0)
        return yearDiff

      const monthDiff = getMonth(b.date.day) - getMonth(a.date.day)
      if (monthDiff !== 0)
        return monthDiff

      return getDay(b.date.day) - getDay(a.date.day)
    })
  }

  return sortEvents(filteredEvents)
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
    <EventCard v-if="featuredEvent" :event="featuredEvent as EventData" featured class="mx-auto mb-8">
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
    <TransitionGroup
      v-if="notFeaturedEvents.length"
      name="card"
      tag="section"
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 place-items-center"
    >
      <EventCard v-for="event in notFeaturedEvents" :key="event.id" :event="event">
        <IconDetail v-for="{ id, text } in event.details" :id="id" :key="id" :text="text" />
        <template #footer>
          <CtaComponent tertiary :href="event.ticketsURL">Get tickets</CtaComponent>
        </template>
      </EventCard>
    </TransitionGroup>
    <div v-else class="head-6 pt-4 text-center">No events yet, want to organize one?</div>
  </main>
</template>

<style scoped lang="scss">
.card-move,
.card-enter-active,
.card-leave-active {
  transition: all 0.3s ease-in-out;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: scale(0);
}

.card-leave-active {
  position: absolute;
}
</style>
