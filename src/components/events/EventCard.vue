<script setup lang="ts">
import type { Event } from '@/i18n/events/index'
import { getAssetURL } from '@/utils/getAssetURL'

defineProps<{
  event: Event
  featured?: boolean
}>()
</script>

<template>
  <article
    :class="{ featured }"
    class="card"
    bg="light-bg-primary dark:dark-bg-secondary"
    border="~ slate-400 dark:slate-200/30 rounded-3"
  >
    <div flex="~ col grow gap-y-3 lg:gap-y-5" p-9>
      <span
        w-min p="x-3 y-0.5" capitalize rounded-full
        :class="`bg-${event.category.toLowerCase()}`"
      >{{ event.category }}</span>
      <div class="head-6" font-bold>
        <h3>{{ event.headline }}</h3>
        <h3>{{ event.title }}</h3>
      </div>
      <p flex="~ grow justify-start items-center" text-md>{{ event.description.short }}</p>
      <div v-if="$slots.default" flex="~ grow col justify-center items-start">
        <slot />
      </div>
      <div v-if="$slots.footer" flex="~ justify-start items-center">
        <slot name="footer" />
      </div>
    </div>
    <figure flex-shrink-0>
      <img
        :src="event.image.URL ? event.image.URL : getAssetURL('svg/logo-sh.svg')"
        :alt="event.image.alt" w-full h-full object="center cover"
      >
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
