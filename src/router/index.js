import Vue from 'vue'
import Router from 'vue-router'
import {getAccessToken} from '@/module/auth_util'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/*pages*/
import InnerPageContainer from './../pages/InnerPages/InnerPageContainer.vue'
import IdeasListingPage from './../pages/InnerPages/IdeasListingPage.vue'
import PostEditorPage from './../pages/InnerPages/PostEditorPage.vue'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import EmailConfirmationPage from '../pages/EmailConfirmationPage.vue'

import ResetPasswordPage from '../pages/ResetPasswordPage.vue'

Vue.use(Router)

//setup font awesome
library.add(faBars) 
Vue.component('font-awesome-icon', FontAwesomeIcon)


const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: InnerPageContainer,
      children: [
        {
          path: '',
          component: IdeasListingPage
        },
        {
          path: 'post/add',
          component: PostEditorPage
        }
      ],
      meta: {
        requiresAuth: true,
      }
    },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    { path: '/email_confirmation', component: EmailConfirmationPage },
    { path: '/reset-password', component: ResetPasswordPage }
  ],
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (getAccessToken() == null) {
      next('/login');
    }else{
      next();
    }
  } else {
    next();
  }
});

export default router;