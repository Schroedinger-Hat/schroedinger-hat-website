<script setup lang="ts">
import { useAttrs } from 'vue'
import { Icon } from '@iconify/vue'
import { useCtaComponent } from '@/functions/useCtaComponent'

defineOptions({
  inheritAttrs: false,
})

defineProps<{
  ariaLabel?: string
  icon: string
  small?: boolean
}>()

const { component, bindings } = useCtaComponent(useAttrs())
</script>

<template>
  <component
    :is="component"
    :aria-label="ariaLabel"
    v-bind="bindings"
    class="cta"
    flex="~ justify-center items-center" mx-1 p="x-1 y-0.5" rounded-1 md:hover:bg-base-secondary
    :class="{ small }"
  >
    <Icon :icon="`carbon:${icon}`" />
  </component>
</template>

<style lang="scss" scoped>
.cta {
  font-size: rem(20px);
  transition: background map.get($transition-duration, default) map.get($transition-timing-function, default);

  &.small {
    font-size: rem(16px);
  }
}
</style>
