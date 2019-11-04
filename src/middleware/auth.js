import store from '@/store/store'

export default async function(to, from) {
  try {
    store.commit('auth/SYNC_IS_LOGGED_IN')
    if (to.meta.requiresAuth) {
      if (!store.state.auth.isLoggedIn) {
        await store.dispatch('user/GET_USER_SESSION')
        if (!store.state.auth.isLoggedIn) {
          return '/access-denied'
        }
      }
    }
  } catch (error) {
    console.error('[auth middleware]', error)
  }
}