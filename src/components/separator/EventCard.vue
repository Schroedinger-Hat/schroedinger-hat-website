<script setup lang="ts">
import { type EventMessageName } from '@/i18n/types'

const props = defineProps<{
  event: EventMessageName
}>()
</script>

<template>
  <div class="blog-card flex flex-col mb-3 rounded shadow-lg w-[400px] md:flex-row md:h-[260px] md:w-[700px]">
    <div class="relative h-52 overflow-hidden md:basis-2/5 md:h-auto">
      <div
        :data-test="`event-${props.event}-photo`"
        class="photo absolute inset-0 bg-center bg-cover"
        :style="`background-image: url( ${$t(`events.${props.event}.image`)} );`"
      />
    </div>
    <div class="basis-3/5 w-full h-full z-1">
      <div class="description flex flex-col justify-between items-start h-full p-3 space-y-2 relative">
        <div>
          <h1
            class="head-4 mb-2 font-700"
            :data-test="`event-${props.event}-title`"
          >
            {{ $t(`events.${props.event}.title`) }}
          </h1>
          <span
            class="poppins"
            :data-test="`event-${props.event}-date`"
          >
            {{ $t(`events.${props.event}.date`) }} | {{ $t(`events.${props.event}.location`) }}
          </span>
        </div>
        <p
          :data-test="`event-${props.event}-subtitle`"
          class="font-bold"
        >
          {{ $t(`events.${props.event}.subtitle`) }}
          <br><br>
        </p>
        <router-link
          :data-test="`event-${props.event}-read-more`"
          :to="{ name: 'EventView', params: { event } }"
          class="mt-1 self-end"
        >
          {{ $t(`message.common.read-more`) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo {
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.3) rotate(3deg);
  }
}

.#{$dark-mode-class} {
  .blog-card {
    span {
      color: $c-dark-text-secondary;
    }

    background: $nord2;

    .description {
      background: $nord2;

      h2,
      .read-more a {
        color: $nord4;
      }

      &::before {
        background: $nord2;
      }
    }
  }
}

.description {
  @include breakpoint(md) {
    &::before {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: rem(-8px);
      width: rem(32px);
      background: transparent;
      content: '';
      transform: skewX(-3deg);
    }
  }
}
</style>
