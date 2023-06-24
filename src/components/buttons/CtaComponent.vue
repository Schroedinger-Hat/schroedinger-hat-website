<script setup lang="ts">
import { useAttrs } from 'vue'
import { useCtaComponent } from '@/functions/useCtaComponent'

const { component, bindings } = useCtaComponent(useAttrs())
</script>

<template>
  <component :is="component" v-bind="bindings">
    <slot />
  </component>
</template>
