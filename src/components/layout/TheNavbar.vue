<!-- TODO Add typescript and handle new types -->
<!-- TODO Install VueUse and set the dark mode -->
<script setup lang='ts'>
import { computed } from 'vue'
import { useDark, useToggle } from '@vueuse/core'
import MobileMenu from '@/components/layout/MobileMenu.vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const themeIcon = computed(() => {
  return isDark.value ? 'fa-sun' : 'fa-moon'
})

// onMounted(() => {
//   if (localStorage.getItem('darkMode') === 'yes')
//     document.querySelector('.dark-mode-icon').parentNode.click()
// })
//
// const toggleMobileMenu = (event) => {
//   event.preventDefault()
//   document.querySelector('.mobile-menu-container').classList.toggle('loaded')
//   document.body.classList.toggle('overflow-hidden')
// }
//
// const toggleDarkMode = () => {
//   event.preventDefault()
//   document.body.parentNode.classList.toggle('dark-theme')
//   let iconElement = event.target
//   iconElement = iconElement.tagName === 'A' ? iconElement.children[0] : iconElement
//
//   let darkModeValue = 'yes'
//   darkModeValue
//     = localStorage.getItem('darkMode') === 'yes' && iconElement.className.includes('fa-sun')
//       ? 'no'
//       : 'yes'
//
//   iconElement.classList.toggle('fa-moon')
//   iconElement.classList.toggle('fa-sun')
//
//   localStorage.setItem('darkMode', darkModeValue)
// }
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
          <router-link to="/team">
            {{ $t('message.navbar.team') }}
          </router-link>
          <router-link to="/events">
            {{ $t('message.navbar.events') }}
          </router-link>
          <router-link to="/code-of-conduct">
            {{ $t('message.navbar.codeofconduct') }}
          </router-link>
          <a id="gonord" href="https://ign.schrodinger-hat.it" target="_blank"> ImageGoNord </a>
          <a href="https://github.com/Schrodinger-Hat" target="_blank">
            <i class="mobile-menu-icon fab fa-github" />
          </a>
          <a class="hamburger-none-md" href="#" @click="toggleMobileMenu">
            <i class="mobile-menu-icon fas fa-hamburger" />
          </a>
          <button @click="toggleDark()">
            <i class="fas" :class="themeIcon" />
          </button>
        </div>
      </nav>
    </div>
    <MobileMenu />
  </header>
</template>

<!-- La navbar potrebbe essere un componente a sè, per maggior leggibilità -->
<!-- Il logo potrebbe essere un componente a sè -->
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

        a{
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
          a,button {
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
