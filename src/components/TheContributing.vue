<script setup lang="ts">
import NyanCat from '@/components/NyanCat.vue'
import SeparatorSingleLine from '@/components/separator/SingleLine.vue'

const SHGitHub = 'https://github.com/Schrodinger-Hat'
const SHGitHubWebsiteRepo = 'https://github.com/Schrodinger-Hat/schrodinger-hat-website/issues/new/choose'
// TODO: Have a global file that contains all the links
// TODO: Add all possible texts to the messages file
</script>

<template>
  <section class="contributing-container" data-test="contributing-section">
    <!-- TODO: Disable nyan cat in mobile -->
    <NyanCat data-test="nyan-cat" />
    <SeparatorSingleLine />
    <div class="bg-secondary py-30">
      <div class="container contributing-container-text">
        <div class="inner-text">
          <h2 data-test="contributing-title" tabindex="0">
            {{ $t('contributing.title') }}
          </h2>
          <p data-test="contributing-description" tabindex="0">
            <!-- TODO: Find a way to write this text better -->
            <b>Schrödinger Hat</b> {{ $t('contributing.is-a-project') }}
            <a
              data-test="contributing-github-link"
              class="external-link-color"
              :href="SHGitHub"
              target="_blank"
            >GitHub
            </a>.
          </p>
          <p data-test="contributing-cta" tabindex="0">
            {{ $t('contributing.cta') }}
            <a
              data-test="contributing-github-website-link"
              class="external-link-color"
              target="_blank"
              :href="SHGitHubWebsiteRepo"
            >
              {{ $t('contributing.external-link') }}
            </a>
            <br>
            {{ $t('contributing.cta-2') }}
          </p>
          <div class="social" data-test="contributing-social">
            <!-- TODO: Create a v-for with all these links -->
            <a
              data-test="contributing-open-collective"
              href="https://opencollective.com/schrodinger-hat"
              target="_blank"
              aria-label="Visit our Opencollective Page"
            >
              <i
                data-test="contributing-open-collective-icon"
                class="fas fa-donate external-link-color"
              />
            </a>
            <a
              data-test="contributing-facebook"
              href="https://www.facebook.com/schrodingerhat"
              target="_blank"
              aria-label="Visit our Facebook Page"
            >
              <i
                data-test="contributing-facebook-icon"
                class="fab fa-facebook external-link-color"
              />
            </a>
            <a
              data-test="contributing-twitter"
              href="https://twitter.com/schrodinger_hat"
              target="_blank"
              aria-label="Visit our Twitter Page"
            >
              <i
                data-test="contributing-twitter-icon"
                class="fab fa-twitter external-link-color"
              />
            </a>
            <a
              data-test="contributing-linkedin"
              href="https://www.linkedin.com/company/schrodinger-hat/"
              target="_blank"
              aria-label="Visit our Linkedin Page"
            >
              <i
                data-test="contributing-linkedin-icon"
                class="fab fa-linkedin external-link-color"
              />
            </a>
            <a
              data-test="contributing-instagram"
              href="https://www.instagram.com/schrodinger_hat/"
              target="_blank"
              aria-label="Visit our Instagram Page"
            >
              <i
                data-test="contributing-instagram-icon"
                class="fab fa-instagram external-link-color"
              />
            </a>
            <a
              data-test="contributing-discord"
              href="https://discord.gg/RTXr8A3eFn" target="_blank"
              aria-label="Join our Discord Server"
            >
              <i
                data-test="contributing-discord-icon"
                class="fab fa-discord external-link-color"
              />
            </a>
          </div>
        </div>
        <div class="inner-text" data-test="contributing-partners">
          <!-- TODO: Add title to messages -->
          <h2 style="padding: 15px 0" data-test="contributing-partners-title" tabindex="0">
            Community Partners
          </h2>
          <div class="partner-image" data-test="contributing-partners-logo">
            <!-- TODO: Create a v-for with all the partners maybe a file also -->
            <a
              href="https://www.grusp.org/"
              target="_blank"
              class="sponsor-image"
            >
              <img
                width="125"
                src="/img/grusp-logo.png"
                alt="Grusp Logo"
              >
            </a>
            <a
              href="https://pisa.dev/"
              target="_blank"
              class="sponsor-image"
            >
              <img width="200" src="/img/pisa-dev.svg" alt="Pisa.Dev Logo">
            </a>
            <a
              href="https://www.theredcode.it/"
              target="_blank"
              class="sponsor-image"
            >
              <img
                width="125"
                src="/img/the-red-code-logo.png"
                alt="The Red Code Logo"
              >
            </a>
            <a
              href="https://www.wearedevelopers.com/"
              target="_blank" class="sponsor-image"
            >
              <img
                width="200"
                src="/img/WeAreDevelopers_logo.svg"
                alt="WeAreDevelopers Logo"
              >
            </a>
            <a
              href="https://www.pignolalug.it/"
              target="_blank"
              rel="noreferrer"
            >
              <img width="125" src="/img/plug_logo.svg" alt="Plug">
            </a>
            <a
              href="https://flutterheroes.com/"
              target="_blank"
              rel="noreferrer"
            >
              <img width="200" src="/img/fh_logo.png" alt="Flutter Heroes">
            </a>
            <a href="https://pycon.it/en" target="_blank" rel="noreferrer">
              <img width="200" src="/img/pycon-logo.png" alt="PyCon Ialia">
            </a>
            <a
              href="https://www.devdreams.it/"
              target="_blank"
              rel="noreferrer"
              class="sponsor-image"
            >
              <img width="150" src="/img/devdreams.png" alt="DevDreams">
            </a>
            <a
              href="https://www.codemotion.com/"
              target="_blank"
              rel="noreferrer"
              class="sponsor-image"
            >
              <img width="300" src="/img/codemotion_logo.svg" alt="Codemotion">
            </a>
            <a
              href="https://www.gdgpisa.it/"
              target="_blank"
              rel="noreferrer"
              class="sponsor-image"
            >
              <img width="150" src="/img/gdgp.svg" alt="GDG Pisa">
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.contributing-container {
  position: relative;

  .background-svg {
    width: 100%;
    margin-bottom: -15px;

    .single-line {
      fill: $bg-secondary;
    }
  }

  .bg-secondary {
    background-color: $bg-secondary;
  }

  .social {
    a {
      padding: 0 0.5em;
      font-size: 1.2em;
    }
  }
}

.contributing-container-text {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  text-align: center;

  .inner-text {
    padding: 0 0.5em;

    h2 {
      margin: 0;
      font-size: 2.2em;
    }
  }

  .partner-image {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }

  .sponsor-image {
    padding: 1em 0.625em;
  }
}

@media (width >= 56.25em) {
  .contributing-container {
    .background-svg {
      margin-bottom: -5px;
    }

  }
}

.#{$dark-mode-class} {
  .contributing-container {
    .background-svg {
      margin-bottom: -5px;

      .single-line {
        fill: $dark-bg-secondary;
      }
    }

    .bg-secondary {
      background-color: $dark-bg-secondary;
    }
  }
}
</style>
