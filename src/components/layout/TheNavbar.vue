<script setup lang='ts'>
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import LogoAnimated from '@/components/buttons/LogoAnimated.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import CtaIcon from '@/components/buttons/CtaIcon.vue'

interface Link {
  id: string
  to?: string
  test?: string
  text?: string
  href?: string
  target?: string
  icon?: string
}

const links = [
  {
    id: 'Team',
    to: 'Team',
    test: 'team-page-link',
    text: 'navbar.team',
  },
  {
    id: 'Events',
    to: 'EventList',
    test: 'event-page-link',
    text: 'navbar.events',
  },
  {
    id: 'CodeOfConduct',
    test: 'code-page-link',
    text: 'navbar.codeOfConduct',
    to: 'CodeOfConduct',
  },
  {
    href: 'https://ign.schrodinger-hat.it',
    id: 'IGN',
    target: '_blank',
    test: 'IGN-link',
    text: 'ImageGoNord',
  },
]

const ghCTA = {
  href: 'https://github.com/Schrodinger-Hat',
  icon: 'fab fa-github',
  id: 'GitHub',
  test: 'github-cta',
  text: 'GitHub',
}

const [showMenu, toggleMenu] = useToggle()
const isDark = useDark()
const toggleDark = useToggle(isDark)

const themeIcon = computed(() => isDark.value ? 'fa-sun' : 'fa-moon')
const mobileLinks: Link[] = [ghCTA, ...links]
</script>

<template>
  <header class="container flex h-20 m-auto p-none z-2">
    <div class="inner-header-container flex justify-between items-center w-full mx-auto px-4 md:px-0" data-test="nav-wrapper">
      <LogoAnimated />
      <nav class="flex">
        <CtaComponent
          v-for="{ id, href, to, text, test, target } in links"
          :key="id"
          :data-test="`data-${test}`"
          :to="to ? { name: to } : null"
          :href="href"
          :target="target ? target : null"
          class="hidden mx-1 p-1 rounded-1 cursor-pointer text-xl md:inline"
        >
          <span>{{ $t(text as string) }}</span>
        </CtaComponent>
        <CtaIcon
          :data-test="ghCTA.test"
          :href="ghCTA.href"
          :icon="ghCTA.icon"
          target="_blank"
        />
        <CtaIcon
          class="md:hidden"
          data-test="nav-burger-menu-cta"
          icon="fas fa-hamburger"
          @click="toggleMenu()"
        />
        <CtaIcon
          :icon="`fas ${themeIcon}`"
          data-test="nav-theme-icon"
          @click="toggleDark()"
        />
      </nav>
    </div>
    <MobileMenu
      :links="mobileLinks"
      :show="showMenu"
      data-test="mobile-menu"
      @close="toggleMenu()"
    />
  </header>
</template>

<style scoped lang="scss">
a:not(.logo),
button {
  transition: background-color 0.1s ease-in-out;

  &:hover {
    background-color: $bg-secondary;
  }
}

.#{$dark-mode-class} {
  a:not(.logo),
  button {
    &:hover {
      background-color: $dark-bg-secondary;
    }
  }
}
</style>
