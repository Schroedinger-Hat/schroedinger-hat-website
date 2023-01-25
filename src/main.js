// import VueI18n from 'vue-i18n';
import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import messages from './i18n/messages.json'
import './registerServiceWorker'

const i18n = createI18n({
  legacy: false,
  locale: navigator.language.substring(0, 2),
  fallbackLocale: 'en',
  messages,
})

const app = createApp(App)

app.use(i18n)
app.use(router)
app.mount('#app')

// Vue.config.productionTip = false;
// Vue.use(VueI18n);
// const i18n = new VueI18n({
//   locale: navigator.language.substr(0, 2),
//   fallbackLocale: 'en',
//   messages,
// });
//
// new Vue({
//   router,
//   i18n,
//   render: (h) => h(App),
// }).$mount('#app');
