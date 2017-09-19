import Vue from 'vue'
import Vuex from 'vuex'

const levels = require('./levels.json')
const shuffle = require('shuffle-array')

Vue.use(Vuex)

let deck = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
shuffle(deck)
function shuffleUniq (last) {
  shuffle(deck)
  if (deck[0] === last) {
    deck.shift()
    deck.push(last)
  }
}

function getDealer () {
  let index = -1
  const dealer = function (reset) {
    if (reset) {
      if (index === -1) { index = 0 }
      shuffleUniq(deck[index])
      index = -1
    }
    index = index + 1
    if (index > 8) {
      shuffleUniq(deck[8])
      index = 0
    }
    console.log('calling dealer', index, deck[index])
    return deck[index]
  }
  return dealer
}

const deal1 = getDealer()


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
    time: 0,
    username: '',
    mode: 't', // t for test or p for practice
    errorState: false,
    ticks: 0
  },
  mutations: {
    RESET (state, o) {
      state.errorState = false
      state.num1 = deal1()
      state.num2 = getRandom(state.num2)
      state.dice1 = getRandom(state.dice1, 1, 5)
      state.dice2 = getRandom(state.dice2, 1, 5)
      state.buffer = ''
      state.ticks = 0
      if (!o) { return }
      state.currentLevel.index = o.level
      state.currentLevel.op = o.operator
      state.errorState = false
    },
    // user gave wrong answer
    SETERRORSTATE (state) {
      state.errorState = true
      state.count = 0
      state.time = 0
    },
    CLEARERRORSTATE (state) {
      state.errorState = false
      state.buffer = ''
    },
    TICK (state) {
      state.ticks = state.ticks + 1
    },
    ADDTOBUFFER (state, o) {
      state.buffer = '' + state.buffer + o.num
      if (state.buffer.length > 2) { state.buffer = state.buffer.substring(1) }
    },
    POPBUFFER (state) {
      if (state.buffer.length > 1) {
        state.buffer = ''
        return
      }
      state.buffer = state.buffer.substring(1)
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
    SETMODE (state, o) {
      state.mode = o.mode
    },
    RESETALL (state, o) {
      state.ticks = 0
      state.errorState = false
      state.count = 0
      state.time = 0
      state.num1 = deal1(true)
      state.num2 = getRandom()
      state.dice1 = getRandom(state.dice1, 1, 5)
      state.dice2 = getRandom(state.dice2, 1, 5)
      state.buffer = ''
      state.mode = 't'
      if (!o) { return }
      state.currentLevel.index = o.level
      state.currentLevel.op = o.operator
    },
    SETPASS (state, o) {
      state.passedLevels[o.key] = 1
    },
    SETUSER (state, o) {
      state.username = o.username
    }
  },
  actions: {
    dummy (context, o) {
    }
  }
})
