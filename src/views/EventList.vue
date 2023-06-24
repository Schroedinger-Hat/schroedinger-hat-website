<script setup lang="ts">
import messages from '@/i18n/messages'
import EventCard from '@/components/separator/EventCard.vue'
import type { EventMessageName } from '@/i18n/types'

const events = Object.keys(messages.it.events) as EventMessageName[]
</script>

<template>
  <main class="flex flex-col justify-center items-center w-full">
    <h1
      class="head-3 mb-2 text-center"
      data-test="events-header"
    >
      {{ $t(`navbar.events`) }}
    </h1>
    <EventCard
      v-for="event in events"
      :key="event"
      :event="event"
    />
  </main>
</template>

<style scoped lang="scss">
//
</style>
