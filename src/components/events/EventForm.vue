<script setup lang="ts">
import { computed, readonly } from 'vue'
import type { Event } from '@/i18n/events/index'
import EventFormSelect from '@/components/events/EventFormSelect.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'

const props = defineProps<{
  events: Event[]
  hidePastEvents: boolean
}>()

defineEmits<{
  toggleEvents: []
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
  <form flex="~ col md:row justify-evenly items-center gap-4" mb-8>
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
    <CtaComponent quaternary @click.prevent="$emit('toggleEvents')">
      {{ hidePastEvents
        ? $t('page.events.copy.form.items.pastEvents.show')
        : $t('page.events.copy.form.items.pastEvents.hide') }}
    </CtaComponent>
  </form>
</template>
