<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '@/i18n/messages'
const team = Object.keys(messages.it.team)

const { t } = useI18n()
</script>

<template>
  <div class="teamList" data-test="team-list">
    <div class="container">
      <div class="headline">
        <h1>Schrödinger Hat's fam</h1>
      </div>
      <!-- change - text moved out of grid el -->
      <div class="content">
        <div class="headline">
          <h1 data-test="team-list-header">
            Schrödinger Hat's fam
          </h1>
        </div>
        <div v-for="member in team" :key="member" data-test="team-list">
          <!-- TODO: Transform this into a component -->
          <div
            class="blog-card"
            data-test="team-card"
            :data-test-member-name="`team-member-${member}`"
          >
            <div class="meta">
              <div
                :data-test="`team-member-${member}-index-photo`"
                class="photo"
                :style="`background-image: url( ${$t(`team.${member}.image`)} );`"
              />
            </div>
            <div class="description">
              <h1
                :data-test="`team-member-${member}-name`"
              >
                {{ $t(`team.${member}.name`) }}
              </h1>
              <div class="socialIcons">
                <a
                  v-if="$t(`team.${member}.github_url`).length > 1"
                  :data-test="`team-member-${member}-github`"
                  :href="$t(`team.${member}.github_url`)" target="_blank"
                >
                  <i class="mobile-menu-icon fab fa-github" />
                </a>
                <a
                  v-if="$t(`team.${member}.linkedin_url`).length > 1"
                  :data-test="`team-member-${member}-linkedin`"
                  :href="$t(`team.${member}.linkedin_url`)" target="_blank"
                >
                  <i class="mobile-menu-icon fab fa-linkedin" />
                </a>
                <a
                  v-if="$t(`team.${member}.twitter_url`).length > 1"
                  :data-test="`team-member-${member}-twitter`"
                  :href="$t(`team.${member}.twitter_url`)" target="_blank"
                >
                  <i class="mobile-menu-icon fab fa-twitter" />
                </a>
                <a

                  v-if="$t(`team.${member}.website`).length > 1"
                  :data-test="`team-member-${member}-website`"
                  :href="$t(`team.${member}.website`)" target="_blank"
                >
                  <i class="mobile-menu-icon fa fa-cloud" />
                </a>
              </div>

              <router-link
                :data-test="`team-member-${member}-page-link`"
                :to="{ name: 'TeamMember', params: { member } }"
              >
                <p
                  data-test="team-member-redirection"
                  class="user-profile-link"
                >
                  {{ t('redirect.profile') }}
                </p>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;

.teamList {
  .headline { //change - text moved out of grid and centered
    margin: auto;
    max-width: 700px;
    text-align: center; 
  }
  .content {
    padding: 1.5em 3em;

    //change - grid
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }


  .blog-card {
    // display: flex;
    // flex-direction: column;
    //change - to delete, all el in card on y-axis
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
    margin-bottom: 1.6%;
    background-image: $color_white;
    line-height: 1.4;
    font-family: sans-serif;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;
    a,
    li {
      color: $color_white;
    }
    .meta {
      position: relative;
      z-index: 0;
      height: auto;
      border-radius: 100%;
      text-align: center;
      margin: 2em auto 0;

      //change - center photo into card
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .photo {
      border-radius: 100%;
      width: 128px; //change - increase dimension
      height: 128px; //change - increase dimension
      display: block;
      background-size: cover;
      background-position: center;
    }

    .photo-secondary {
      border-radius: 100%;
      width: 128px; //change - increase dimension
      height: 128px; //change - increase dimension
      display: none;
      background-size: cover;
      background-position: center;
    }

    .socialIcons {
      padding: 1em; //a little increase

      a {
        display: inline-block;
        margin: 0.2em;

        //change - add hover effect on social icons
        .mobile-menu-icon {
          font-size: 1.2em; //a little increase
        }
        
        &:hover .mobile-menu-icon {
          color: #2e3440; //to save into variable
        }
      }
    }

    .description {
      padding: 2rem;
      position: relative;
      z-index: 1;

      //change
      text-align: center;

      h1,
      h2,
      p {
        font-family: Poppins, sans-serif;
      }
      h1 {
        line-height: 1;
        margin: 0;
        font-size: 1.7rem;
      }
      h2 {
        font-size: 1rem;
        font-weight: 300;
        margin-top: 5px;
      }
      .user-profile-link { //change - new colors TDB for palette
        font-weight: bold;
        border: 1px solid transparent;
        background-color: #586379;
        color: #fff;
        width: fit-content;
        margin: 0 auto;
        padding: 5px 15px;
        border-radius: 999px;

        &:hover {
          background-color: #2e3440;
        }
      }
    }
    p {
      position: relative;
      margin: 1rem 0 0;
      &:first-of-type {
        margin-top: 1.25rem;
      }
    }

  }
}

//change - responsove design added for tablet (ts-md)
@media (min-width: 640px) {

  .teamList{
    .content {
      grid-template-columns: repeat(2, 1fr);
    }

  }
}

//change - responsove design added for tablet (ts-lg)
@media (min-width: 1024px) {
  .teamList{
    .content {
      grid-template-columns: repeat(3, 1fr);
    }
  
  }

}


.#{$dark-mode-class} {
  .blog-card {
    background: $nord2;
    color: $color_white;
    .description {
      background: $nord2;
      h1,
      .p a {
        color: $nord4;
        color: $color_white;
      }
      &:before {
        background: $nord2;
      }

      .user-profile-link { //change - add colors for dark mode
        background-color: #2e3440;

        &:hover {
          background-color: #586379;
        }
      }
    }
  }
}
</style>
