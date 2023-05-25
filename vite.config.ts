import { URL, fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import UnoCSS from 'unocss/vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // See https://github.com/intlify/vue-i18n-next/issues/789
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/global";',
      },
    },
  },
  plugins: [
    vue(),
    UnoCSS(),
  ],
})
