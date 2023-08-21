<script setup lang="ts">
import TheContributing from '@/components/TheContributing.vue'
import TheFooter from '@/components/layout/TheFooter.vue'
import TheNavbar from '@/components/layout/TheNavbar.vue'
</script>

<template>
  <TheNavbar />
  <RouterView />
  <TheContributing />
  <TheFooter />
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

.head-1 {
  font-size: rem(40px);
}

.head-2 {
  font-size: rem(36px)
}

.head-3 {
  font-size: rem(32px);
}

.head-4 {
  font-size: rem(28px);
  line-height: 0.9;
}

.head-5 {
  font-size: rem(24px)
}

.head-6 {
  font-size: rem(20px)
}

.poppins {
  font-family: Poppins, sans-serif;
}

.container {
  width: 100%;
  margin: 0 auto;
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
