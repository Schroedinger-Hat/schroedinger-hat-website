<template>
  <div class="home">
    <div class="container">
      <Main />
    </div>
  </div>
</template>

<script>
import Main from '@/components/Main.vue';

export default {
  name: 'RedirectVideo',
  components: {
    Main,
  },
  created() {
    window.location.href =
      'https://www.youtube.com/playlist?list=UU1QLLgrGrPmlaFhS0orykCA&playnext=1&index=1';
  },
};
</script>
<style scoped lang="scss">
.canvas-container {
  svg {
    margin-bottom: -5px;
    path:nth-of-type(1) {
      fill: $nord4;
    }
    path:nth-of-type(2) {
      fill: $nord5;
    }
  }
}

.demo-section {
  min-height: 500px;
  background: $nord5;
  margin-bottom: -13em;
  margin-top: -1.5em;
  padding: 5em 0;
}

.#{$dark-mode-class} {
  .demo-section {
    background: $nord2;
  }

  .canvas-container {
    svg {
      path:nth-of-type(1) {
        fill: $dark-bg-secondary;
      }
      path:nth-of-type(2) {
        fill: $nord2;
      }
    }
  }
}
</style>
