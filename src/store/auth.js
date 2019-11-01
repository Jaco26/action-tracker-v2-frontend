import jwt from 'jsonwebtoken'

function createAuthService() {

  let _token = null

  function setToken(token) {
    if (token) {
      _token = jwt.decode(token)
    } else {
      _token = null
    }
  }

  function checkLoggedIn() {
    return !!_token && new Date(_token.exp * 1000) > new Date()
  }
  
  function getPermission() {
    if (_token) {
      return _token.user_claims.permission.map(perm => perm.name)
    }
    return []
  }

  return {
    setToken,
    checkLoggedIn,
    getPermission,
  }
}

function initialState() {
  return {
    permission: []
  }
}

const auth = createAuthService()

export default {
  state: initialState(),
  mutations: {
    SET_TOKEN(state, token) {
      this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      auth.setToken(token)
      state.permission = auth.getPermission()
    },
  },
  getters: {
    isLoggedIn() {
      return () => auth.checkLoggedIn()
    }
  }
}