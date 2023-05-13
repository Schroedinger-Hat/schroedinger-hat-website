<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '@/i18n/messages'
const team = Object.keys(messages.it.team)

const { t } = useI18n()
</script>

<template>
  <div class="teamList" data-test="team-list">
    <div class="container">
      <div class="headline" data-test="team-page-headline">
        <h1>Schrödinger Hat's fam</h1>
      </div>

      <div class="content">

          <div v-for="member in team" :key="member" data-test="team-list">
            <router-link 
              :data-test="`team-member-${member}-page-link`"
              :to="{ name: 'TeamMember', params: { member } }"
            >
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
                  <h2
                    :data-test="`team-member-${member}-name`"
                  >
                    {{ $t(`team.${member}.name`) }}
                  </h2>
                  <div class="socialIcons">
                    <a
                      v-if="$t(`team.${member}.github_url`).length > 1"
                      :data-test="`team-member-${member}-github`"
                      :href="$t(`team.${member}.github_url`)" target="_blank"
                      @click.stop
                    >
                      <i class="mobile-menu-icon fab fa-github" />
                    </a>
                    <a
                      v-if="$t(`team.${member}.linkedin_url`).length > 1"
                      :data-test="`team-member-${member}-linkedin`"
                      :href="$t(`team.${member}.linkedin_url`)" target="_blank"
                      @click.stop
                    >
                      <i class="mobile-menu-icon fab fa-linkedin" />
                    </a>
                    <a
                      v-if="$t(`team.${member}.twitter_url`).length > 1"
                      :data-test="`team-member-${member}-twitter`"
                      :href="$t(`team.${member}.twitter_url`)" target="_blank"
                      @click.stop
                    >
                      <i class="mobile-menu-icon fab fa-twitter" />
                    </a>
                    <a
                      v-if="$t(`team.${member}.website`).length > 1"
                      :data-test="`team-member-${member}-website`"
                      :href="$t(`team.${member}.website`)" target="_blank"
                      @click.stop
                    >
                      <i class="mobile-menu-icon fa fa-cloud" />
                    </a>
                  </div>
    
                  <router-link class="user-profile-link"
                    :data-test="`team-member-${member}-page-link`"
                    :to="{ name: 'TeamMember', params: { member } }"
                  >
                    {{ t('redirect.profile') }}
                  </router-link>
                </div>
              </div>
            </router-link>

          </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
// to-do: standardize color variables
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;

.teamList {
  .headline { 
    margin: auto;
    max-width: 700px;
    text-align: center; 

    h1 {
      font-size: 2rem;
      font-weight: 700;
    }
  }
  .content {
    padding: 1.5em 3em;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 20px;
  }


  .blog-card {
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
    margin-bottom: 1.6%;
    background-image: $color_white;
    background-color: #d8dee9; //brand color, pick from light-v waves
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
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .photo {
      border-radius: 100%;
      width: 128px; 
      height: 128px; 
      display: block;
      background-size: cover;
      background-position: center;
    }

    .photo-secondary {
      border-radius: 100%;
      width: 128px; 
      height: 128px; 
      display: none;
      background-size: cover;
      background-position: center;
    }
    
    .description {
      padding: 2rem;
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      .socialIcons {
        padding: 0.5em 0 1em;
        width: fit-content;
  
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

      h2,
      p {
        font-family: Poppins, sans-serif;
      }
      h2 {
        font-size: 1.75rem;
        font-weight: 700;
        margin: 5px 0;
      }
      .user-profile-link { 
        font-size: 1rem;
        font-weight: 700;
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
  }
}

// to-do: standardize media querys
@media (min-width: 640px) {
  .teamList{
    .content {
      grid-template-columns: repeat(2, 1fr);
    }

  }
}

@media (min-width: 1024px) {
  .teamList{
    .content {
      grid-template-columns: repeat(3, 1fr);
    }
  
  }

}

.#{$dark-mode-class}{
  .blog-card {
    background-color: $nord2;
  }

}
</style>
