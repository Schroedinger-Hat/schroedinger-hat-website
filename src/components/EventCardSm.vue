<script setup lang="ts">
import EventCardDetail from './EventCardDetail.vue'
import type EventType from '@/i18n/events'

defineProps<{
  event: EventType
}>()
</script>

<template>
  <div class="bg-light-bg-secondary text-light-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary p-14px w-full h-300px rounded-12px flex flex-col">
    <div class="border-1px border-solid border-light-text-primary dark:border-dark-text-primary rounded-full w-fit px-2 text-11px">
      {{ event.category }}
    </div>
    <div class="text-16px my-2">
      {{ event.title }}
    </div>
    <div class="text-12px mb-2">
      {{ event.description }}
    </div>
    <div class="text-10px! mt-auto">
      <div class="flex gap-4">
        <EventCardDetail src="src/assets/svg/calendar.svg" :text="event.date.day" />
        <EventCardDetail src="src/assets/svg/clock.svg" :text="`${event.date.starts_at} - ${event.date.ends_at}`" />
      </div>
      <EventCardDetail src="src/assets/svg/microphone.svg" :text="event.speakers" />
      <EventCardDetail src="src/assets/svg/tag.svg" :text="event.arguments" />
      <EventCardDetail src="src/assets/svg/maps.svg" :text="event.location.name" />
    </div>
  </div>
</template>

<style scoped>

</style>
