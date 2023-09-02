<script setup lang="ts">
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

defineProps<{
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
    <div v-if="show && smallerThanLg" class="mobile-menu-container">
      <div class="mobile-menu-header">
        <div class="logo">
          <router-link
            data-test="mobile-homepage-link"
            :to="{ name: 'Home' }"
            @click="$emit('close')"
          >
            <img alt="SH logo" width="36" src="@/assets/sh-logo-small.png">
          </router-link>
        </div>
        <button class="close-header" data-test="mobile-burger-menu-cta" @click="$emit('close')">
          <i class="fas fa-hamburger" />
        </button>
      </div>
      <nav>
        <div class="navbar" data-test="mobile-nav-link-wrapper">
          <a
            data-test="mobile-github-page-link"
            href="https://github.com/Schrodinger-Hat"
            target="_blank"
            @click="$emit('close')"
          >GitHub
          </a>
          <router-link
            data-test="mobile-team-page-link"
            :to="{ name: 'Team' }"
            @click="$emit('close')"
          >
            {{ $t('navbar.team') }}
          </router-link>
          <router-link
            data-test="mobile-event-page-link"
            :to="{ name: 'EventList' }"
            @click="$emit('close')"
          >
            {{ $t('navbar.events') }}
          </router-link>
          <router-link
            data-test="mobile-conduct-page-link"
            :to="{ name: 'CodeOfConduct' }"
            @click="$emit('close')"
          >
            {{ $t('navbar.codeOfConduct') }}
          </router-link>
          <a
            data-test="mobile-go-nord-page-link"
            href="https://ign.schrodinger-hat.it"
            target="_blank"
            @click="$emit('close')"
          > ImageGoNord </a>
        </div>
      </nav>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.menu {
  background-color: $bg-primary;
  transition: all 0.4s ease-in 0;
}

li {
  border-bottom: 1px solid $bg-secondary;

  &:first-of-type{
    border-top: 1px solid $bg-secondary;
  }
}

.#{$dark-mode-class} {
  .menu {
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
