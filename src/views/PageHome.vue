<script setup lang="ts">
import TheMain from '@/components/TheMain.vue'
</script>

<template>
  <main class="container">
    <TheMain />
  </main>
</template>

<style scoped lang="scss">
.#{$dark-mode-class} {
  .demo-section {
    background: $nord2;
  }
}
</style>
