import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
  presets: [
    presetAttributify(),
    presetIcons(),
    presetUno(),
    presetWebFonts(),
  ],
  shortcuts: {
    'bg-base': 'bg-[#eceff4] dark:bg-[#2e3440]',
    'bg-base-secondary': 'bg-[#d9d9d9] dark:bg-[#3b4252]',
    'text-base': 'text-[#4c566a] dark:text-[#eceff4]',
    'text-base-secondary': 'text-[#eceff4] dark:text-[#4c566a]',
  },
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
