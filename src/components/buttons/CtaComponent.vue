<script setup lang="ts">
import { useAttrs } from 'vue'
import { useCtaComponent } from '../functions/useCtaComponent'

const attrs = useAttrs()

const { component, bindings } = useCtaComponent(attrs)
</script>

<template>
  <component :is="component" v-bind="bindings">
    <slot />
  </component>
</template>

<style scoped lang="scss">
//
</style>
