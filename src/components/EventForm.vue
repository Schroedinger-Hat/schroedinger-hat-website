<script setup lang="ts">
import { computed, readonly } from 'vue'
import type { EventData } from '@/i18n/events/index'

const props = defineProps<{
  events: EventData[]
}>()

const modelCategory = defineModel<string>('modelCategory')
const modelCity = defineModel<string>('modelCity')
const modelDate = defineModel<number>('modelDate')

const options = readonly({
  categories: computed(() => new Set(props.events.map(event => event.category))),
  cities: computed(() => new Set(props.events.map(event => event.location.city))),
  dates: computed(() => new Set(props.events.map(event => event.date.day))),
})
</script>

<template>
  <form class="flex justify-evenly items-center mb-8">
    <div>
      <label for="cities" class="block">Location</label>
      <select id="cities" v-model="modelCity" name="Cities" class="p-1 bg-dark-bg-secondary rounded-lg">
        <option disabled value="">Please select one...</option>
        <option :value="undefined">All</option>
        <option v-for="city in options.cities" :key="city" :value="city">
          {{ city }}
        </option>
      </select>
    </div>
    <div>
      <label for="categories" class="block">Category</label>
      <select id="categories" v-model="modelCategory" name="Categories" class="capitalize p-1 bg-dark-bg-secondary">
        <option disabled value="">Please select one...</option>
        <option :value="undefined">All</option>
        <option v-for="category in options.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>
    <div>
      <label for="dates" class="block">Dates</label>
      <select id="dates" v-model.number="modelDate" name="Dates" class="p-1 bg-dark-bg-secondary">
        <option disabled value="">Please select one...</option>
        <option :value="undefined">All</option>
        <option v-for="month, index in $tm('message.months')" :key="month" :value="index">
          {{ month }}
        </option>
      </select>
    </div>
  </form>
</template>
