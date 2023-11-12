<script setup lang="ts">
import type { EventData } from '@/i18n/events/index'

defineProps<{
  event: EventData
  featured?: boolean
}>()
</script>

<template>
  <article class="card rounded-3 border border-slate-200/30 bg-dark-bg-secondary" :class="{ featured }">
    <div class="flex-grow flex flex-col p-9 space-y-3 lg:space-y-5">
      <div v-if="!featured" class="capitalize">{{ event.category }}</div>
      <div>
        <h3 v-if="event.overline" class="head-5">{{ event.headline }}</h3>
        <h3 class="head-5">{{ event.title }}</h3>
      </div>
      <p class="flex-grow flex justify-start items-center text-md">{{ event.description.short }}</p>
      <div v-if="$slots.default" class="flex-grow flex flex-col justify-center items-start">
        <slot />
      </div>
      <div v-if="$slots.footer" class="flex justify-start items-center">
        <slot name="footer" />
      </div>
    </div>
    <figure>
      <img :src="event.image.URL" :alt="event.image.alt" class="w-full h-full object-center object-cover">
    </figure>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  overflow: hidden;
  max-width: rem(382px);
  min-height: rem(700px);
  flex-direction: column-reverse;
  justify-content: space-between;

  &.featured {
    @include breakpoint(lg) {
      max-width: 100%;
      height: rem(432px);
      min-height: unset;
      flex-direction: row;
    }

    figure {
      flex-basis: 75%;
    }
  }

  &:not(.featured) figure {
    height: rem(256px);
  }
}
</style>
