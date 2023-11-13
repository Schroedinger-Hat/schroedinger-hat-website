<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import type { Event } from '@/i18n/events/index'
import messages from '@/i18n/messages'
import type { LanguageCodes } from '@/i18n/types'
import IconDetail from '@/components/events/IconDetail.vue'
import EventCard from '@/components/events/EventCard.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import EventForm from '@/components/events/EventForm.vue'

const { t, locale } = useI18n()
const events = computed(() => messages[locale.value as LanguageCodes].page.events.data)

const filters = ref({
  category: undefined,
  city: undefined,
  date: undefined,
})

const featuredEvent = computed(() => events.value.find(event => event.featured))

const notFeaturedEvents = computed(() => {
  const calculateDate = (condition: number, date: string) => Number(date.split('T')[0].split('-')[1]) === condition

  const filteredEvents = events.value.filter((event) => {
    const categoryCondition = !filters.value.category || event.category === filters.value.category
    const cityCondition = !filters.value.city || event.location.city === filters.value.city
    const dateCondition = !filters.value.date || calculateDate(filters.value.date, event.schedule.date)
    return categoryCondition && cityCondition && dateCondition && !event.featured
  })

  const sortedEvents = filteredEvents.sort((a, b) => new Date(b.schedule.date).getTime() - new Date(a.schedule.date).getTime())

  return sortedEvents.map((event) => {
    return {
      ...event,
      valid: Date.now() < new Date(event.schedule.date).getTime(),
    }
  })
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
    <EventCard v-if="featuredEvent" :event="featuredEvent as Event" featured class="mx-auto mb-8">
      <IconDetail v-for="{ id, value } in featuredEvent.details" :id="id" :key="id" :value="value" />
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
      class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 place-items-center"
    >
      <EventCard v-for="event in notFeaturedEvents" :key="event.id" :event="event">
        <IconDetail v-for="{ id, value } in event.details" :id="id" :key="id" :value="value" />
        <template #footer>
          <CtaComponent v-if="event.valid" tertiary :href="event.ticketsURL">Get tickets</CtaComponent>
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
