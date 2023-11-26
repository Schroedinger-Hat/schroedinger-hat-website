<script setup lang="ts">
import { useElementBounding } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import { useNewsletter } from '@/functions/useNewsletter'
import TheContributing from '@/components/TheContributing.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'

const navbar = ref<HTMLElement | null>(null)
const { height } = useElementBounding(navbar)
const { t } = useI18n()
const { init } = useNewsletter()

onMounted(init)

useHead({
  titleTemplate: (title?: string) => title ? `${title} | Schrödinger Hat` : 'Schrödinger Hat',
  meta: [{ name: t('head.app.meta.name'), content: t('head.app.meta.content') }],
})
</script>

<template>
  <div class="relative">
    <TheNavbar ref="navbar" />
    <RouterView class="page" />
    <TheContributing />
    <TheFooter />
  </div>
</template>

<style lang="scss">
body {
  font-family: 'Red Hat Display', sans-serif;
  font-size: rem(16px);
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  font-variant-ligatures: none;
  letter-spacing: 0;
  line-height: 1;
  overscroll-behavior: none;
  -webkit-tap-highlight-color: transparent;
  text-rendering: optimizelegibility;
  text-size-adjust: none;
}

.page {
  min-height: calc(100lvh - (v-bind(height) * 1px));
  min-height: calc(100dvh - (v-bind(height) * 1px));
}

.container {
  width: 100%;
  margin: 0 auto;
}

.head-1 {
  font-size: rem(40px);

  @include breakpoint(lg) {
    font-size: rem(44px);
  }
}

.head-2 {
  font-size: rem(36px);

  @include breakpoint(lg) {
    font-size: rem(40px);
  }
}

.head-3 {
  font-size: rem(32px);

  @include breakpoint(lg) {
    font-size: rem(36px);
  }
}

.head-4 {
  font-size: rem(28px);
  line-height: 0.9;

  @include breakpoint(lg) {
    font-size: rem(32px);
  }
}

.head-5 {
  font-size: rem(24px);

  @include breakpoint(lg) {
    font-size: rem(28px)
  }
}

.head-6 {
  font-size: rem(20px);

  @include breakpoint(lg) {
    font-size: rem(24px);
  }
}

.poppins {
  font-family: Poppins, sans-serif;
}

.logo-text {
  font-size: rem(32px);
  font-weight: 600;
  transition: opacity 2s ease-in-out 0s;
  vertical-align: super;
}

// Animations
@keyframes scale {
  0% {
    transform: scale(1)
  }

  100% {
    transform: scale(1.07)
  }
}
</style>
