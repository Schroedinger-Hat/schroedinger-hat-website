<script setup lang="ts">
import messages from '@/i18n/messages'
import MemberCard from '@/components/MemberCard.vue'
import Heading from '@/components/Heading.vue'

const team = Object.keys(messages.it.team)
</script>

<template>
  <div class="container">
    <Heading data-test="team-page-headline">
      Schrödinger Hat's fam
    </Heading>
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
