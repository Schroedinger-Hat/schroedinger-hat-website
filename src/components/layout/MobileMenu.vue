<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import CtaComponent from '@/components/buttons/CtaComponent.vue'

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
const smallerThanLg = breakpoints.smaller('md')
</script>

<template>
  <transition name="slide">
    <nav v-if="show && smallerThanLg" class="menu">
      <CtaComponent
        v-for="{ id, href, to, text, test, target } in links"
        :key="id"
        :data-test="`data-${test}`"
        :href="href"
        :target="target ? target : null"
        :to="to ? { name: to } : null"
        class="head-6 link block py-4 cursor-pointer"
        @click="$emit('close')"
      >
        <span>{{ $t(text as string) }}</span>
      </CtaComponent>
    </nav>
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
  transition: 0.25s ease-out 0s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
