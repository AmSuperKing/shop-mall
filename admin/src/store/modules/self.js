import { selfApi } from '@/api/selfApi'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, constantRoutes } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    paths: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_PATHS: (state, paths) => {
    state.paths = paths
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    return selfApi.login(userInfo).then(response => {
      const token = response.data.data.token
      setToken(token)
    })
  },

  // get user info
  getInfo({ commit }) {
    return selfApi.getUserInfo().then(response => {
      const user = response.data.data
      commit('SET_ROLES', user.roles)
      commit('SET_NAME', user.usernameCn)
      commit('SET_AVATAR', user.username)
    })
  },

  // get user menus
  getMenus({ commit }) {
    return selfApi.getMenus().then(response => {
      const menus = response.data.data
      const paths = []
      for (var res of menus) {
        constantRoutes.find(item => {
          // 从父对象里查找
          if (item.menuId === res.menuId) {
            item.hidden = false
            item.meta = { title: res.menuName, icon: res.icon }
          } else if (item.children) {
            // 从子对象里查找
            item.children.find(subitem => {
              if (subitem.menuId === res.menuId) {
                subitem.hidden = false
                subitem.meta = { title: res.menuName, icon: res.icon }
                let concat = '/'
                if (item.path === concat) {
                  concat = ''
                }
                paths.push(item.path + concat + subitem.path)
              }
            })
          }
        })
      }
      commit('SET_PATHS', paths)
    })
  },

  // user logout
  logout() {
    removeToken() // must remove  token  first
    state.name = ''
    resetRouter()
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

