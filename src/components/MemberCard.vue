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
    class="overflow-hidden rounded-5px bg-#d8dee9 dark:bg-#3b4252 p-32px font-sans"
    data-test="team-card"
    :data-test-member-name="`team-member-${member}`"
  >
    <div class="relative z-0 flex h-auto items-center justify-center rounded-full mx-2em my-auto text-center">
      <div
        :data-test="`team-member-${member}-index-photo`"
        class="block w-128px h-128px rounded-full bg-center bg-cover"
        :style="`background-image: url( ${$t(`team.${member}.image`)} );`"
      />
    </div>
    <div class="relative z-1 flex flex-col items-center justify-center gap-4px">
      <h2
        class="text-1.5rem font-700"
        :data-test="`team-member-${member}-name`"
      >
        {{ $t(`team.${member}.name`) }}
      </h2>

      <SocialIcons :member="member" :socials="socials" />

      <router-link
        class="w-fit px-15px py-5px border-1px border-solid border-transparent rounded-full bg-#586379 text-#fff text-1rem font-700 hover:bg-#2e3440"
        :data-test="`team-member-${member}-page-link`"
        :to="{ name: 'TeamMember', params: { member } }"
      >
        {{ t('redirect.profile') }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
