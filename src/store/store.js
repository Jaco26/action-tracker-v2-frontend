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
   * @typedef OnSuccess
   * @property {Function[]} commits
   * @property {Function[]} dispatches
   */
  
  /**
   * @typedef FetchConfig
   * @property {String} url 
   * @property {String} method
   * @property {*} data
   * @property {Function} callback on successful request, this gets the response object
   * @property {Function[]} commits
   * @property {Function[]} dispatches
   */

  /**
   * 
   * @param {*} ctx 
   * @param {FetchConfig} config 
   */
  async FETCH(ctx, { method, url, data, commits, dispatches }) {
    try {
      ctx.commit('SET', ['busy', true])

      const res = await this.$axios[method || 'get'](url, data)

      if (commits) {
        commits.forEach(callback => {
          let commitArgs = callback(res)
          if (commitArgs.length > 1) {
            ctx.commit(commitArgs[0], commitArgs[1], { root: !!commitArgs[2] })
          } else {
            ctx.commit('SET', commitArgs[0])
          }
        })
      }
      
      if (dispatches) {
        dispatches.forEach(callback => {
          const [type, payload, isRoot] = callback(res)
          ctx.dispatch(type, payload, { root: isRoot })
        })
      }

    } catch (error) {
      ctx.commit('SET', ['errors', [...ctx.state.errors, error.message]])
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
