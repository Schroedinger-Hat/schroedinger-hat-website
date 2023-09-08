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

      <!-- component that render socials (done) -->
      <SocialIcons :member="member" :socials="socials" />

      <router-link
        class="user-profile-link"
        :data-test="`team-member-${member}-page-link`"
        :to="{ name: 'TeamMember', params: { member } }"
      >
        {{ t('redirect.profile') }}
      </router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;
.blog-card {
  z-index: 0;
  overflow: hidden;
  border-radius: 5px;
  margin: 1rem auto;
  margin-bottom: 1.6%;
  background-color: #d8dee9; //brand color, pick from light-v waves
  background-image: $color_white;
  box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
  font-family: sans-serif;
  line-height: 1.4;

  a,
  li {
    color: $color_white;
  }

  .meta {
    position: relative;
    z-index: 0;
    display: flex;
    height: auto;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    margin: 2em auto 0;
    text-align: center;
  }

  .photo {
    display: block;
    width: 128px;
    height: 128px;
    border-radius: 100%;
    background-position: center;
    background-size: cover;
  }

  .photo-secondary {
    display: none;
    width: 128px;
    height: 128px;
    border-radius: 100%;
    background-position: center;
    background-size: cover;
  }

  .description {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;

    h2,
    p {
      font-family: Poppins, sans-serif;
    }

    h2 {
      margin: 5px 0;
      font-size: 1.75rem;
      font-weight: 700;
    }

    .user-profile-link {
      width: fit-content;
      padding: 5px 15px;
      border: 1px solid transparent;
      border-radius: 999px;
      margin: 0 auto;
      background-color: #586379;
      color: #fff;
      font-size: 1rem;
      font-weight: 700;

      &:hover {
        background-color: #2e3440;
      }
    }
  }
}

.#{$dark-mode-class}{
  .blog-card {
    background-color: $nord2;
  }

}
</style>
