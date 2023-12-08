<script setup lang="ts">
import { useAttrs } from 'vue'
import { useCtaComponent } from '@/functions/useCtaComponent'

defineProps<{
  icon: string
  small?: boolean
  ariaLabel?: string
}>()

const { component, bindings } = useCtaComponent(useAttrs())
</script>

<template>
  <component
    :is="component"
    :aria-label="ariaLabel"
    v-bind="bindings"
    class="cta mx-1 px-1 py-0.5 rounded-1"
    :class="{ small }"
  >
    <i :class="icon" />
  </component>
</template>

<style lang="scss" scoped>
.cta {
  font-size: rem(20px);
  transition: background 0.3s ease-in-out;

  @include breakpoint(md) {
    &:hover {
      background-color: $bg-secondary;
    }
  }

  &.small {
    font-size: rem(16px);
  }
}

.#{$dark-mode-class} {
  .cta{
    @include breakpoint(md) {
      &:hover {
        background-color: $dark-bg-secondary;
      }
    }
  }
}
</style>
