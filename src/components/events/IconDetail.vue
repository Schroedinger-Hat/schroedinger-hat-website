<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  value: string
  id: string
}>()

const icon = computed(() => {
  switch (props.id) {
    case 'date':
      return 'calendar'
    case 'speaker':
      return 'user-speaker'
    case 'location':
      return 'location-filled'
    default:
      return props.id
  }
})
</script>

<template>
  <div class="flex justify-center items-center">
    <Icon :icon="`carbon:${icon}`" class="mr-2" />
    <span>{{ value }}</span>
  </div>
</template>
