<script setup lang="ts">
const emit = defineEmits<{
  (e: 'closeMenu'): void
}>()
</script>

<template>
  <div class="mobile-menu-container">
    <nav>
      <div class="navbar">
        <a
          href="https://github.com/Schrodinger-Hat"
          target="_blank"
          @click="emit('closeMenu')"
        >GitHub
        </a>
        <router-link to="/team" @click="emit('closeMenu')">
          {{ $t('navbar.team') }}
        </router-link>
        <router-link to="/events" @click="emit('closeMenu')">
          {{ $t('navbar.events') }}
        </router-link>
        <router-link to="/code-of-conduct" @click="emit('closeMenu')">
          {{ $t('navbar.codeOfConduct') }}
        </router-link>
        <a
          href="https://ign.schrodinger-hat.it"
          target="_blank"
          @click="emit('closeMenu')"
        > ImageGoNord </a>
      </div>
    </nav>
  </div>
</template>

<style scoped lang="scss">
.mobile-menu-container {
  //display: none;
  position: fixed;
  width: 100%;
  /* bottom: calc(100vh); */
  /* opacity: 0; */
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

/* .loaded { */
/*   &.mobile-menu-container { */
/*     bottom: 0; */
/*     opacity: 1; */
/*     transition: bottom 0.25s ease-out 0s, opacity 0.3s ease-in-out 0s; */
/*   } */
/* } */

.#{$dark-mode-class} {
  .mobile-menu-container {
    background: $dark-bg-primary;
  }
}
</style>
