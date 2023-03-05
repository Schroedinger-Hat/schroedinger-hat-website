<script setup lang='ts'>
import { computed } from 'vue'
import { breakpointsTailwind, useBreakpoints, useDark, useToggle } from '@vueuse/core'
import MobileMenu from '@/components/layout/MobileMenu.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)
const breakpoints = useBreakpoints(breakpointsTailwind)
const smallerThanLg = breakpoints.smaller('lg')

const themeIcon = computed(() => {
  return isDark.value ? 'fa-sun' : 'fa-moon'
})

const [showMobileMenu, toggleMobileMenu] = useToggle()
</script>

<template>
  <header class="container">
    <div class="inner-header-container">
      <div class="logo">
        <router-link to="/">
          <img alt="SH logo" width="36" src="../../assets/logo-64.png">
          <span>S<i class="title-part-1">chrödinger</i> H<i class="title-part-2">at</i></span>
        </router-link>
      </div>
      <nav>
        <div class="navbar">
          <router-link :to="{ name: 'Team' }">
            {{ $t('navbar.team') }}
          </router-link>
          <router-link :to="{ name: 'EventList' }">
            {{ $t('navbar.events') }}
          </router-link>
          <router-link :to="{ name: 'CodeOfConduct' }">
            {{ $t('navbar.codeOfConduct') }}
          </router-link>
          <a id="gonord" href="https://ign.schrodinger-hat.it" target="_blank"> ImageGoNord </a>
          <a href="https://github.com/Schrodinger-Hat" target="_blank">
            <i class="fab fa-github" />
          </a>
          <button class="hamburger-none-md" @click="toggleMobileMenu()">
            <i class="fas fa-hamburger" />
          </button>
          <button @click="toggleDark()">
            <i class="fas" :class="themeIcon" />
          </button>
        </div>
      </nav>
    </div>
    <MobileMenu
      :show-mobile-menu="showMobileMenu"
      :smaller-than-lg="smallerThanLg"
      @on-close-menu="toggleMobileMenu()"
    />
  </header>
</template>

<style scoped lang="scss">
header {
  margin: auto;
  text-align: left;
  height: 5em;
  position: relative;
  z-index: $z-header;
  display: flex;
  padding: 0 !important;

  .inner-header-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    margin: 0px auto;
    padding: 0 0.5em;

    .logo {
      display: flex;
      -webkit-box-align: center;
      align-items: center;

      span {
        font-size: 1.8em;
        font-weight: 600;
        margin-left: 0.5em;
        vertical-align: super;
        transition: opacity 200ms ease-in-out 0s;

        i {
          position: absolute;
          z-index: -1;
          opacity: 0;
          transition: all 300ms ease-in-out 0s;
        }

        .title-part-1 {
          margin-left: -90px;
        }

        .title-part-2 {
          margin-left: 90px;
        }

        &:hover {
          i {
            position: relative;
            z-index: 0;
            opacity: 1;
            font-style: normal;
            margin-left: 0;
            transition: all 300ms ease-in-out 0s;
          }
        }
      }
    }

    nav {
      display: flex;

      .navbar {
        list-style: none;
        -webkit-box-pack: justify;
        justify-content: space-between;

        a {
          border-radius: 0.25em;
          margin: 0 0.4em;
          transition: background-color 100ms ease-in-out 0s;
          cursor: pointer;
          font-size: 1.2em;

          &:nth-child(-n + 3) {
            display: none;
          }

          &:hover {
            background-color: $bg-secondary;
          }
        }

        button {
          border-radius: 0.25em;
          background-color: transparent;
          border: none;
          margin: 0 0.4em;
          transition: background-color 100ms ease-in-out 0s;
          cursor: pointer;
          font-size: 1.2em;

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

@media (min-width: 56.25em) {
  header {
    .inner-header-container {
      padding: 0 0;

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

@media (max-width: 900px) {
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
