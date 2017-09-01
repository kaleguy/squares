import Vue from 'vue'
import Vuex from 'vuex'

const levels = require('./levels.json')

Vue.use(Vuex)

function getRandom (first, min, max) {
  if (!min) { min = 1 }
  if (!max) { max = 9 }
  if (!first) { first = 0 }
  let second = Math.floor(Math.random() * (max - min + 1) + min)
  if (first !== second) {
    return second
  } else {
    return getRandom(first, min, max)
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
    dice1: 0,
    dice2: 0,
    total: 0,
    buffer: '',
    count: 0,
    time: 0
  },
  mutations: {
    RESET (state, o) {
      state.num1 = getRandom(state.num1)
      state.num2 = getRandom(state.num2)
      state.dice1 = getRandom(state.dice1, 1, 5)
      state.dice2 = getRandom(state.dice2, 1, 5)
      state.buffer = ''
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
      state.num1 = getRandom()
      state.num2 = getRandom()
      state.dice1 = getRandom(state.dice1, 1, 5)
      state.dice2 = getRandom(state.dice2, 1, 5)
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
