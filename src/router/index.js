import Vue from 'vue'
import Router from 'vue-router'

/*pages*/
import InnerPageContainer from './../pages/InnerPages/InnerPageContainer.vue'
import IdeasListingPage from './../pages/InnerPages/IdeasListingPage.vue'
import PostEditorPage from './../pages/InnerPages/PostEditorPage.vue'

import LoginPage from '../pages/LoginPage.vue'
import RegisterPage from '../pages/RegisterPage.vue'
import EmailConfirmationPage from '../pages/EmailConfirmationPage.vue'

import ResetPasswordPage from '../pages/ResetPasswordPage.vue'

Vue.use(Router)


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
    { path: '/register', component: RegisterPage, meta: { requiresAuth: true } },
    { path: '/email_confirmation', component: EmailConfirmationPage },
    { path: '/reset-password', component: ResetPasswordPage }
  ],
})
export default router;