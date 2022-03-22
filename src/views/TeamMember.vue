<template>
  <div class="team">
    <div class="container">
      <div class="content">
        <h1>{{ $t(`team.${teamMember}.name`) }}</h1>
          <div class="meta">
            <div
              class="photo"
              :style="`background-image: url(${$t(`team.${teamMember}.image`)});`"
            ></div>
          </div>
        <div class="socialIcons">
          <a v-if="$t(`team.${teamMember}.github_url`).length > 1" v-bind:href="$t(`team.${teamMember}.github_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-github"></i>
          </a>
          <a v-if="$t(`team.${teamMember}.linkedin_url`).length > 1"  v-bind:href="$t(`team.${teamMember}.linkedin_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-linkedin"></i>
          </a>
          <a v-if="$t(`team.${teamMember}.twitter_url`).length > 1"  v-bind:href="$t(`team.${teamMember}.twitter_url`)" target="_blank">
            <i class="mobile-menu-icon fab fa-twitter"></i>
          </a>
         </div>
        <div class="description" v-html="$t(`team.${teamMember}.description`)"></div>
      </div>
    </div>
  </div>
</template>

<script>
import text from '../i18n/messages.json';

export default {
  name: 'Team',
  data() {
    return {
      teamMember: '',
    };
  },
  mounted() {
    const teamMember = this.$route.params.member;
    if (text.it.team[teamMember] !== undefined) {
      this.teamMember = teamMember;
    }
  },
};
</script>
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
