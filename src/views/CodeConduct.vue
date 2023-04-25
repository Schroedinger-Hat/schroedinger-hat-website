<script setup lang="ts">
</script>

<template>
  <div class="codeconduct">
    <div class="container">
      <div class="content">
        <h1 data-test="conduct-main-title">
          {{ $t('code_of_conduct.main_title') }}
        </h1>
        <h2 data-test="conduct-short-version-title">
          {{ $t('code_of_conduct.short_version.title') }}
        </h2>
        <p data-test="conduct-short-version-description">
          {{ $t('code_of_conduct.short_version.description') }}
        </p>
        <h2 data-test="conduct-long-version-title">
          {{ $t('code_of_conduct.longer_version.title') }}
        </h2>
        <p data-test="conduct-long-version-description">
          {{ $t('code_of_conduct.longer_version.description') }}
        </p>
        <h2 data-test="conduct-full-version-title">
          {{ $t('code_of_conduct.full_version.title') }}
        </h2>
        <h4 data-test="conduct-full-version-subtitle">
          {{ $t('code_of_conduct.full_version.sub_title') }}
        </h4>
        <p data-test="conduct-full-version-description">
          {{ $t('code_of_conduct.full_version.description') }}
        </p>
        <ul>
          <li v-for="rule in $tm('code_of_conduct.full_version.rules_list')" :key="rule" data-test="conduct-full-version-rules">
            {{ rule }}
          </li>
        </ul>
        <p data-test="conduct-full-version-rules-paragraph">
          {{ $t('code_of_conduct.full_version.rules_paragraph') }}
        </p>
        <h4 data-test="conduct-full-version-enforcement-title">
          {{ $t('code_of_conduct.full_version.enforcement.title') }}
        </h4>
        <p data-test="conduct-full-version-enforcement-description">
          {{ $t('code_of_conduct.full_version.enforcement.description') }}
        </p>
        <p data-test="conduct-full-version-enforcement-second-description">
          {{ $t('code_of_conduct.full_version.enforcement.second_description') }}
        </p>
        <h4 data-test="conduct-full-version-reporting-title">
          {{ $t('code_of_conduct.full_version.reporting.title') }}
        </h4>
        <p data-test="conduct-full-version-reporting-description">
          {{ $t('code_of_conduct.full_version.reporting.description') }}
        </p>
        <p data-test="conduct-full-version-reporting-items-title">
          {{ $t('code_of_conduct.full_version.reporting.items_title') }}
        </p>
        <ul>
          <li
            v-for="rule in $tm('code_of_conduct.full_version.reporting.items')" :key="rule"
            data-test="conduct-full-version-reporting-items"
          >
            {{ rule }}
          </li>
        </ul>
        <p data-test="conduct-full-version-final-description">
          {{ $t('code_of_conduct.full_version.final_description') }}
        </p>
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
