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
            :to="{ name: 'HomeView' }"
            @click="emit('onCloseMenu')"
          >
            <img alt="SH logo" width="36" src="../../assets/logo-64.png">
          </router-link>
        </div>
        <button class="close-header" @click="emit('onCloseMenu')">
          <i class="fas fa-hamburger" />
        </button>
      </div>
      <nav>
        <div class="navbar">
          <a
            href="https://github.com/Schrodinger-Hat"
            target="_blank"
            @click="emit('onCloseMenu')"
          >GitHub
          </a>
          <router-link
            :to="{ name: 'Team' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.team') }}
          </router-link>
          <router-link
            :to="{ name: 'EventList' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.events') }}
          </router-link>
          <router-link
            :to="{ name: 'CodeOfConduct' }"
            @click="emit('onCloseMenu')"
          >
            {{ $t('navbar.codeOfConduct') }}
          </router-link>
          <a
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

.mobile-menu-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

button {
  border-radius: 0.25em;
  background-color: transparent;
  border: none;
  margin: 0 0.4em;
  transition: background-color 100ms ease-in-out 0s;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    background-color: $bg-secondary;
  }
}
</style>
