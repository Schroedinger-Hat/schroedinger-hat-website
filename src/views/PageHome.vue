<script setup lang="ts">
import { useHead } from '@unhead/vue'
import { useI18n } from 'vue-i18n'
import CtaComponent from '@/components/buttons/CtaComponent.vue'
import { getAssetURL } from '@/utils/getAssetURL'

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

const { t } = useI18n()

useHead({ titleTemplate: null, title: t('head.home.title') })
</script>

<template>
  <main class="flex flex-col-reverse justify-center items-center px-6 pt-0 mx-auto lg:flex-row lg:px-16">
    <div class="max-w-144 mr-0 text-center lg:text-left lg:mr-24">
      <h1 class="head-1 font-bold leading-none" tabindex="0">
        {{ $t('main.h1') }}
      </h1>
      <p class="head-1" tabindex="0">
        {{ $t('main.h2') }}
      </p>
      <div class="w-full pt-6 space-x-2">
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
    <img
      :src="getAssetURL('images/sh-logo-big.png')"
      alt="Schrödinger Hat Logo"
      class="mb-12 w-60 h-60 lg:w-80 lg:h-80 lg:mb-0"
    >
  </main>
</template>
