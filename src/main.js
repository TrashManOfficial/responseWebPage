import { createApp } from 'vue'
import 'tw-elements'

import router from './router'
import store from './store'
import './style.scss'
import VueLazyLoad from 'vue3-lazyload'
import App from './App.vue'
import { createHead } from "@vueuse/head"

createApp(App)
  .use(router)
  .use(VueLazyLoad)
  .use(store)
  .use(createHead())
  .mount('#app')
