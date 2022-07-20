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
        <slot/>
      </div>
  </div>
</template>

<script>

  export default {
    name: 'AppDropdown',
    props: {
      text: String,
      header: String,
    },
    data(){
      return {
        active: false,
      }
    },
    methods: {
      toggle() {
        this.active = !this.active;
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
}
</style>