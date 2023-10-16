import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import { createI18n } from 'vue-i18n'
import App from '@/App.vue'
import router from '@/router'
import messages from '@/i18n/messages'
import './registerServiceWorker'
import 'virtual:uno.css'
import '@unocss/reset/tailwind.css'

const head = createHead()

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.substring(0, 2),
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(head)
app.use(i18n)
app.use(router)
app.mount('#app')
