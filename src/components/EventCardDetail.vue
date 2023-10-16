<script setup lang="ts">
// Add SVGs with PresetIcons (carbon)
defineProps<{
  src: string
  text: string
}>()
</script>

<template>
  <div class="flex gap-1 mb-1">
    <img :src="src" alt=""><span>{{ text }}</span>
  </div>
</template>
