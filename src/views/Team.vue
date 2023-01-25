<script>
import text from '../i18n/messages.json'

export default {
  name: 'Team',
  data() {
    return {
      team: Object.keys(text.it.team),
      linkText: text.it.links,
    }
  },
}
</script>

<template>
  <div class="teamList">
    <div class="container">
      <div class="content">
        <div class="headline">
          <h1>Schrödinger Hat's fam</h1>
        </div>
        <div v-for="teammember in team" :key="teammember.github">
          <div class="blog-card">
            <div class="meta">
              <div
                class="photo"
                :style="`background-image: url( ${$t(`team.${teammember}.image`)} );`"
              />
              <!--
                ### IMPORTANT ### Do we want a secondary picture?
                <div
                class="photo-secondary"
                :style="`background-image: url( ${$t(`team.${teammember}.secondary_image`)} );`"
              ></div>
              -->
            </div>
            <div class="description">
              <h1>{{ $t(`team.${teammember}.name`) }}</h1>
              <div class="socialIcons">
                <a v-if="$t(`team.${teammember}.github_url`).length > 1" :href="$t(`team.${teammember}.github_url`)" target="_blank">
                  <i class="mobile-menu-icon fab fa-github" />
                </a>
                <a v-if="$t(`team.${teammember}.linkedin_url`).length > 1" :href="$t(`team.${teammember}.linkedin_url`)" target="_blank">
                  <i class="mobile-menu-icon fab fa-linkedin" />
                </a>
                <a v-if="$t(`team.${teammember}.twitter_url`).length > 1" :href="$t(`team.${teammember}.twitter_url`)" target="_blank">
                  <i class="mobile-menu-icon fab fa-twitter" />
                </a>
                <a v-if="$t(`team.${teammember}.website`).length > 1" :href="$t(`team.${teammember}.website`)" target="_blank">
                  <i class="mobile-menu-icon fa fa-cloud" />
                </a>
              </div>
              <p v-html="$t(`team.${teammember}.description`)" />
              <router-link
                :key="team.permalink"
                :to="`/team/${$t(`team.${teammember}.permalink`)}`"
              >
                <p class="user-profile-link">
                  {{ $t(linkText) }}
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
    // ONLY FOR SECONDARY PICTURE
    // &:hover {
    //   .photo {
    //     display: none;
    //   }

    //   .photo-secondary {
    //     display: block;
    //   }
    // }
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
