import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  // Find better way to do this https://unocss.dev/guide/extracting#safelist
  safelist: [
    'i-carbon-calendar',
    'i-carbon-time',
    'i-carbon-user-speaker',
    'i-carbon-tag',
    'i-carbon-location-filled',
  ],
  presets: [
    // See: https://unocss.dev/presets/attributify
    presetAttributify(),
    // See: https://unocss.dev/presets/icons
    presetIcons(),
    // See: https://unocss.dev/presets/uno
    presetUno(),
    // See: https://unocss.dev/presets/web-fonts
    presetWebFonts(),
  ],
  theme: {
    colors: {
      light: {
        text: {
          primary: '#4c566a', // text-light-text-primary
          secondary: '#eceff4', // text-light-text-secondary
        },
        bg: {
          primary: '#eceff4', // bg-light-bg-primary
          secondary: '#d9d9d9', // bg-light-bg-secondary
        },
      },
      dark: {
        text: {
          primary: '#eceff4', // text-dark-text-primary
          secondary: '#4c566a', // text-dark-text-secondary
        },
        bg: {
          primary: '#2e3440', // bg-dark-bg-primary
          secondary: '#3b4252', // bg-dark-bg-secondary
        },
      },
    },
  },
})
