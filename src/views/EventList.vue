<script setup lang="ts">
import messages from '../i18n/messages'

const events = Object.keys(messages.it.events)
</script>

<template>
  <div class="event-list flex flex-col justify-center items-center container">
    <div>
      <h1 class="head-3 text-left self-start" data-test="events-header">
        {{ $t(`navbar.events`) }}
      </h1>
      <router-link
        v-for="event in events"
        :key="event"
        :data-test="`event-${event}-link`"
        :to="{ name: 'EventView', params: { event } }"
        class="block max-w-[700px] my-2 shadow-md"
      >
        <div class="blog-card flex flex-col md:flex-row rounded">
          <div class="meta overflow-hidden relative h-50 basis-2/5 md:h-auto">
            <div
              :data-test="`event-${event}-photo`"
              class="photo absolute inset-0 bg-center bg-cover"
              :style="`background-image: url( ${$t(`events.${event}.image`)} );`"
            />
          </div>
          <div class="basis-3/5 w-full h-full z-1">
            <div class="description p-4 relative space-y-5">
              <h1
                class="h4"
                :data-test="`event-${event}-title`"
              >
                {{ $t(`events.${event}.title`) }}
              </h1>
              <h2
                class="mt-1 font-light"
                :data-test="`event-${event}-date`"
              >
                {{ $t(`events.${event}.date`) }} | {{ $t(`events.${event}.location`) }}
              </h2>
              <p
                :data-test="`event-${event}-subtitle`"
                class="mt-1"
              >
                {{ $t(`events.${event}.subtitle`) }}
                <br><br>
              </p>
              <!-- <div class="sponsors">
                <div class="logos" v-html="$t(`events.${event}.sponsors`)"></div>
              </div> -->
              <p
                :data-test="`event-${event}-read-more`"
                class="mt-1 text-right"
              >
                {{ $t(`message.common.read-more`) }}
              </p>
            </div>
          </div>
        </div>
      </router-link>
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
</style>
