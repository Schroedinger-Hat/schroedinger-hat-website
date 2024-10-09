<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBannerCookie } from '@/functions/useBannerCookie'

defineProps<{
  content: string
  href: string
}>()

const { handleDismiss, banner } = useBannerCookie()
</script>

<template>
  <div
    v-if="!banner.dismissed"
    class="banner"
    text="center base"
    fixed inset-x-0 bottom-0 p="2 lg:4"
  >
    <a :href="href" target="_blank" flex justify-center items-center>
      <div flex-grow text-balance>
        <p text="base lg:lg !white">{{ content }} &#128640;</p>
      </div>
      <button border-none rounded-full p-0.5 text="base lg:xl" bg="white dark:transparent" @click.prevent="handleDismiss">
        <Icon icon="carbon:close" />
      </button>
    </a>
  </div>
</template>

<style scoped lang="scss">
.banner {
  z-index: $z-banner;
  background: linear-gradient(90deg, rgb(238 0 0 / 100%) 0%, rgb(190 30 45 / 100%) 100%) !important;
}
</style>
