<script setup lang="ts">
</script>

<template>
  <div data-test="main" class="main">
    <div class="middle-section">
      <h1 data-test="main-h1">
        {{ $t('main.h1') }}
      </h1>
      <h2 data-test="main-h2">
        {{ $t('main.h2') }}
      </h2>
      <a
        data-test="main-cta-youtube"
        class="btn btn-primary"
        target="_blank"
        href="https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA"
      >YouTube</a>
      <a
        data-test="main-cta-spotify"
        class="btn btn-info"
        target="_blank"
        href="https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P"
      >Spotify</a>
      <a
        data-test="main-cta-open-collective"
        class="btn btn-info"
        target="_blank"
        href="https://opencollective.com/schrodinger-hat"
      >OpenCollective</a>
    </div>
  </div>
</template>

<style scoped lang="scss">
.middle-section {
  text-align: center;
  padding: 1em;

  h1 {
    font-weight: bold;
    font-size: 3em;
    margin-bottom: 0;
  }
  h2 {
    font-weight: 100;
    margin-top: 0.3em;
  }

  .btn {
    margin-top: 10px;
  }
}

@media (min-width: 56.25em) {
  .middle-section {
    padding: 5em;
  }
}
</style>
