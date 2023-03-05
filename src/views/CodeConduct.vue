<script setup lang="ts">
</script>

<template>
  <div class="codeconduct">
    <div class="container">
      <div class="content">
        <h1> {{ $t('code_of_conduct.main_title') }}</h1>
        <h2> {{ $t('code_of_conduct.short_version.title') }}</h2>
        <p>{{ $t('code_of_conduct.short_version.description') }}</p>
        <h2>{{ $t('code_of_conduct.longer_version.title') }}</h2>
        <p>{{ $t('code_of_conduct.longer_version.description') }}</p>
        <h2>{{ $t('code_of_conduct.full_version.title') }}</h2>
        <h4>{{ $t('code_of_conduct.full_version.sub_title') }}</h4>
        <p>{{ $t('code_of_conduct.full_version.description') }}</p>
        <ul>
          <li v-for="rule in $tm('code_of_conduct.full_version.rules_list')" :key="rule">
            {{ rule }}
          </li>
        </ul>
        <p>{{ $t('code_of_conduct.full_version.rules_paragraph') }}</p>
        <h4>{{ $t('code_of_conduct.full_version.enforcement.title') }}</h4>
        <p>{{ $t('code_of_conduct.full_version.enforcement.description') }}</p>
        <p>{{ $t('code_of_conduct.full_version.enforcement.second_description') }}</p>
        <h4>{{ $t('code_of_conduct.full_version.reporting.title') }}</h4>
        <p>{{ $t('code_of_conduct.full_version.reporting.description') }}</p>
        <p>{{ $t('code_of_conduct.full_version.reporting.items_title') }}</p>
        <ul>
          <li v-for="rule in $tm('code_of_conduct.full_version.reporting.items')" :key="rule">
            {{ rule }}
          </li>
        </ul>
        <p>{{ $t('code_of_conduct.full_version.final_description') }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.codeconduct {
  .content {
    padding: 1.5em 3em;
  }
}
</style>
