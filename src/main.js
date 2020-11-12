import Vue from 'vue'
import App from './App.vue'
import setupAxios from "@/module/axios_util"
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueJWT from 'vuejs-jwt'

//import font awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.productionTip = false

//setup bootstrap
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

//setup font awesome
library.add(faBars) 
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueJWT, null)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'

setupAxios();

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')