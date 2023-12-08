<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useHead } from '@unhead/vue'
import * as messages from '../i18n/messages'
import type { LanguageCodes } from '@/i18n/types'

const { locale, t } = useI18n()

const codeOfConduct = messages.default[locale.value as LanguageCodes].code_of_conduct

useHead({
  title: t('head.codeOfConduct.title'),
  meta: [{ name: t('head.codeOfConduct.meta.name'), content: t('head.codeOfConduct.meta.content') }],
})
</script>

<template>
  <main class="container">
    <div class="py-6 px-12">
      <h1 class="head-1" tabindex="0">
        Code of conduct
      </h1>
      <article v-for="{ title, copy } in codeOfConduct" :key="title" class="mt-5">
        <h2 class="head-4 mb-1" tabindex="0">
          {{ title }}
        </h2>
        <p tabindex="0">
          {{ copy }}
        </p>
      </article>
    </div>
  </main>
</template>
