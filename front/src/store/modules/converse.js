const state = {
  currSelectItem: {}
}

const mutations = {
  SET_CURR_SELECT_ITEM: (state, currSelectItem) => {
    state.currSelectItem = currSelectItem
  }
}

const actions = {
  setItem({ commit }, currSelectItem) {
    return new Promise(resolve => {
      commit('SET_CURR_SELECT_ITEM', currSelectItem)
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
