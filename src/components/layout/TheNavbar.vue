<script setup lang='ts'>
import { computed } from 'vue'
import { breakpointsTailwind, useBreakpoints, useDark, useToggle } from '@vueuse/core'
import LogoAnimated from '@/components/buttons/LogoAnimated.vue'
import MobileMenu from '@/components/layout/MobileMenu.vue'
import CtaComponent from '@/components/buttons/CtaComponent.vue'

// TODO: Move this data to an outer file
// TODO We could create a component called CtaIcon based of CtaComponent

const links = {
  router: [
    {
      name: 'Team',
      test: 'nav-team-page-link',
      text: 'navbar.team',
    },
    {
      name: 'EventList',
      test: 'nav-team-page-link',
      text: 'navbar.events',
    },
    {
      name: 'CodeOfConduct',
      test: 'nav-team-page-link',
      text: 'navbar.codeOfConduct',
    },
  ],
}

const [showMobileMenu, toggleMobileMenu] = useToggle()
const breakpoints = useBreakpoints(breakpointsTailwind)
const isDark = useDark()
const smallerThanLg = breakpoints.smaller('lg')
const toggleDark = useToggle(isDark)

const themeIcon = computed(() => {
  return isDark.value ? 'fa-sun' : 'fa-moon'
})
</script>

<template>
  <header class="container">
    <div class="inner-header-container" data-test="nav-wrapper">
      <LogoAnimated />
      <nav>
        <div class="navbar" data-test="nav-link-wrapper">
          <CtaComponent
            v-for="{ test, text, name } in links.router"
            :key="text"
            :to="{ name }"
            :data-test="test"
          >
            {{ $t(text) }}
          </CtaComponent>
          <a
            id="gonord" href="https://ign.schrodinger-hat.it" target="_blank"
            data-test="nav-go-nord-page-link"
          >
            ImageGoNord
          </a>
          <a href="https://github.com/Schrodinger-Hat" target="_blank" data-test="nav-github-page-link">
            <i class="fab fa-github" data-test="nav-github-icon" />
          </a>
          <button class="hamburger-none-md" data-test="nav-burger-menu-cta" @click="toggleMobileMenu()">
            <i class="fas fa-hamburger" data-test="nav-hamburget-icon" />
          </button>
          <button data-test="nav-theme-cta" @click="toggleDark()">
            <i class="fas" :class="themeIcon" data-test="nav-theme-icon" />
          </button>
        </div>
      </nav>
    </div>
    <MobileMenu
      data-test="mobile-menu"
      :show-mobile-menu="showMobileMenu"
      :smaller-than-lg="smallerThanLg"
      @on-close-menu="toggleMobileMenu()"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  position: relative;
  z-index: $z-header;
  display: flex;
  height: 5em;
  padding: 0 !important;
  margin: auto;
  text-align: left;

  .inner-header-container {
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5em;
    margin: 0 auto;
    -webkit-box-align: center;
    -webkit-box-pack: justify;

    nav {
      display: flex;

      .navbar {
        justify-content: space-between;
        -webkit-box-pack: justify;
        list-style: none;

        a {
          border-radius: 0.25em;
          margin: 0 0.4em;
          cursor: pointer;
          font-size: 1.2em;
          transition: background-color 100ms ease-in-out 0s;

          &:nth-child(-n + 3) {
            display: none;
          }

          &:hover {
            background-color: $bg-secondary;
          }
        }

        button {
          border: none;
          border-radius: 0.25em;
          margin: 0 0.4em;
          background-color: transparent;
          cursor: pointer;
          font-size: 1.2em;
          transition: background-color 100ms ease-in-out 0s;

          &:nth-child(-n + 3) {
            display: none;
          }

          &:hover {
            background-color: $bg-secondary;
          }
        }
      }
    }
  }
}

@media (width >= 56.25em) {
  header {
    .inner-header-container {
      padding: 0;

      .logo {
        span {
          font-size: 2em;
        }
      }

      nav {
        .navbar {
          .hamburger-none-md {
            display: none;
          }

          a {
            &:nth-child(-n + 3) {
              display: inline;
            }
          }
        }
      }
    }
  }
}

@media (width <= 900px) {
  .logo span {
    pointer-events: none;
  }

  #gonord {
    display: none;
  }
}

.#{$dark-mode-class} {
  header {
    .inner-header-container {
      nav {
        .navbar {
          a,
          button {
            &:hover {
              background-color: $dark-bg-secondary;
            }
          }
        }
      }
    }
  }
}
</style>
