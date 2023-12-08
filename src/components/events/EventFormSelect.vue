<script setup lang="ts">
defineProps<{
  items?: ReadonlySet<string>
  itemName: string
}>()

const model = defineModel<string | number>('model')
</script>

<template>
  <div min-w-40>
    <label for="cities" block w-full>{{ itemName }}</label>
    <select
      id="cities"
      v-model="model"
      name="Cities"
      w-full p-1 capitalize
      bg="light-bg-primary dark:dark-bg-secondary"
      border="~ slate-400 dark:slate-200/30 rounded-lg"
    >
      <option disabled value="">Select one</option>
      <option :value="undefined">All</option>
      <slot>
        <option v-for="item in items" :key="item" :value="item">
          {{ item }}
        </option>
      </slot>
    </select>
  </div>
</template>
