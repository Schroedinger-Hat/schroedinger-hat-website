<script setup lang="ts">
import TheMain from '@/components/TheMain.vue'

const links = [
  {
    href: 'https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P',
    test: 'cta-spotify',
    text: 'Spotify',
  },
  {
    href: 'https://opencollective.com/schrodinger-hat',
    test: 'cta-open-collective',
    text: 'OpenCollective',
  },
  {
    href: 'https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA',
    test: 'cta-youtube',
    text: 'YouTube',
  },
]
</script>

<template>
  <main class="container">
    <TheMain />
  </main>
</template>

<style scoped lang="scss">
.#{$dark-mode-class} {
  .demo-section {
    background: $nord2;
  }
}
</style>
