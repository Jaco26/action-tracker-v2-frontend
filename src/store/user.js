function initialState() {
  return {
    username: 'sdsd',
  }
}

export default {
  state: initialState(),
  actions: {
    async GET_USER_SESSION({ commit, state, dispatch }) {
      await dispatch('FETCH', {
        withCredentials: true,
        url: '/auth/user-session',
        onSuccess: {
          commits: [
            res => ['auth/SET_TOKEN', res.data, true]
          ],
        },
        onError: {
          commits: [
            err => {
              switch (err.response.status) {
                case 403:
                  return ['auth/SET_TOKEN', null, true]
                case 500:
                  console.log('SERVER ERROR in GET_USER_SESSION')
                  break
              }
            },
          ]
        }
      })
    },
    async LOGIN({ dispatch }, payload) {
      await dispatch('FETCH', {
        withCredentials: true,
        method: 'post',
        url: '/auth/login',
        data: payload,
        onSuccess: {
          dispatches: [
            () => ['GET_USER_SESSION']
          ]
        }
      })
    },
    async REGISTER({ dispatch }, payload) {
      await dispatch('FETCH', {
        method: 'post',
        url: '/auth/register',
        data: payload,
        onSuccess: {
          dispatches: [
            () => ['GET_USER_SESSION']
          ]
        }
      })
    },
    async LOGOUT({ dispatch }) {
      await dispatch('FETCH', {
        withCredentials: true,
        method: 'post',
        url: '/auth/logout',
        onSuccess: {
          dispatches: [
            () => ['GET_USER_SESSION']
          ]
        }
      })
    }
  }
}

