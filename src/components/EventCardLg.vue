<script setup lang="ts">
import EventCardDetail from './EventCardDetail.vue'
import type EventType from '@/i18n/events'

defineProps<{
  event: EventType
}>()
</script>

<template>
  <div class="relative overflow-hidden w-full rounded-12px flex flex-col-reverse sm:flex-row sm:mx-auto sm:max-w-[80%] lg:max-w-[60%] hover:cursor-pointer hover:scale-105">
    <div class="relative bg-light-bg-secondary text-light-text-primary dark:bg-dark-bg-secondary dark:text-dark-text-primary p-14px h-300px flex flex-col sm:basis-1/3">
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
        <a :href="event.ticketHref" target="_blank" class="px-3 py-2 bg-#ef2908 text-white mt-4 rounded-xl hover:cursor-pointer block w-fit">
          Get tickets
        </a>
      </div>
    </div>
    <div class="relative -z-1 bg-red h-300px overflow-hidden sm:basis-2/3 object-cover object-center overflow-hidden aspect-16/9">
      <img :src="event.image.url" :alt="event.image.alt" class="w-full">
    </div>
  </div>
</template>

<style scoped>

</style>
