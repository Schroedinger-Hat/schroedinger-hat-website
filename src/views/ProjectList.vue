<template>
  <div class="projectList">
    <div class="container">
      <div class="content">
        <div>
          <h1>{{ $t(`message.navbar.projects`) }}</h1>
        </div>
        <div class="search-container">
          <input class="search-input" :placeholder="$t(`message.common.search-placeholder`)" type="text">
          <div class="search-category">
            <!-- <button class="btn btn-info" @click="openDropdown">{{ $t(`message.common.search-category`) }} <i class="fab fa-chevron-down"></i></button> -->
            <Dropdown :text="$t(`message.common.search-category`)" header="Seleziona categoria">
                <a>Eventi</a>
            </Dropdown>
          </div>
          <button class="btn btn-primary">{{ $t(`message.common.search-button`) }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import text from '../i18n/messages.json';

// export default {
//   name: 'ProjectList',
//   // data() {
//   //   return {
//   //     projects: Object.keys(text.it.projects),
//   //   };
//   // },
// };

import Vue from 'vue';
import Dropdown from '../components/atoms/Dropdown/Dropdown.vue';

export default Vue.component('Projects', {
  props: {},
  components: {
    Dropdown,
  }
});
</script>


<style scoped lang="scss">
$color_white: #fff;
$color_prime: $nord3;
$color_grey: $nord4;
$color_grey_dark: $nord2;

.projectList {
  .content {
    padding: 1.5em 3em;
  }

  .search {

    &-container {
      display: flex;
    }

    &-input {
      width: 100%;
      border: 1px solid $color_grey;
      border-radius: 0.25em;
      padding: 0.5em;
      font-size: 1.2em;
      font-weight: bold;
      color: $color_grey_dark;
    }

    &-category {
      display: flex;
      flex-wrap: wrap;
    }
  }
}

.#{$dark-mode-class} {
  .blog-card {
    background: $nord2;
    .description {
      background: $nord2;
      h2,
      .read-more a {
        color: $nord4;
      }
      &:before {
        background: $nord2;
      }
    }
  }
}
</style>