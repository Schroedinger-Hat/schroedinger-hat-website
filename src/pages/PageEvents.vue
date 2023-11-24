<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import IconDetail from '@components/events/IconDetail.vue'
import EventCard from '@components/events/EventCard.vue'
import CtaComponent from '@components/buttons/CtaComponent.vue'
import EventForm from '@components/events/EventForm.vue'
import type { LanguageCodes } from '@i18n/types'
import messages from '@i18n/messages'
import type { Event } from '@i18n/events/index'

const SESSIONS_LINK = 'https://github.com/Schrodinger-Hat/sh-sessions/issues/new/choose'

const { t, locale } = useI18n()
const events = computed(() => messages[locale.value as LanguageCodes].page.events.data)

const filters = ref({
  category: undefined,
  city: undefined,
  date: undefined,
  hidePastEvents: false,
})

const featuredEvent = computed(() => events.value.find(event => event.featured))

const notFeaturedEvents = computed(() => {
  const isSameMonth = (date: string, condition: number) => Number(new Date(date).getMonth() + 1) === condition

  const filteredEvents = events.value.filter((event) => {
    const categoryCondition = !filters.value.category || event.category === filters.value.category
    const cityCondition = !filters.value.city || event.location.city === filters.value.city
    const dateCondition = !filters.value.date || isSameMonth(event.schedule.date, filters.value.date)
    return categoryCondition && cityCondition && dateCondition && !event.featured
  })

  const sortedEvents = filteredEvents.sort((a, b) => new Date(b.schedule.date).getTime() - new Date(a.schedule.date).getTime())

  const filteredPastEvents = filters.value.hidePastEvents
    ? sortedEvents.filter(event => new Date(event.schedule.date).getTime() > Date.now())
    : sortedEvents

  return filteredPastEvents.map(event => ({
    ...event,
    valid: Date.now() < new Date(event.schedule.date).getTime(),
  }))
})

useHead({
  title: t('head.events.title'),
  meta: [{ name: t('head.events.meta.name'), content: t('head.events.meta.content') }],
})
</script>

<template>
  <main w-full p-8 max-w-7xl mx-auto>
    <h1 class="head-3" mb-4 text-center data-test="events-header">
      {{ $t(`navbar.events`) }}
    </h1>
    <EventCard v-if="featuredEvent" :event="featuredEvent as Event" featured mx-auto mb-8>
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
      :hide-past-events="filters.hidePastEvents"
      @toggle-events="filters.hidePastEvents = !filters.hidePastEvents"
    />
    <TransitionGroup
      v-if="notFeaturedEvents.length" name="card" tag="section"
      grid="~ cols-1 md:cols-2 xl:cols-3 gap-2" place-items-center
    >
      <EventCard v-for="event in notFeaturedEvents" :key="event.id" :event="event">
        <IconDetail v-for="{ id, value } in event.details" :id="id" :key="id" :value="value" />
        <template #footer>
          <CtaComponent v-if="event.valid" tertiary :href="event.ticketsURL">Get tickets</CtaComponent>
        </template>
      </EventCard>
    </TransitionGroup>
    <div v-else text-center>
      <div class="head-6" pt-4 mb-2 text-center>{{ $t('page.events.copy.form.items.no-result.message') }}</div>
      <CtaComponent tertiary :href="SESSIONS_LINK" target="_blank">{{ $t('page.events.copy.form.items.no-result.cta') }}</CtaComponent>
    </div>
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
