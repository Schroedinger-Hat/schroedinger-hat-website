<script setup lang='ts'>
import { computed, watch } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import LogoAnimated from '@/components/buttons/LogoAnimated.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import { useGlobalScrollLock } from '@/functions/useGlobalScrollLock'
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
    href: undefined,
    id: 'Team',
    to: 'Team',
    test: 'team-page-link',
    text: 'navbar.team',
    ariaText: 'navbar.team',
  },
  {
    href: undefined,
    id: 'Events',
    to: 'Events',
    test: 'event-page-link',
    text: 'navbar.events',
    ariaText: 'navbar.events',
  },
  {
    href: undefined,
    id: 'CodeOfConduct',
    test: 'code-page-link',
    text: 'navbar.codeOfConduct',
    to: 'CodeOfConduct',
    ariaText: 'navbar.codeOfConduct',
  },
  {
    href: 'https://ign.schroedinger-hat.org',
    id: 'IGN',
    target: '_blank',
    test: 'IGN-link',
    text: 'navbar.imageGoNord',
    ariaText: 'navbar.imageGoNord',
  },
  {
    href: 'https://shop.schroedinger-hat.org/?utm_source=sh-website&utm_medium=navbar&utm_campaign=sh-website-cp',
    target: '_blank',
    test: 'shop-link',
    text: 'navbar.shop',
    ariaText: 'navbar.shop',
  },
]

const ghCTA = {
  href: 'https://github.com/schroedinger-Hat',
  icon: 'logo-github',
  id: 'GitHub',
  test: 'github-cta',
  text: 'navbar.gitHub',
  ariaText: 'navbar.gitHub',
}

const [showMenu, toggleMenu] = useToggle()
const scrollLock = useGlobalScrollLock()
const isDark = useDark()
const mobileLinks: Link[] = [ghCTA, ...links]
const toggleDark = useToggle(isDark)

const themeIcon = computed(() => isDark.value ? 'sun' : 'moon')

watch(showMenu, value => (value ? scrollLock.value = true : scrollLock.value = false))
</script>

<template>
  <header class="inline-flex w-full h-15 m-auto py-4 px-2 sticky top-0 z-2 backdrop-blur border-b border-b-slate-300 lg:px-4 dark:border-slate-50/[0.06]" :class="{ 'active-menu': showMenu }">
    <div class="flex justify-between items-center w-full mx-auto px-4 md:px-0" data-test="nav-wrapper">
      <LogoAnimated />
      <nav class="flex">
        <CtaComponent
          v-for="{ id, href, to, text, test, target, ariaText } in links"
          :key="id"
          :aria-text="$t(ariaText as string)"
          :data-test="`data-${test}`"
          :to="to ? { name: to } : null"
          :href="href"
          :target="target ? target : null"
          class="hidden md:inline-flex mx-0.5 text-xl"
          secondary
        >
          <span>{{ $t(text as string) }}</span>
        </CtaComponent>
        <CtaIcon
          :aria-label="$t(ghCTA.ariaText as string)"
          :data-test="ghCTA.test"
          :href="ghCTA.href"
          :icon="ghCTA.icon"
          target="_blank"
        />
        <CtaIcon
          :aria-label="$t('accessibility.navbar.openMenu' as string)"
          md:hidden
          data-test="nav-burger-menu-cta"
          icon="menu"
          @click="toggleMenu()"
        />
        <CtaIcon
          :aria-label="$t('accessibility.navbar.toggleIcon' as string)"
          :icon="themeIcon"
          data-test="nav-theme-icon"
          @click="toggleDark()"
        />
      </nav>
    </div>
    <MobileMenu
      w-full h-100dvh position="absolute top-15 left-0" overflow-auto text-center
      :links="mobileLinks"
      :show="showMenu"
      data-test="mobile-menu"
      @close="toggleMenu()"
    />
  </header>
</template>

<style scoped lang="scss">
header {
 background: $bg-primary-reduced;

 &.active-menu {
  background: $bg-primary;
 }
}

.#{$dark-mode-class} {
  header {
    background: $dark-bg-primary-reduced;

    &.active-menu {
      background: $dark-bg-primary;
    }
  }}
</style>
