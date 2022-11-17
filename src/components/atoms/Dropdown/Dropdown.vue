<template>
  <div class="dropdown">
      <button @click="toggle" class="btn btn-info">{{ text }}
        <i class="fab fa-chevron-down"></i>
      </button>
      <div v-if="active" class="dropdown-content">
        <header class="dropdown-header">
          <span>{{ header }}</span>
          <button @click="toggle" class="dropdown-close-button">X</button>
        </header>
        <div class="dropdown-list">
          <label class="dropdown-list-select" for="" v-for="(category, index) in categories" :key="index">
            <input type="checkbox" :value="category" v-model="checkedCategories" @change="selectCategory(checkedCategories)">
            <span>{{ $t(category) }}</span>
          </label>
        </div>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'AppDropdown',
    props: {
      text: String,
      header: String,
      categories: Array
    },
    data(){
      return {
        checkedCategories: [],
        active: false,
      }
    },
    methods: {
      toggle() {
        this.active = !this.active;
      },
      selectCategory(checkedCategories) {
        this.$emit('clicked', checkedCategories);
      }
    }
  } 
</script>

<style scoped lang="scss">
.dropdown {
  position: relative;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.3em;
    font-weight: bold;
    border-bottom: 1px solid hsla(210,18%,87%,1);
  }

  &-close-button {
    cursor: pointer;
    border: none;
    background: none;
  }

  &-list {
    position: relative;
    padding: 0;
    margin: 0;
    margin-bottom: -1px;
    flex: auto;
    overflow-x: hidden;
    overflow-y: auto;

    &-select {
      display: flex;
      align-items: center;
      padding: 0.40rem 1rem;
      cursor: pointer;
      border: 0;
      border-bottom: 1px solid hsla(210,18%,87%,1);
      width: 100%;
    }
  }
}
.dropdown-content {
  position: absolute;
  right: 0;
  margin-right: 0.5em;
  margin-top: 0.5em;
  width: 12em;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 0.25em;
  // padding: 0 0.5em;
  transform-origin: top right;
  z-index: 9999;
}
</style>