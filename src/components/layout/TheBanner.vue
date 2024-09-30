<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useBannerCookie } from '@/functions/useBannerCookie'

defineProps<{
  content: string
  href: string
}>()

// TODO: Once content is ready, replace !banner.dismissed on line 16.
const { handleDismiss, banner } = useBannerCookie()
</script>

<template>
  <div
    v-if="false"
    class="banner"
    text="center base"
    fixed inset-x-0 bottom-0 p-4
  >
    <a :href="href" target="_blank" flex justify-center items-center>
      <div flex-grow text-balance>
        <p>{{ content }}</p>
      </div>
      <button p-2 text-xl @click.prevent="handleDismiss">
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
