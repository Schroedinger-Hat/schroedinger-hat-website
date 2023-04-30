<script setup lang="ts">
import { type Ref, onMounted, ref } from 'vue'
import type { RouteParamValue } from 'vue-router'
import { useRoute } from 'vue-router'

const member: Ref<null | string> = ref(null)
const route = useRoute()

const getTeamMemberName = () => {
  if (!route.params.member)
    getTeamMemberName()

  else
    member.value = route.params.member as RouteParamValue
}

onMounted(() => {
  getTeamMemberName()
})
</script>

<template>
  <!-- TODO: Add loader -->
  <span v-if="!member">Loading...</span>
  <div v-else class="team">
    <div class="container">
      <div class="content">
        <h1 data-test="member-page-name">
          {{ $t(`team.${member}.name`) }}
        </h1>
        <div>
          <div
            class="photo"
            :style="`background-image: url(${$t(`team.${member}.image`)});`"
            data-test="member-page-photo"
          />
        </div>
        <div class="socialIcons">
          <a
            v-if="$t(`team.${member}.github_url`).length > 1"
            :href="$t(`team.${member}.github_url`)" target="_blank"
            data-test="member-page-github"
          >
            <i class="mobile-menu-icon fab fa-github" />
          </a>
          <a
            v-if="$t(`team.${member}.linkedin_url`).length > 1"
            :href="$t(`team.${member}.linkedin_url`)" target="_blank"
            data-test="member-page-linkedin"
          >
            <i class="mobile-menu-icon fab fa-linkedin" />
          </a>
          <a
            v-if="$t(`team.${member}.twitter_url`).length > 1"
            :href="$t(`team.${member}.twitter_url`)" target="_blank"
            data-test="member-page-twitter"
          >
            <i class="mobile-menu-icon fab fa-twitter" />
          </a>
          <a
            v-if="$t(`team.${member}.website`).length > 1"
            :href="$t(`team.${member}.website`)" target="_blank"
            data-test="member-page-website"
          >
            <i class="mobile-menu-icon fa fa-cloud" />
          </a>
        </div>

        <!-- TODO: Make this a proper <p> -->
        <div
          class="description"
          data-test="member-page-description"
          v-html="$t(`team.${member}.description`)"
        />

        <!-- insert goBack link -->
        <router-link class="user-profile-link"
          :to="{ name: 'Team' }" data-test="nav-team-page-link"
        >
          Go back
        </router-link>

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

.socialIcons { //change - aligned to changes in team-member page
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

//add btn style 
.user-profile-link { //change - new colors TDB for palette
  font-weight: bold;
  border: 1px solid transparent;
  background-color: #586379;
  color: #fff;
  margin: 0 auto;
  padding: 5px 15px;
  border-radius: 999px;

  &:hover {
    background-color: #2e3440;
  }
}
//end btn style

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

.#{$dark-mode-class} { //change - aligned to changes in team-member page  
  .socialIcons { //change - aligned to changes in team-member page  
    a {
      &:hover .mobile-menu-icon {
        color: #586379;
      }

    }  
  }
}
</style>
