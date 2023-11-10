<script setup lang="ts">
defineProps<{
  items?: ReadonlySet<string>
  itemName: string
}>()

const model = defineModel<string | number>('model')
</script>

<template>
  <div class="min-w-40">
    <label for="cities" class="block w-full">{{ itemName }}</label>
    <select id="cities" v-model="model" name="Cities" class="w-full p-1 bg-dark-bg-secondary rounded-lg capitalize">
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
