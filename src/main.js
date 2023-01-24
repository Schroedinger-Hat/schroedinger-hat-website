import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import messages from './i18n/messages.json';
import { createApp } from 'vue';

const app = createApp(App)
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



