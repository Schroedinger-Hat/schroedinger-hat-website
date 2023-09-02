<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import CtaIcon from '@/components/buttons/CtaIcon.vue'

interface Link {
  id: string
  to?: string
  test?: string
  text?: string
  href?: string
  target?: string
  icon?: string
}

defineProps<{
  links: Link[]
  show: boolean
}>()

defineEmits<{
  (e: 'close'): void
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')
</script>

<template>
  <transition name="slide">
    <div v-if="show && smallerThanLg" class="menu w-full fixed left-0 h-screen z-4">
      <div class="flex items-center justify-between p-4">
        <CtaComponent
          data-test="mobile-homepage-link"
          :to="{ name: 'Home' }"
          @click="$emit('close')"
        >
          <img alt="SH logo" width="36" src="@/assets/sh-logo-small.png">
        </CtaComponent>
        <CtaIcon icon="fas fa-hamburger" @click="$emit('close')" />
      </div>
      <nav class="text-center">
        <CtaComponent
          v-for="{ id, href, to, text, test, target } in links"
          :key="id"
          class="link block py-4 head-6"
          :data-test="`data-${test}`"
          :to="to ? { name: to } : null"
          :href="href"
          :target="target ? target : null"
          @click="$emit('close')"
        >
          <span>{{ $t(text as string) }}</span>
        </CtaComponent>
      </nav>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.menu {
  background: $bg-primary;
  transition: all 0.4s ease-in 0s;
}

.link {
  border-bottom: 1px solid $bg-secondary;

  &:last-child {
    border-bottom: none;
  }
}

.#{$dark-mode-class} {
  .menu{
    background: $dark-bg-primary;
  }
}

.slide-enter-active,
.slide-leave-active {
  bottom: 0;
  opacity: 1;
  transition: bottom 0.25s ease-out 0, opacity 0.3s ease-in-out 0;
}

.slide-enter-from,
.slide-leave-to {
  bottom: 100vh;
  opacity: 0;
}
</style>
