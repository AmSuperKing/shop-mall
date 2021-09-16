import { selfApi } from '@/api/selfApi'
import { getToken, setToken, removeToken } from '@/utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    userInfo: {}
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_INFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return selfApi.login(userInfo).then(res => {
      const token = res.data.data.token
      setToken(token)
    })
  },

  // get user info
  getInfo({ commit }) {
    return selfApi.getUserInfo().then(res => {
      const user = res.data.data
      commit('SET_INFO', user)
    })
  },

  // user logout
  logout() {
    removeToken() // must remove  token  first
    state.userInfo = {}
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
