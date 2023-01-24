<script setup lang="ts">
import TheNavbar from './components/layout/TheNavbar.vue';
import TheContributing from './components/TheContributing.vue';
import TheFooter from './components/layout/TheFooter.vue';
</script>

<template>
  <div id="app">
    <TheNavbar />
    <router-view />
    <TheContributing />
    <TheFooter />
  </div>
</template>

