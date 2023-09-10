<script setup lang="ts">
defineProps<{
  member: string
  socials: Array<string>
}>()
</script>

<template>
  <div class="w-fit">
    <div v-for="social in socials" :key="social" class="inline-block">
      <a
        v-if="$t(`team.${member}.${social}_url`).length > 1"
        class="inline-block m-0.2em group"
        :data-test="`team-member-${member}-${social}`"
        :href="$t(`team.${member}.${social}${social !== 'website' ? '_url' : ''}`)" target="_blank"
      >
        <i :class="[`text-1.2em ${social !== 'website' ? `fab fa-${social}` : 'fa fa-cloud'} group-hover:text-#2e3440`]" />
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
