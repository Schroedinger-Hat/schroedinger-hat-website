<script setup lang="ts">
import type { Event } from '@/i18n/events'
import EventCardDetail from '@/components/EventCardDetail.vue'

defineProps<{
  event: Event
  featured?: boolean
}>()
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row lg:h-108 rounded-3 border border-slate-200/30 overflow-hidden">
    <div class="flex flex-col p-6 basis-2/6 space-y-4">
      <div v-if="!featured" class="capitalize">
        {{ event.category }}
      </div>
      <div class="head-5">
        {{ event.title }}
      </div>
      <div class="text-sm">
        {{ event.shortDescription }}
      </div>
      <div class="flex-grow flex flex-col justify-center items-start">
        <EventCardDetail src="src/assets/svg/calendar.svg" :text="event.date.day" />
        <EventCardDetail src="src/assets/svg/clock.svg" :text="`${event.date.start} - ${event.date.end}`" />
        <EventCardDetail src="src/assets/svg/microphone.svg" :text="event.speakers" />
        <EventCardDetail src="src/assets/svg/tag.svg" :text="event.arguments" />
        <EventCardDetail src="src/assets/svg/maps.svg" :text="event.location.name" />
      </div>
      <a :href="event.ticketHref" target="_blank" class="px-3 py-2 bg-#ef2908 text-white mt-4 rounded-xl hover:cursor-pointer block w-fit">
        Get tickets
      </a>
    </div>
    <div class="flex basis-4/6">
      <img :src="event.image.url" :alt="event.image.alt" class="flex-grow w-full h-full object-center object-cover">
    </div>
  </div>
</template>
