import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
///import { createGtm } from '@gtm-support/vue-gtm'

import App from './App.vue'
import router from './router'
import gsap from 'gsap'
import Vue3Lottie from 'vue3-lottie'

const app = createApp(App)

app.use(createPinia())
app.use(router)
/* app.use(
  createGtm({
    id: 'GTM-T8H8CSTG',
    vueRouter: router
  })
) */
app.use(gsap)
app.use(Vue3Lottie)
app.mount('#app')
