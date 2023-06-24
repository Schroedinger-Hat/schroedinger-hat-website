<script setup lang="ts">
import { type EventMessageName } from '@/i18n/types'

const props = defineProps<{
  event: EventMessageName
}>()
</script>

<template>
  <div class="card flex flex-col mb-3 w-[380px] rounded-md overflow-hidden shadow-lg md:flex-row md:h-[260px] md:w-[700px]">
    <div class="relative h-52 overflow-hidden md:basis-2/5 md:h-auto">
      <div
        :data-test="`event-${props.event}-photo`"
        class="card-image absolute inset-0 bg-center bg-cover"
        :style="`background-image: url( ${$t(`events.${props.event}.image`)} );`"
      />
    </div>
    <div class="basis-3/5 w-full h-full z-1">
      <div class="description flex flex-col justify-between items-start h-full p-3 space-y-4 relative lg:space-y-2">
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
        </p>
        <router-link
          :data-test="`event-${props.event}-read-more`"
          :to="{ name: 'EventView', params: { event } }"
          class="read-more p-2 rounded mt-1 self-end relative hover:shadow"
        >
          {{ $t(`message.common.read-more`) }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card {
  transition: transform 0.01s;

  @include breakpoint(lg)  {
    &:hover {
      transform: scale(1.05);

      .card-image {
        transform: scale(1.2) rotate(-3deg);
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

.read-more {
  background-color: $nord10;

  @include breakpoint(lg) {
    background-color: transparent;

    &:hover {
      animation: scale infinite alternate linear 0.8s;
      background-color: $nord10;
    }
  }
}

.#{$dark-mode-class} {
  .card {
    background: $nord2;

    span {
      color: $c-dark-text-secondary;
    }

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
</style>
