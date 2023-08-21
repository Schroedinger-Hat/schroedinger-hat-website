<script setup lang="ts">
const props = defineProps<{
  showMobileMenu: boolean
  smallerThanLg: boolean
}>()

defineEmits<{
  (e: 'onCloseMenu'): void
}>()

const links = [
  {
    id: 'Team',
    test: 'team-link',
    text: 'navbar.team',
    to: 'Team',
  },
  {
    id: 'Events',
    test: 'events-link',
    text: 'navbar.events',
    to: 'EventList',
  },
  {
    id: 'CodeOfConduct',
    test: 'conduct-link',
    text: 'navbar.codeOfConduct',
    to: 'CodeOfConduct',
  },
  {
    href: 'https://github.com/Schrodinger-Hat',
    id: 'Github',
    test: 'github-link',
    text: 'GitHub',
  },
  {
    href: 'https://ign.schrodinger-hat.it',
    id: 'IGN',
    test: 'ign-link',
    text: 'ImageGoNord',
  },
]
</script>

<template>
  <transition name="slide">
    <div
      v-if="props.showMobileMenu && props.smallerThanLg"
      class="menu w-full h-[calc(100vh)] fixed left-0 z-1"
    >
      <div class="flex justify-between items-center p-4">
        <RouterLink
          data-test="mobile-homepage-link"
          :to="{ name: 'Home' }"
          @click="$emit('onCloseMenu')"
        >
          <img alt="SH logo" width="36" src="@/assets/sh-logo-small.png">
        </RouterLink>
        <button
          class="my-2 border-none rounded-1 cursor-pointer"
          data-test="mobile-burger-menu-cta"
          @click="$emit('onCloseMenu')"
        >
          <i class="fas fa-hamburger" />
        </button>
      </div>
      <nav class="text-center">
        <ul>
          <li
            v-for="{ href, text, to, id, test } in links"
            :key="id"
            class="py-4 text-xl"
          >
            <a
              v-if="href" :href="href"
              :data-test="`mobile-${test}`"
              @click="$emit('onCloseMenu')"
            >
              {{ text }}
            </a>
            <RouterLink v-else :to="{ name: to }">
              {{ $t(text) }}
            </RouterLink>
          </li>
        </ul>
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
