import Vue from 'vue'
import App from './App.vue'
import setupAxios from "@/module/axios_util"
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/css/style.css'

setupAxios();

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('JWT') == null) {
      next('/login');
    }else{
      next();
    }
  } else {
    next();
  }
});


new Vue({
  router,
  render: h => h(App),
}).$mount('#app')