<script setup lang="ts">
import { computed, readonly } from 'vue'
import type { Event } from '@/i18n/events/index'
import EventFormSelect from '@/components/events/EventFormSelect.vue'

const props = defineProps<{
  events: Event[]
}>()

const modelCategory = defineModel<string>('modelCategory')
const modelCity = defineModel<string>('modelCity')
const modelDate = defineModel<number>('modelDate')

const options = readonly({
  categories: computed(() => new Set(props.events.map(event => event.category))),
  cities: computed(() => new Set(props.events.map(event => event.location.city).sort())),
})
</script>

<template>
  <form class="flex flex-col md:flex-row justify-evenly items-center mb-8">
    <EventFormSelect
      v-model:model="modelCity"
      :items="options.cities"
      :item-name="$t('page.events.copy.form.items.location')"
    />
    <EventFormSelect
      v-model:model="modelCategory"
      :items="options.categories"
      :item-name="$t('page.events.copy.form.items.categories')"
    />
    <EventFormSelect
      v-model:model="modelDate"
      :item-name="$t('page.events.copy.form.items.dates')"
    >
      <option v-for="month, index in $tm('page.events.copy.form.months')" :key="month" :value="Number(index)">
        {{ month }}
      </option>
    </EventFormSelect>
  </form>
</template>
