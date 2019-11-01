function initialState() {
  return {
    username: 'sdsd',
  }
}

export default {
  state: initialState(),
  actions: {
    GET_USER_SESSION({ dispatch }) {
      dispatch('FETCH', {
        url: '/auth/user-session',
        commits: [
          res => ['auth/SET_TOKEN', res.data, true]
        ]
      })
    },
    LOGIN({ dispatch }, payload) {
      dispatch('FETCH', {
        method: 'post',
        url: '/auth/login',
        data: payload,
        dispatches: [
          () => ['GET_USER_SESSION']
        ]
      })
    },
    REGISTER({ dispatch }, payload) {
      dispatch('FETCH', {
        method: 'post',
        url: '/auth/register',
        data: payload,
        dispatches: [
          () => ['GET_USER_SESSION']
        ]
      })
    }
  }
}

