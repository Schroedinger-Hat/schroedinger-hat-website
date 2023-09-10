<script setup lang="ts">
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import SVGLogo from '@/components/SVGLogo.vue'

const links = [
  {
    href: 'https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P',
    id: 'Spotify',
    test: 'cta-spotify',
    text: 'Spotify',
  },
  {
    href: 'https://opencollective.com/schrodinger-hat',
    id: 'OpenCollective',
    test: 'cta-open-collective',
    text: 'OpenCollective',
  },
  {
    href: 'https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA',
    id: 'Youtube',
    test: 'cta-youtube',
    text: 'YouTube',
  },
]
</script>

<template>
  <main class="flex flex-col justify-center items-center p-16 mx-auto md:flex-row">
    <div class="max-w-144 mr-24">
      <h1 class="head-1 font-bold leading-none">
        {{ $t('main.h1') }}
      </h1>
      <p class="head-1">
        {{ $t('main.h2') }}
      </p>
      <div class="mt-4 w-full space-x-2">
        <CtaComponent
          v-for="{ href, id, test, text } in links"
          :key="id"
          :href="href"
          :data-test="`cta-${test}`"
          class="cta py-3 px-6 rounded-1 dark:border-none"
          target="_blank"
        >
          {{ text }}
        </CtaComponent>
      </div>
    </div>
    <SVGLogo class="w-60 h-60" />
  </main>
</template>
