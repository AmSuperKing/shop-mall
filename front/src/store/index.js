import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import self from './modules/self'
import converse from './modules/converse'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    self,
    converse
  },
  getters
})

export default store
