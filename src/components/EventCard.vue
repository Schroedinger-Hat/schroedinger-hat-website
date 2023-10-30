<script setup lang="ts">
import type { EventData } from '@/i18n/events/index'

defineProps<{
  event: EventData
  featured?: boolean
}>()
</script>

<template>
  <article class="card rounded-3 border border-slate-200/30 bg-dark-bg-secondary" :class="{ featured }">
    <div class="flex flex-col p-9 basis-2/6 space-y-3 lg:space-y-5">
      <div v-if="!featured" class="capitalize">{{ event.category }}</div>
      <div>
        <h3 v-if="event.overline" class="head-5">{{ event.overline }}</h3>
        <h3 class="head-5">{{ event.title }}</h3>
      </div>
      <p class="text-md">{{ event.shortDescription }}</p>
      <div v-if="$slots.default" class="flex-grow flex flex-col justify-center items-start">
        <slot />
      </div>
      <div v-if="$slots.footer" class="flex-grow flex justify-start items-center">
        <slot name="footer" />
      </div>
    </div>
    <figure class="flex basis-4/6">
      <img :src="event.image.url" :alt="event.image.alt" class="flex-grow w-full h-full object-center object-cover">
    </figure>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  overflow: hidden;
  flex-direction: column-reverse;

  &:not(.featured) figure {
    height: rem(256px);
  }

  &.featured {
    @include breakpoint(lg) {
      height: rem(432px);
      flex-direction: row;
    }
  }
}
</style>
