<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import messages from '@/i18n/messages'
const team = Object.keys(messages.it.team)

const { t } = useI18n()
</script>

<template>
  <div class="teamList" data-test="team-list">
    <div class="container">
      <div class="content">
        <div class="headline">
          <h1 data-test="team-list-header">
            Schrödinger Hat's fam
          </h1>
        </div>
        <div v-for="member in team" :key="member" data-test="team-list">
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
              <p
                :data-test="`team-member-${member}-description`"
                v-html="$t(`team.${member}.description`)"
              />
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
  .content {
    padding: 1.5em 3em;
  }

  .headline {
    margin: auto;
    max-width: 700px;
  }

  .blog-card {
    display: flex;
    flex-direction: column;
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

    .socialIcons {
      padding: .2em 0;

      a {
        display: inline-block;
        margin: 0.2em;
      }
    }

    .description {
      padding: 2rem;
      position: relative;
      z-index: 1;
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
      .user-profile-link {
        font-weight: bold;
      }
    }
    p {
      position: relative;
      margin: 1rem 0 0;
      &:first-of-type {
        margin-top: 1.25rem;
      }
    }

    @media (min-width: 640px) {
      flex-direction: row;
      max-width: 700px;
      height: auto;
      justify-content: space-around;
      align-items: center;
      align-content: space-between;
      .meta {
        flex-basis: auto;
        height: auto;
      }
      .description {
        flex-basis: 60%;
      }
      &.alt {
        flex-direction: row-reverse;
        .description {
          &:before {
            left: inherit;
            right: -10px;
            transform: skew(3deg);
          }
        }
      }
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
    }
  }
}
</style>
