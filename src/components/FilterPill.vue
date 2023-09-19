<script setup lang="ts">
defineProps<{
  text: string
  isActive?: boolean
}>()
</script>

<template>
  <span class="px-2 rounded-full hover:cursor-pointer hover:bg-#e7e7ee" :class="[isActive ? 'bg-#ef2908 text-white' : ' bg-white !text-black']">
    {{ text }}
  </span>
</template>

<style scoped>

</style>
