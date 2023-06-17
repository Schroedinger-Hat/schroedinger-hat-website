<script setup lang="ts">
import messages from '../i18n/messages'

const events = Object.keys(messages.it.events)
</script>

<template>
  <div class="event-list w-auto mx-auto md:w-[700px]">
    <h1 class="head-3 mb-2 text-center self-start md:text-left" data-test="events-header">
      {{ $t(`navbar.events`) }}
    </h1>
    <div
      class="w-[400px] mx-auto md:w-auto"
    >
      <div
        v-for="event in events"
        :key="event"
        class="blog-card flex flex-col mb-3 rounded shadow-lg md:flex-row md:h-[260px]"
      >
        <div class="relative h-52 overflow-hidden md:basis-2/5 md:h-auto">
          <div
            :data-test="`event-${event}-photo`"
            class="photo absolute inset-0 bg-center bg-cover"
            :style="`background-image: url( ${$t(`events.${event}.image`)} );`"
          />
        </div>
        <div class="basis-3/5 w-full h-full z-1">
          <div class="description h-full flex flex-col justify-between items-start p-3 relative space-y-2">
            <h1
              class="head-4 font-700"
              :data-test="`event-${event}-title`"
            >
              {{ $t(`events.${event}.title`) }}
            </h1>
            <h2
              class="poppins"
              :data-test="`event-${event}-date`"
            >
              {{ $t(`events.${event}.date`) }} | {{ $t(`events.${event}.location`) }}
            </h2>
            <p
              :data-test="`event-${event}-subtitle`"
              class="font-bold"
            >
              {{ $t(`events.${event}.subtitle`) }}
              <br><br>
            </p>
            <router-link
              :data-test="`event-${event}-read-more`"
              :to="{ name: 'EventView', params: { event } }"
              class="mt-1 self-end"
            >
              {{ $t(`message.common.read-more`) }}
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;

.event-list {
  .blog-card {
    .photo {
      transition: transform 0.2s;

      &:hover {
        transform: scale(1.3) rotate(3deg);
      }
    }

  }
}

.#{$dark-mode-class} {
  .blog-card {
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

@media (width >= 640px) {
  .description {
    &::before {
      position: absolute;
      z-index: -1;
      top: 0;
      bottom: 0;
      left: rem(-8px);
      width: rem(32px);
      background: transparent;
      transform: skewX(-3deg);
    }
  }
}
</style>
