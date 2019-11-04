import store from '@/store/store'

function isLoggedIn() {
  return store.getters['auth/isLoggedIn']()
}

export default async function(to, from, next) {
  try {
    if (to.meta.requiresAuth) {
      if (isLoggedIn()) {
        next()
      } else {
        await store.dispatch('user/GET_USER_SESSION')
        if (isLoggedIn()) {
          next()
        } else {
          next('/access-denied')
        }
      }
    } else {
      next()
    }
  } catch (error) {
    console.error('[auth middleware]', error)
  }
}