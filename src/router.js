import Vue from 'vue'
import Router from 'vue-router'
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
      path: '/',
      name: 'home',
      component: Home,
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/about')
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
})

router.beforeEach((to, from, next) => {
  authMiddleware(to, from, next)
})

export default router