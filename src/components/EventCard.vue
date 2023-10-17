<script setup lang="ts">
import type { Event } from '@/i18n/events'

defineProps<{
  event: Event
  featured?: boolean
}>()
</script>

<template>
  <article class="flex flex-col-reverse lg:flex-row lg:h-108 rounded-3 border border-slate-200/30 overflow-hidden">
    <div class="flex flex-col p-9 basis-2/6 space-y-3 lg:space-y-5">
      <div v-if="!featured" class="capitalize">{{ event.category }}</div>
      <h3 class="head-5">{{ event.title }}</h3>
      <p class="text-md">{{ event.shortDescription }}</p>
      <div class="flex-grow flex flex-col justify-center items-start">
        <slot />
      </div>
      <div class="flex-grow">
        <slot name="footer" />
      </div>
    </div>
    <figure class="flex basis-4/6">
      <img :src="event.image.url" :alt="event.image.alt" class="flex-grow w-full h-full object-center object-cover">
    </figure>
  </article>
</template>
