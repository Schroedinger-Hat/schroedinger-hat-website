<script setup lang="ts">
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import AnimatedSVG from '@/components/AnimatedSVG.vue'

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
  <main class="flex justify-center items-center w-[80%] mx-auto">
    <AnimatedSVG />
    <div class="ml-5">
      <h1 class="head-1 font-bold">
        {{ $t('main.h1') }}
      </h1>
      <p class="head-6">
        {{ $t('main.h2') }}
      </p>
      <div>
        <CtaComponent
          v-for="{ href, id, test, text } in links"
          :key="id"
          :href="href"
          :data-test="`cta-${test}`"
          class="btn btn-primary"
          target="_blank"
        >
          {{ text }}
        </CtaComponent>
      </div>
    </div>
  </main>
</template>
