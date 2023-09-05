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
    <div class="container">
      <div class="content flex flex-col justify-center items-center">
        <h1 data-test="member-page-name" class="head-1">
          {{ $t(`team.${member}.name`) }}
        </h1>
        <div>
          <div
            class="photo"
            :style="`background-image: url(${$t(`team.${member}.image`)});`"
            data-test="member-page-photo"
          />
        </div>

        <!-- component that render socials (done) -->
        <SocialIcons :member="member" :socials="socials" />

        <p
          class="description !p-2"
          data-test="member-page-description"
          v-html="$t(`team.${member}.description`)"
        />

        <router-link
          class="user-profile-link"
          :to="{ name: 'Team' }" data-test="nav-team-page-link"
        >
          {{ t('redirect.back') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo {
  display: inline-block;
  width: 128px;
  height: 128px;
  border-radius: 100%;
  background-position: center;
  background-size: cover;
  text-align: center;
}

.team {
  .content {
    max-width: 700px;
    padding: 1.5em 3em;
    margin: auto;
    text-align: center;
  }
}

.description {
  padding: 1em 0;
  margin-bottom: 20px;
}

.user-profile-link {
  padding: 5px 15px;
  border: 1px solid transparent;
  border-radius: 999px;
  margin: 0 auto;
  background-color: #586379;
  color: #fff;
  font-weight: bold;

  &:hover {
    background-color: #2e3440;
  }
}

@media (width >= 56.25em) {
  .event {
    .cta {
      display: block;

      .btn {
        margin: 0 5px;

        &:nth-of-type(1) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
