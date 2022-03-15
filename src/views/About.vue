<template>
  <div class="about">
    <div class="container">
      <div class="content" v-html="$t('pages.about')"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
};
</script>
<style scoped lang="scss">
.about {
  .content {
    padding: 1.5em 3em;
  }
}
</style>
