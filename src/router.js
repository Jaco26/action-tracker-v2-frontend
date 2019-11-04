import Vue from 'vue'
import Router from 'vue-router'
import AppContainer from './views/container'
import AccessDenied from './views/access-denied'
import NotFound from './views/not-found'
import Home from './views/home'
import Login from './views/login'
import Logout from './views/logout'

import authMiddleware from '@/middleware/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      /*
        Using a router-controlled container component makes sure that app content will only render after router
        middleware resolves. This means we can check user credentials on initial page load/after refresh and not 
        worry about the "login" button suddenly changing to the "logout" button upon receiving the /auth/user-session 
        result from the backend API
      */
      path: '/',
      component: AppContainer,
      children: [
        {
          path: '',
          name: 'home',
          component: Home,
        },
        {
          path: '/me',
          name: 'profile',
          component: () => import(/* webpackChunckName: "profile" */ './views/profile'),
          meta: {
            requiresAuth: true,
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login,
        },
        {
          path: '/logout',
          name: 'logout',
          component: Logout,
        },
        {
          path: '/access-denied',
          name: 'access-denied',
          component: AccessDenied,
        },
        {
          path: '*',
          name: 'not-found',
          component: NotFound,
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  try {

    const redirect = await authMiddleware(to, from)

    if (redirect) return next(redirect)

    else next()

  } catch (error) {

    console.error('[router.beforeEach error]', error)
    
  }
})

export default router