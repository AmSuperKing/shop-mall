import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import self from './modules/self'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    self
  },
  getters
})

export default store
