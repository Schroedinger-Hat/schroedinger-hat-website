<template>
  <div class="main">
    <div class="middle-section">
      <h1>{{ $t('message.main.h1') }}</h1>
      <h2>{{ $t('message.main.h2') }}</h2>
      <a
        class="btn btn-primary"
        target="_blank"
        href="https://www.youtube.com/channel/UC1QLLgrGrPmlaFhS0orykCA"
        >YouTube</a
      >
      <a
        class="btn btn-info"
        target="_blank"
        href="https://open.spotify.com/show/7yfkQCV6hrPIqflSqJDB2P"
        >Spotify</a
      >
      <a class="btn btn-info" target="_blank" href="https://opencollective.com/schrodinger-hat"
        >OpenCollective</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
