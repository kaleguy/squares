import Vue from 'vue'
import Vuex from 'vuex'

const levels = require('./levels.json')

Vue.use(Vuex)

const num1Limits = {
  s1: { min: 0, max: 5 }
}

function getRandom (first, myOp, myLevel, limits) {
  let max = 9
  let min = 1
  limits = limits || {}
  myOp = myOp || 'foo'
  myLevel = myLevel || 'bar'
  let key = myOp + myLevel

  let limit = limits[key]
  if (limit) {
    min = limit.min || min
    max = limit.max || max
  }
  let second = Math.floor(Math.random() * (max - min + 1) + min)
  if (first !== second) {
    return second
  } else {
    return getRandom(first, myOp, myLevel, limits)
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
      state.num1 = getRandom(state.num1, o.operator, o.level, num1Limits)
      state.num2 = getRandom(state.num2, o.operator, o.level)
      state.total = state.num1 + state.num2
      state.buffer = ''
      if (!o) { return }
      if (!o.level) { return }
      if (!o.operator) { return }
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
      state.num1 = getRandom(0, null)
      state.num2 = getRandom(0, null)
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
