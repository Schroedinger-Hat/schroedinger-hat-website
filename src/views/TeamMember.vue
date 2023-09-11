<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'
import type { RouteParamValue } from 'vue-router'
import { useRoute } from 'vue-router'

import { useI18n } from 'vue-i18n'
import SocialIcons from '@/components/SocialIcons.vue'

const { t } = useI18n()

const member: Ref<null | string> = ref(null)
const route = useRoute()

const getTeamMemberName = () => {
  if (!route.params.member)
    getTeamMemberName()

  else
    member.value = route.params.member as RouteParamValue
}

const socials = ['github', 'linkedin', 'twitter', 'website']

onMounted(() => {
  getTeamMemberName()
})
</script>

<template>
  <span v-if="!member">Loading...</span>
  <div v-else class="team">
    <div class="container p-32px max-w-700px m-auto text-center flex flex-col justify-center items-center gap-16px">
      <h1 data-test="member-page-name" class="text-2rem font-700">
        {{ $t(`team.${member}.name`) }}
      </h1>
      <div>
        <div
          :data-test="`team-member-${member}-index-photo`"
          class="block w-128px h-128px rounded-full bg-center bg-cover"
          :style="`background-image: url( ${$t(`team.${member}.image`)} );`"
        />
      </div>

      <SocialIcons :member="member" :socials="socials" />

      <p
        class=""
        data-test="member-page-description"
        v-html="$t(`team.${member}.description`)"
      />

      <router-link
        class="w-fit px-15px py-5px border-1px border-solid border-transparent rounded-full bg-#586379 text-#fff text-1rem font-700 hover:bg-#2e3440"
        :to="{ name: 'Team' }" data-test="nav-team-page-link"
      >
        {{ t('redirect.back') }}
      </router-link>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
