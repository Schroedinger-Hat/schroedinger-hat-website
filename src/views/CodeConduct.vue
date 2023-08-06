<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import * as messages from '../i18n/messages'
import type { LanguageCodes } from '@/i18n/types'

const { locale } = useI18n()

const codeOfConduct = messages.default[locale.value as LanguageCodes].code_of_conduct
</script>

<template>
  <main class="container">
    <div class="py-6 px-12">
      <h1 class="head-1">
        Code of conduct
      </h1>
      <article v-for="{ title, copy } in codeOfConduct" :key="title" class="mt-5">
        <h2 class="head-4 mb-1">
          {{ title }}
        </h2>
        <p>{{ copy }}</p>
      </article>
    </div>
  </main>
</template>
