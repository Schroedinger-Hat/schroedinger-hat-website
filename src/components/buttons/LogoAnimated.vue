<script setup lang="ts">
//
</script>

<template>
  <router-link
    data-test="footer-home-link"
    class="logo"
    :to="{ name: 'Home' }"
    :aria-label="$t('accessibility.navbar.logo' as string)"
    tabindex="0"
  >
    <div data-test="footer-logo" class="flex justify-center items-center">
      <img
        data-test="footer-home-link-img"
        alt="SH logo"
        width="36"
        src="@/assets/sh-logo-small.png"
      >
      <span data-test="footer-home-link-text" class="logo-text hidden lg:inline ml-2">
        S<i class="part-1">chrödinger</i> H<i class="part-2">at</i>
      </span>
    </div>
  </router-link>
</template>

<style scoped lang="scss">
.logo {
  i {
    position: absolute;
    opacity: 0;
    transition: all 0.3s ease-in-out 0s;

    &.part-1 {
      margin-left: rem(-88px);
    }

    &.part-2 {
      margin-left: rem(88px);
    }
  }

  &:hover {
    i {
      position: relative;
      margin-left: 0;
      font-style: normal;
      opacity: 1;
    }
  }
}
</style>

<style scoped lang="scss">
//
</style>
