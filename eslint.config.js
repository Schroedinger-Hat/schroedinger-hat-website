// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  ignorePatterns: ["*.code-workspace"],
  rules: {
    "antfu/top-level-function": "off",
    "vue/singleline-html-element-content-newline": "off"
  }
})

