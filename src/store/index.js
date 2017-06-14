import Vue from 'vue'
import Vuex from 'vuex'

const levels = require('./levels.json')
console.log(levels)

Vue.use(Vuex)

// ========= The Store ===============
export default new Vuex.Store({
  state: {
    currentLevel: 0,
    levels,
    num1: 0,
    num2: 0,
    total: 0,
    buffer: '',
    count: 0
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
    },
    INCCOUNT (state) {
      state.count = state.count + 1
    },
    RESETALL (state) {
      state.count = 0
      state.num1 = Math.floor(Math.random() * 10)
      state.num2 = Math.floor(Math.random() * 10)
      state.total = state.num1 + state.num2 // TODO: remove
      state.buffer = ''
    }
  },
  actions: {
    dummy (context, o) {
    }
  }
})
