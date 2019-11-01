import axios from 'axios'

export default {
  install(Vue, { store } = {}) {
    const $axios = axios.create({
      baseURL: 'http://localhost:5000/api/',
      withCredentials: true,
    })

    store.$axios = $axios

    Vue.prototype.$axios = $axios
  }
}