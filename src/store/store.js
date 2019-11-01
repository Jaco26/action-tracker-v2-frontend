import Vue from 'vue'
import Vuex from 'vuex'

import user from '@/store/user'
import auth from '@/store/auth'

Vue.use(Vuex)

const universalState = {
  errors: [],
  busy: false,
}

const universalMutations = {
  SET(state, [key, val]) {
    if (state[key] !== undefined) {
      state[key] = val
    }
  }
}

const universalActions = {

  /**
   * 
   * @typedef ResultHandlers
   * @property {Function[]} commits
   * @property {Function[]} dispatches
   */
  
  /**
   * @typedef FetchConfig
   * @property {String} url 
   * @property {String} method
   * @property {*} data
   * @property {ResultHandlers} onSuccess on successful request, this gets the response object
   * @property {ResultHandlers} onError
   */

  /**
   * 
   * @param {*} ctx 
   * @param {FetchConfig} config 
   */
  async FETCH(ctx, { method = 'get', withCredentials = false, url = '', data, onSuccess = {}, onError = {} } = {}) {
    try {
      ctx.commit('SET', ['busy', true])

      const res = await this.$axios({ method, url, withCredentials, data })

      if (onSuccess.commits) {
        onSuccess.commits.forEach(cb => {
          const [type, payload, isRoot] = cb(res)
          ctx.commit(type, payload, { root: isRoot })
        })
      }
      
      if (onSuccess.dispatches) {
        onSuccess.dispatches.forEach(cb => {
          const [type, payload, isRoot] = cb(res)
          ctx.dispatch(type, payload, { root: isRoot })
        })
      }

    } catch (error) {
      ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]])
      
      if (onError.commits) {
        onError.commits.forEach(cb => {
          const [type, payload, isRoot] = cb(error)
          ctx.commit(type, payload, { root: isRoot })
        })
      }

      if (onError.dispatches) {
        onError.dispatches.forEach(cb => {
          const [type, payload, isRoot] = cb(error)
          ctx.dispatch(type, payload, { root: isRoot })
        })
      }

    } finally {
      ctx.commit('SET', ['busy', false])
    }
  }
}

function wrapModule(mod) {
  mod.namespaced = true
  mod.state = { ...universalState, ...mod.state }
  mod.mutations = { ...universalMutations, ...mod.mutations }
  mod.actions = { ...universalActions, ...mod.actions }

  if (mod.modules) {
    Object.keys(mod.modules).forEach(key => {
      wrapModule(mod.modules[key])
    })
  }
  return mod
}


const store = new Vuex.Store({})

store.registerModule('user', wrapModule(user))
store.registerModule('auth', wrapModule(auth))

export default store
