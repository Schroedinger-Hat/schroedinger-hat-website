<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  text: String,
  header: String,
  categories: Array,
})

const emit = defineEmits(['clicked'])

const checkedCategories = ref([])
const active = ref(false)

function toggle() {
  active.value = !active.value
}

function selectCategory(checkedCategories: Array<string>) {
  emit('clicked', checkedCategories)
}
</script>

<template>
  <div class="dropdown">
    <button class="btn btn-info" style="margin-right: 0" @click="toggle">
      {{ text }}
      <!-- <i class="fab fa-solid fa-chevron-down"></i> -->
      <img class="btn-icon" src="img/icons/caret-down-solid.svg" alt="">
    </button>
    <div v-if="active" class="dropdown-content">
      <header class="dropdown-header">
        <span>{{ header }}</span>
        <button class="dropdown-close-button" @click="toggle">
          X
        </button>
      </header>
      <div class="dropdown-list">
        <label v-for="(category, index) in categories" :key="index" class="dropdown-list-select" for="">
          <input v-model="checkedCategories" type="checkbox" :value="category" @change="selectCategory(checkedCategories)">
          <span>{{ $t(category) }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

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

.btn-icon {
  width: 20px;
  height: 20px;
}
</style>
