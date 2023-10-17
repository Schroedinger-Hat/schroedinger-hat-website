<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'
import type { RouteParamValue } from 'vue-router'
import { useRoute } from 'vue-router'
import { useHead } from '@unhead/vue'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const member: Ref<null | string> = ref(null)
const route = useRoute()

const getTeamMemberName = () => {
  if (!route.params.member)
    getTeamMemberName()

  else
    member.value = route.params.member as RouteParamValue
}

onMounted(getTeamMemberName)

useHead({
  title: () => member.value ? t(`team.${member.value}.name`) : t('head.team.fallback.member'),
})
</script>

<template>
  <!-- TODO: Add loader -->
  <span v-if="!member">Loading...</span>
  <div v-else class="team">
    <div class="container">
      <div class="content">
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
        <div class="socialIcons !p-2">
          <a
            v-if="$t(`team.${member}.github_url`).length > 1"
            :href="$t(`team.${member}.github_url`)" target="_blank"
            data-test="member-page-github"
            :aria-label="`github page of ${member}`"
          >
            <i class="mobile-menu-icon fab fa-github" />
          </a>
          <a
            v-if="$t(`team.${member}.linkedin_url`).length > 1"
            :href="$t(`team.${member}.linkedin_url`)" target="_blank"
            data-test="member-page-linkedin" :aria-label="`linkedin page of ${member}`"
          >
            <i class="mobile-menu-icon fab fa-linkedin" />
          </a>
          <a
            v-if="$t(`team.${member}.twitter_url`).length > 1"
            :href="$t(`team.${member}.twitter_url`)" target="_blank"
            data-test="member-page-twitter" :aria-label="`twitter page of ${member}`"
          >
            <i class="mobile-menu-icon fab fa-twitter" />
          </a>
          <a
            v-if="$t(`team.${member}.website`).length > 1"
            :href="$t(`team.${member}.website`)" target="_blank"
            data-test="member-page-website" :aria-label="`website of ${member}`"
          >
            <i class="mobile-menu-icon fa fa-cloud" />
          </a>
        </div>

        <!-- TODO: Make this a proper <p> -->
        <div
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

.socialIcons {
  padding: 1em;

  a {
    display: inline-block;
    margin: 0.2em;

    .mobile-menu-icon {
      font-size: 1.2em;
    }

    &:hover .mobile-menu-icon {
      color: #2e3440;
    }
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

.#{$dark-mode-class} {
  .socialIcons {
    a {
      &:hover .mobile-menu-icon {
        color: #586379;
      }

    }
  }
}
</style>
