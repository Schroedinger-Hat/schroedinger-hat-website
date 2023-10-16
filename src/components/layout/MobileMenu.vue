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
const smallerThanMd = breakpoints.smaller('md')

watch(smallerThanMd, (value) => {
  if (props.show && !value)
    emit('close')
})
</script>

<template>
  <transition name="slide">
    <nav v-if="show && smallerThanMd" class="menu">
      <CtaComponent
        v-for="{ id, href, to, text, test, target } in links"
        :key="id"
        :data-test="`data-${test}`"
        :href="href"
        :target="target ? target : null"
        :to="to ? { name: to } : null"
        secondary
        class="head-6 block py-4 !border-b-solid !border-b !border-b-slate-300 rounded-none !dark:border-b-slate-50/[0.06]"
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
}

.#{$dark-mode-class} {
  .menu{
    background: $dark-bg-primary;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
