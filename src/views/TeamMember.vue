<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { RouteParamValue } from 'vue-router'
import { useRoute } from 'vue-router'

const teamMember = ref('')
const route = useRoute()

const getTeamMemberName = () => {
  if (!route.params.member)
    getTeamMemberName()

  else
    teamMember.value = route.params.member as RouteParamValue
}

onMounted(() => {
  getTeamMemberName()
})
</script>

<template>
  <!-- //TODO Add loader -->
  <span v-if="!teamMember">Add loader</span>
  <div v-else class="team">
    <div class="container">
      <div class="content">
        <h1>{{ $t(`team.${teamMember}.name`) }}</h1>
        <div>
          <div
            class="photo"
            :style="`background-image: url(${$t(`team.${teamMember}.image`)});`"
          />
        </div>
        <div class="socialIcons">
          <a v-if="$t(`team.${teamMember}.github_url`).length > 1" :href="$t(`team.${teamMember}.github_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-github" />
          </a>
          <a v-if="$t(`team.${teamMember}.linkedin_url`).length > 1" :href="$t(`team.${teamMember}.linkedin_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-linkedin" />
          </a>
          <a v-if="$t(`team.${teamMember}.twitter_url`).length > 1" :href="$t(`team.${teamMember}.twitter_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-twitter" />
          </a>
          <a v-if="$t(`team.${teamMember}.website`).length > 1" :href="$t(`team.${teamMember}.website`)" target="_blank">
            <i class="mobile-menu-icon fa fa-cloud" />
          </a>
        </div>
        <div class="description" v-html="$t(`team.${teamMember}.description`)" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.photo {
  border-radius: 100%;
  width: 128px;
  height: 128px;
  text-align: center;
  display: inline-block;
  background-size: cover;
  background-position: center;
}
.team {
  .content {
    padding: 1.5em 3em;
    margin: auto;
    max-width: 700px;
    text-align: center;
  }
}

.socialIcons {
  padding: .2em 0;

  a {
    display: inline-block;
    margin: 0.2em;
  }
}

.description {
  padding: 1em 0;
}

@media (min-width: 56.25em) {
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
