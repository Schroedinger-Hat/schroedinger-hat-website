<script setup lang="ts">
const props = defineProps<{
  showMobileMenu: Boolean
  smallerThanLg: Boolean
}>()

const emit = defineEmits<{
  (e: 'onCloseMenu'): void
}>()
</script>

<template>
  <transition name="slide">
    <div v-if="props.showMobileMenu && props.smallerThanLg" class="mobile-menu-container">
      <div class="mobile-menu-header">
        <div class="logo">
          <router-link
            data-test="mobile-homepage-link"
            :to="{ name: 'Home' }"
            @click="emit('onCloseMenu')"
          >
            <img alt="SH logo" width="36" src="@/assets/sh-logo-small.png">
          </router-link>
        </div>
        <button class="close-header" data-test="mobile-burger-menu-cta" @click="emit('onCloseMenu')">
          <i class="fas fa-hamburger" />
        </button>
      </div>
      <nav>
        <div class="navbar" data-test="mobile-nav-link-wrapper">
          <a
            data-test="mobile-github-page-link"
            href="https://github.com/Schrodinger-Hat"
            target="_blank"
            @click="emit('onCloseMenu')"
          >GitHub
          </a>
          <router-link
            data-test="mobile-team-page-link"
            :to="{ name: 'Team' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.team') }}
          </router-link>
          <router-link
            data-test="mobile-event-page-link"
            :to="{ name: 'EventList' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.events') }}
          </router-link>
          <router-link
            data-test="mobile-conduct-page-link"
            :to="{ name: 'CodeOfConduct' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.codeOfConduct') }}
          </router-link>
          <a
            data-test="mobile-go-nord-page-link"
            href="https://ign.schrodinger-hat.it"
            target="_blank"
            @click="emit('onCloseMenu')"
          > ImageGoNord </a>
        </div>
      </nav>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.mobile-menu-container {
  position: fixed;
  z-index: 1;
  left: 0;
  width: 100%;
  height: calc(100vh);
  background: $bg-primary;
  transition: all 0.4s ease-in 0s;

  nav {
    .navbar {
      text-align: center;

      a {
        display: block;
        padding: 0.8em 0;
        border-bottom: 1px solid $bg-secondary;
        font-size: 1.3em;

        &:last-child {
          border-bottom: none;
        }
      }
    }
  }
}

.#{$dark-mode-class} {
  .mobile-menu-container {
    background: $dark-bg-primary;
  }
}

.slide-enter-active,
.slide-leave-active {
  bottom: 0;
  opacity: 1;
  transition: bottom 0.25s ease-out 0s, opacity 0.3s ease-in-out 0s;
}

.slide-enter-from,
.slide-leave-to {
  bottom: 100vh;
  opacity: 0;
}

.mobile-menu-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
}

button {
  border: none;
  border-radius: 0.25em;
  margin: 0 0.4em;
  background-color: transparent;
  cursor: pointer;
  font-size: 1.2em;
  transition: background-color 100ms ease-in-out 0s;

  &:hover {
    background-color: $bg-secondary;
  }
}
</style>
