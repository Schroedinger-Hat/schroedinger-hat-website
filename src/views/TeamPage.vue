<script setup lang="ts">
import messages from '@/i18n/messages'
import MemberCard from '@/components/MemberCard.vue'

const team = Object.keys(messages.it.team)
</script>

<template>
  <div class="container">
    <h1 class="max-w-700px m-auto text-center text-2rem font-700" data-test="team-page-headline">
      Schrödinger Hat's fam
    </h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-20px px-1.5em py-3em">
      <MemberCard
        v-for="member in team"
        :key="member"
        data-test="team-list"
        :member="member"
        class="w-full"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
