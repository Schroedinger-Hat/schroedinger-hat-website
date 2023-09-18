<script setup lang="ts">
defineProps<{
  text: string
  isActive?: boolean
}>()
</script>

<template>
  <span class="px-2 py-1 rounded-full hover:cursor-pointer hover:bg-gray" :class="[isActive ? 'bg-red text-white' : ' bg-white !text-black']">
    {{ text }}
  </span>
</template>

<style scoped>

</style>
