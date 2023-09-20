<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import SocialIcons from './SocialIcons.vue'

defineProps<{
  member: string
}>()

const socials = ['github', 'linkedin', 'twitter', 'website']

const { t } = useI18n()
</script>

<template>
  <div
    class="overflow-hidden p-8 font-sans rounded bg-light-bg-secondary dark:bg-dark-bg-secondary"
    data-test="team-card"
    :data-test-member-name="`team-member-${member}`"
  >
    <div class="relative z-0 flex h-auto items-center justify-center rounded-full my-auto text-center">
      <div
        :data-test="`team-member-${member}-index-photo`"
        class="block w-32 h-32 rounded-full bg-center bg-cover"
        :style="`background-image: url( ${$t(`team.${member}.image`)} );`"
      />
    </div>
    <div class="relative z-1 flex flex-col items-center justify-center gap-1">
      <h2
        class="text-6 font-700 text-text-primary"
        :data-test="`team-member-${member}-name`"
      >
        {{ $t(`team.${member}.name`) }}
      </h2>

      <SocialIcons :member="member" :socials="socials" />

      <router-link
        class="font-700 w-fit px-4 py-1 border-1 border-solid border-transparent rounded-full bg-light-bg-primary text-light-text-primary dark:bg-dark-bg-primary dark:text-dark-text-primary hover:bg-dark-bg-primary hover:text-dark-text-primary dark:hover:bg-light-bg-primary dark:hover:text-light-text-primary "
        :data-test="`team-member-${member}-page-link`"
        :to="{ name: 'TeamMember', params: { member } }"
      >
        {{ t('redirect.profile') }}
      </router-link>
    </div>
  </div>
</template>
