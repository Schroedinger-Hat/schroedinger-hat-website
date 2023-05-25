<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
// locale.value = 'it'
</script>

<template>
  <div class="uppercase">
    <button class="bg-transparent">
      {{ locale }}
    </button>
  </div>
  <div>
    <div
      v-for="language in $i18n.availableLocales"
      :key="`locale-${language}`"
      :value="language"
    >
      {{ language.toUpperCase() }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
//
</style>
