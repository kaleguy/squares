import Vue from 'vue'
import Vuex from 'vuex'

const levels = require('./levels.json')

Vue.use(Vuex)

function getRandom (first) {
  var second = Math.floor(Math.random() * 10)
  if (first !== second) {
    return second
  } else {
    return getRandom(first)
  }
}

// ========= The Store ===============
export default new Vuex.Store({
  state: {
    currentLevel: {
      op: '',
      index: 0
    },
    levels,
    passedLevels: {},
    num1: 0,
    num2: 0,
    total: 0,
    buffer: '',
    count: 0,
    time: 0
  },
  mutations: {
    RESET (state, o) {
      state.num1 = getRandom(state.num1)
      state.num2 = getRandom(state.num2)
      state.total = state.num1 + state.num2
      state.buffer = ''
      // console.log('O', o)
      if (!o) { return }
      state.currentLevel.index = o.level
      state.currentLevel.op = o.operator
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
    SETTIME (state, o) {
      state.time = o.time
    },
    RESETALL (state) {
      state.count = 0
      state.time = 0
      state.num1 = Math.floor(Math.random() * 10)
      state.num2 = Math.floor(Math.random() * 10)
      // state.total = state.num1 + state.num2 // TODO: remove
      state.buffer = ''
    },
    SETPASS (state, o) {
      state.passedLevels[o.key] = 1
    }
  },
  actions: {
    dummy (context, o) {
    }
  }
})
