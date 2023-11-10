<script setup lang="ts">
import { computed, readonly } from 'vue'
import type { EventData } from '@/i18n/events/index'
import EventFormSelect from '@/components/EventFormSelect.vue'

const props = defineProps<{
  events: EventData[]
}>()

const modelCategory = defineModel<string>('modelCategory')
const modelCity = defineModel<string>('modelCity')
const modelDate = defineModel<number>('modelDate')

const options = readonly({
  categories: computed(() => new Set(props.events.map(event => event.category))),
  cities: computed(() => new Set(props.events.map(event => event.location.city))),
})
</script>

<template>
  <form class="flex flex-col lg:flex-row justify-evenly items-center mb-8">
    <EventFormSelect v-model:model="modelCity" :items="options.cities" item-name="Location" />
    <EventFormSelect v-model:model="modelCategory" :items="options.categories" item-name="Categories" />
    <EventFormSelect v-model:model="modelDate" item-name="Dates">
      <option v-for="month, index in $tm('message.months')" :key="month" :value="Number(index)">
        {{ month }}
      </option>
    </EventFormSelect>
  </form>
</template>
