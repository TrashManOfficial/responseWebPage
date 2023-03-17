import { createApp } from 'vue'
import 'tw-elements'

import router from './router'
import store from './store'
import './style.scss'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'

createApp(App)
  .use(router)
  .use(VueLazyLoad)
  .use(store)
  .mount('#app')
