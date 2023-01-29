<script setup lang="ts">
</script>

<template>
  <div class="codeconduct">
    <div class="container">
      <div class="content" v-html="$t('pages.code-of-conduct')" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.codeconduct {
  .content {
    padding: 1.5em 3em;
  }
}
</style>
