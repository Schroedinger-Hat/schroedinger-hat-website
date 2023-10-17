<script setup lang="ts">
defineProps<{
  text: string
  icon: string
}>()
</script>

<template>
  <div class="flex justify-center items-center">
    <div :class="icon" class="mr-2" />
    <span>{{ text }}</span>
  </div>
</template>
