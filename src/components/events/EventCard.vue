<script setup lang="ts">
import type { Event } from '@/i18n/events/index'
import { getAssetURL } from '@/utils/getAssetURL'

defineProps<{
  event: Event
  featured?: boolean
}>()
</script>

<template>
  <article class="card rounded-3 border border-slate-200/30 bg-dark-bg-secondary" :class="{ featured }">
    <div class="flex-grow flex flex-col p-9 space-y-3 lg:space-y-5">
      <span
        class="capitalize w-min px-3 py-0.5 rounded-full"
        :class="`bg-${event.category.toLowerCase()}`"
      >{{ event.category }}</span>
      <div class="head-6" font-bold>
        <h3>{{ event.headline }}</h3>
        <h3>{{ event.title }}</h3>
      </div>
      <p class="flex-grow flex justify-start items-center text-md">{{ event.description.short }}</p>
      <div v-if="$slots.default" class="flex-grow flex flex-col justify-center items-start">
        <slot />
      </div>
      <div v-if="$slots.footer" class="flex justify-start items-center">
        <slot name="footer" />
      </div>
    </div>
    <figure class="flex-shrink-0">
      <img :src="event.image.URL ? event.image.URL : getAssetURL('svg/logo-sh.svg')" :alt="event.image.alt" class="w-full h-full object-center object-cover">
    </figure>
  </article>
</template>

<style scoped lang="scss">
.card {
  display: flex;
  overflow: hidden;
  width: rem(348px);
  min-height: rem(760px);
  flex-direction: column-reverse;
  justify-content: space-between;

  &.featured {
    @include breakpoint(lg) {
      width: 100%;
      height: rem(4px);
      min-height: rem(540px);
      flex-direction: row;
    }

    figure {
      height: rem(256px);

      @include breakpoint(lg) {
        height: auto;
        flex-basis: 70%;
      }
    }
  }

  &:not(.featured) figure {
    height: rem(256px);
  }
}

.bg-event {
  background: $nord13;
}

.bg-session {
  background: $nord14;
}

.bg-workshop {
  background: $nord10;
}
</style>
