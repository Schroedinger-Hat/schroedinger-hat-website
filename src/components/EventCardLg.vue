<script setup lang="ts">
import EventCardDetail from './EventCardDetail.vue'
import type EventType from '@/i18n/events'

defineProps<{
  event: EventType
}>()
</script>

<template>
  <div class="relative overflow-hidden w-full rounded-12px flex flex-col-reverse sm:flex-row">
    <div class="relative bg-#d9d9d9 p-14px h-300px flex flex-col sm:basis-1/3 lg:basis-1/2">
      <div class="border-1px border-solid border-black rounded-full w-fit px-2 text-11px text-black">
        {{ event.category }}
      </div>
      <div class="text-16px text-black my-2">
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
        <a href="#" class="px-3 py-2 bg-#ef2908 text-white mt-4 rounded-xl hover:cursor-pointer block w-fit">
          Get tickets
        </a>
      </div>
    </div>
    <div class="relative -z-1 bg-red h-300px overflow-hidden sm:basis-2/3 lg:basis-1/2">
      <img :src="event.image.url" :alt="event.image.alt" class="overflow-hidden object-cover w-full object-center">
    </div>
  </div>
</template>

<style scoped>

</style>
