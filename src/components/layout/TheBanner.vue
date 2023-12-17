<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBannerCookie } from '@/functions/useBannerCookie'

const OSDAY_URL = 'https://osday.dev/'
const { banner, handleDismiss } = useBannerCookie()
</script>

<template>
  <div v-if="!banner.dismissed" class="banner" fixed inset-x-0 bottom-0 p-4 text-center text-base>
    <a :href="OSDAY_URL" target="_blank" flex justify-center items-center>
      <div flex-grow>
        <p inline>Are you ready for the next edition of <b>OSDay</b>? </p>
        <p inline-block md:inline>Get your free ticket now! <span inline> &#128640;</span></p>
      </div>
      <button p-2 text-xl @click.prevent="handleDismiss">
        <Icon icon="carbon:close" />
      </button>
    </a>
  </div>
</template>

<style scoped lang="scss">
.banner {
  background: linear-gradient(90deg, rgb(238 0 0 / 100%) 0%, rgb(190 30 45 / 100%) 100%) !important;
}
</style>
