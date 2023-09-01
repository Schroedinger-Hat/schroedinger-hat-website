<script setup lang="ts">
import { useAttrs } from 'vue'
import { useCtaComponent } from '@/functions/useCtaComponent'

defineProps<{
  icon: string
  small?: boolean
}>()

const { component, bindings } = useCtaComponent(useAttrs())
</script>

<template>
  <component
    :is="component"
    v-bind="bindings"
    class="button mx-1 px-1 py-0.5 rounded-1"
    :class="{ small }"
  >
    <i :class="icon" />
  </component>
</template>

<style lang="scss" scoped>
.button {
  font-size: rem(20px);

  &.small {
    font-size: rem(16px);
  }
}
</style>
