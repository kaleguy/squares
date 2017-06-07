import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ========= The Store ===============
export default new Vuex.Store({
  state: {
    num1: 0,
    num2: 0,
    total: 0
  },
  mutations: {
    RESET (state) {
      console.log('TESTTT')
      state.num1 = Math.floor(Math.random() * 10)
      state.num2 = Math.floor(Math.random() * 10)
      state.total = state.num1 + state.num2
    }
  },
  actions: {
    loadLeo (context, o) {
    }
  }
})
