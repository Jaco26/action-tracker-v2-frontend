import jwt from 'jsonwebtoken'

function createAuthService() {

  let _token = null

  function setToken(token) {
    _token = jwt.decode(token)
  }

  function checkLoggedIn() {
    return !!_token && new Date(_token.exp * 1000) > new Date()
  }
  
  function getPermission() {
    return _token.user_claims.permission.map(perm => perm.name) || []
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