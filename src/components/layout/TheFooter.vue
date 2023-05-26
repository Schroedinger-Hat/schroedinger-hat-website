<script setup lang="ts">
import SeparatorTripleLine from '@/components/separator/TripleLine.vue'
import LogoAnimated from '@/components/buttons/LogoAnimated.vue'
</script>

<template>
  <footer class="relative" data-test="footer">
    <SeparatorTripleLine />
    <div class="container flex h-20 pt-32 text-left">
      <div class="flex justify-between items-center w-full px-2 mx-auto">
        <LogoAnimated />
        <nav>
          <span data-test="footer-nav-text">&copy;{{ new Date().getFullYear() }} Schrödinger Hat</span>
        </nav>
      </div>
    </div>
  </footer>
</template>
