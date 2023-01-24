<template>
  <div class="projectList">
    <div class="container">
      <div class="content">
        <div>
          <h1>{{ $t(`message.navbar.projects`) }}</h1>
        </div>
        <div class="search-container">
          <input class="search-input" ref="input" :placeholder="$t(`message.common.search-placeholder`)" type="text">
          <div class="search-category">
            <Dropdown 
              @clicked="selectTag"
              :text="$t(`message.common.search-tag`)" 
              header="Seleziona tag" 
              :categories="tags" />
          </div>
          <div class="search-category">
            <!-- <button class="btn btn-info" @click="openDropdown">{{ $t(`message.common.search-category`) }} <i class="fab fa-chevron-down"></i></button> -->
            <Dropdown 
              @clicked="selectCategory"
              :text="$t(`message.common.search-category`)" 
              header="Seleziona categoria" 
              :categories="categories" />
          </div>
          <button class="btn btn-primary" @click="searchProejct">{{ $t(`message.common.search-button`) }}</button>
        </div>
        <div id="projects" v-for="item in pageOfItems" :key="item.id" :pagination="true">
          <div class="project-card">
            <div class="description">
              <div class="project-card-header">
                  <h1 class="project-card-title">
                    <a href="">{{$t(item.name)}}</a>
                    <span class="project-card-category">{{$t(item.category)}}</span>
                  </h1>
                  <div>
                    <a class="icon" :href="item.gitUrl" target="_blank">
                      <i class="mobile-menu-icon fab fa-github"></i>
                    </a>
                    <a class="icon" :href="item.redditUrl" target="_blank">
                      <i class="mobile-menu-icon fab fa-reddit"></i>
                    </a>
                    <a class="icon" :href="item.discordUrl" target="_blank">
                      <i class="mobile-menu-icon fab fa-discord"></i>
                    </a>
                  </div>
              </div>
                <p>{{item.description}}</p>
                <div class="project-card-tags-container">
                  <div class="project-card-tags" v-for="tag in item.tags" :key="tag.id">
                    <span>{{$t(tag)}}</span>
                  </div>
                </div>
                <div class="project-card-owners-container">
                  <div class="project-card-owners" v-for="owner in item.owners" :key="owner.id">
                    <div>
                      <img class="avatar" :src="owner.avatar" alt="" width="40" height="40">
                    </div>
                    <div class="project-card-owners-name">
                      <span>{{owner.name}}</span>
                      <span>{{owner.surname}}</span>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div>
            <jw-pagination :items="projects" @changePage="onChangePage" :pageSize="3"></jw-pagination>
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
import JwPagination from 'jw-vue-pagination';
import text from '../i18n/projects.json';
import Dropdown from '../components/atoms/Dropdown/Dropdown.vue';

export default Vue.component('Projects', {
  name: 'projects',
  props: {},
  components: {
    Dropdown,
    JwPagination
  },
  data () {
    return {
      projects: [],
      categories: text.it.categories,
      tags: text.it.tags,
      selectedCategory: [],
      selectedTag: [],
      pageOfItems: []
    }
  },
  mounted() {
    this.projects = text.it.projects
  },
  methods: {
    searchProejct() {
      console.log(this.selectedCategory);
      console.log(this.selectedTag);
      this.projects = text.it.projects;

      // if (this.$refs.input.value !== "" && this.selectedCategory.length > 0) {
      //   console.log("input + category");
      //   this.projects = this.projects.filter((project) => project.name.toLowerCase().includes(this.$refs.input.value.toLowerCase()) && this.selectedCategory.includes(project.category))
      // } else 
      if (this.selectedCategory.length > 0 && this.$refs.input.value === "") {
        console.log("category");
        this.projects = this.projects.filter((project) => this.selectedCategory.includes(project.category))
      } else if (this.selectedTag.length > 0 && this.$refs.input.value === "" && this.selectedCategory.length === 0) {
        console.log("tag");
        this.projects = this.projects.filter((project) => project.tags.some(item => this.selectedTag.includes(item)))
      } else if (this.$refs.input.value !== "") {
        console.log("input or input + category");
        this.projects = this.projects.filter((project) => project.name.toLowerCase().includes(this.$refs.input.value.toLowerCase()) && (this.selectedCategory.length > 0 ? this.selectedCategory.includes(project.category) : project))
      }
    },
    selectCategory (value) {
      this.selectedCategory = [...value];
    },
    selectTag (value) {
      this.selectedTag = [...value];
    },
    onChangePage(pageOfItems) {
        this.pageOfItems = pageOfItems;
    }
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

  .project-card {
    display: flex;
    flex-direction: column;
    margin: 1rem auto;
    box-shadow: 0 3px 7px -1px rgba(#000, 0.1);
    margin-bottom: 1.6%;
    background: $color_white;
    line-height: 1.4;
    font-family: sans-serif;
    border-radius: 5px;
    overflow: hidden;
    z-index: 0;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &-title {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .icon {
      border-radius: 0.25em;
      margin: 0 0.25em;
      padding: 0.2em 0.5em;
      transition: background-color 100ms ease-in-out 0s;
      cursor: pointer;
      font-size: 1.2em;

      &:hover {
        background-color: $bg-secondary;
      }
    }

    .description {
      padding: 1rem;
      background: $color_white;
      position: relative;
      z-index: 1;
      h1,
      h2 {
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
        color: $color_grey_dark;
        margin-top: 5px;
      }
      .read-more {
        text-align: right;
        a {
          color: $color_prime;
          display: inline-block;
          position: relative;
        }
      }
    }

    &-category {
      font-size: 12px;
      display: inline-block;
      padding: 0 0.5rem;
      border: 1px solid $color_grey;
      border-radius: 0.75rem;
      padding: 0.25rem 0.625rem;
      margin-left: 0.25rem;
    }

    &-tags-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 1rem;
      height: 30px;
    }

    &-tags {
      display: inline-block;
      padding: 0 0.5rem;
      border: 1px solid $color_grey;
      border-radius: 0.75rem;
      margin: 0 0.125em 0.333em 0;
      padding-right: 0.625rem;
      padding-left: 0.625rem;
      background-color: $color_grey;
    }

    &-owners-container {
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-start;
      align-items: flex-start;
      margin-top: 0.5rem;
    }

    &-owners {
      display: flex;
      align-items: center;
      padding: 0.25rem;
      border: 1px solid $color_grey;
      border-radius: 0.75rem;
      margin: 0 1rem 0 0;
      padding-right: 10px;
      padding-left: 10px;

      &-name {
        display: flex;
        flex-direction: column;
        margin-left: 1rem;
      }
    }
    
    .avatar {
      display: inline-block;
      overflow: hidden;
      line-height: 1;
      vertical-align: middle;
      background-color: $color_grey;
      border-radius: 6px;
      flex-shrink: 0;
      box-shadow: 0 0 0 1px $color_grey;
      border-radius: 50% !important;
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