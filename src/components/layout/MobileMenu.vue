<script setup lang="ts">
defineProps<{
  showMobileMenu: Boolean
}>()

const emit = defineEmits<{
  (e: 'onCloseMenu'): void
}>()
</script>

<template>
  <transition name="slide">
    <div v-if="showMobileMenu" class="mobile-menu-container">
      <nav>
        <div class="navbar">
          <a href="https://github.com/Schrodinger-Hat" target="_blank" @click="emit('onCloseMenu')">GitHub
          </a>
          <router-link to="/team" @click="emit('onCloseMenu')">
            {{ $t('navbar.team') }}
          </router-link>
          <router-link to="/events" @click="emit('onCloseMenu')">
            {{ $t('navbar.events') }}
          </router-link>
          <router-link to="/code-of-conduct" @click="emit('onCloseMenu')">
            {{ $t('navbar.codeOfConduct') }}
          </router-link>
          <a href="https://ign.schrodinger-hat.it" target="_blank" @click="emit('onCloseMenu')"> ImageGoNord </a>
        </div>
      </nav>
    </div>
  </transition>
</template>

<style scoped lang="scss">
.mobile-menu-container {
  position: fixed;
  width: 100%;
  background: $bg-primary;
  z-index: 1;
  left: 0;
  height: calc(100vh);
  transition: all 0.4s ease-in 0s;

  nav {
    .navbar {
      text-align: center;

      a {
        padding: 0.8em 0;
        display: block;
        font-size: 1.3em;
        border-bottom: 1px solid $bg-secondary;

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
  opacity: 0;
  bottom: 100vh;
}
</style>
