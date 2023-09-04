<template>
  <div class="socialIcons">
    <div class="inline-block" v-for="social in socials">
        <a
        v-if="$t(`team.${member}.${social}_url`).length > 1"
        :data-test="`team-member-${member}-${social}`"
        :href="$t(`team.${member}.${social}${social !== 'website' ? '_url' : ''}`)" target="_blank"
        >
          <i :class="[`mobile-menu-icon ${social !== 'website' ? `fab fa-${social}` : 'fa fa-cloud'}`]" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  member: string
  socials: Array<string>
}>()

</script>

<style lang="scss">
  
.socialIcons {
  width: fit-content;
  padding: 0.5em 0 1em;

  a {
    display: inline-block;
    margin: 0.2em;

    .mobile-menu-icon {
      font-size: 1.2em;
    }

    &:hover .mobile-menu-icon {
      color: #2e3440;
    }
  }
}
  
</style>