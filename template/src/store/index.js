import Vue from 'vue'
import Vuex from 'vuex'

import menu from './menu.js'
import paramet from './paramet.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    menu, paramet
  }
})

export default store