import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// ========= The Store ===============
export default new Vuex.Store({
  state: {
    num1: 0,
    num2: 0,
    total: 0,
    buffer: ''
  },
  mutations: {
    RESET (state) {
      state.num1 = Math.floor(Math.random() * 10)
      state.num2 = Math.floor(Math.random() * 10)
      state.total = state.num1 + state.num2
      state.buffer = ''
    },
    ADDTOBUFFER (state, o) {
      state.buffer = '' + state.buffer + o.num
      if (state.buffer.length > 2) { state.buffer = state.buffer.substring(1) }
    },
    CLEARBUFFER (state) {
      state.buffer = ''
    }

  },
  actions: {
    loadLeo (context, o) {
    }
  }
})
