<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { watch } from 'vue'
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

const props = defineProps<{
  links: Link[]
  show: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('md')

watch(smallerThanLg, (newIsSmaller) => {
  if (props.show && newIsSmaller)
    emit('close')
})
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
        class="head-6 link block py-4 cursor-pointer border-b dark:border-b-slate-50/[0.06] border-b-slate-300"
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
