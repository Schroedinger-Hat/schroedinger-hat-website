<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  text: string
  id: string
}>()

const icon = computed(() => {
  switch (true) {
    case props.id === 'date':
      return 'calendar'
    case props.id === 'speaker':
      return 'user-speaker'
    case props.id === 'location':
      return 'location-filled'
    default:
      return props.id
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <Icon :icon="`carbon:${icon}`" class="mr-2" />
    <span>{{ text }}</span>
  </div>
</template>
