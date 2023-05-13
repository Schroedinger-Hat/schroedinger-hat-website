import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

export default defineConfig({
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
})
