import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'lodash'

const levels = require('./levels.json')
// randomize the order of elements in a given array
const shuffle = require('shuffle-array')

Vue.use(Vuex)

let deck = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
let deckA = [ 1, 2, 3 ] // eslint-disable-line
let deckB = [ 4, 5, 6 ] // eslint-disable-line
let deckC = [ 7, 8, 9 ] // eslint-disable-line
let deckD = deck // eslint-disable-line

shuffle(deck)
function shuffleUniq (deck, last) {
  shuffle(deck)
  if (deck[0] === last) {
    deck.shift()
    deck.push(last)
  }
}
// returns a function that will deal the next card in a randomly
// shuffled deck
function getDealer (myDeck) {
  let index = -1
  let deck1 = myDeck
  const dealer = function (reset) {
    if (reset) {
      if (index === -1) { index = 0 }
      shuffleUniq(deck1, deck1[index])
      index = -1
    }
    index = index + 1 // deal next card
    if (index > deck1.length - 1) {
      shuffleUniq(deck1, deck1[deck1.length - 1]) // whatever is the current card, we don't want that to be the starting card on the next shuffle
      index = 0
    }
    return deck1[index]
  }
  return dealer
}

let deal1 = getDealer(deck)


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
// TODO: move LocalStorage calls here
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
      state.num1 = deal1() // deal next num from current deck
      state.num2 = getRandom(state.num2)
      state.dice1 = getRandom(state.dice1, 1, 5)
      state.dice2 = getRandom(state.dice2, 1, 5)
      state.buffer = ''
      // state.ticks = 0
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
      let sublevel = ''
      let index = state.currentLevel.index
      const newLevel = get(o, 'level', '')
      if (newLevel) {
        index = newLevel
      }
      if (index.length > 1) {
        sublevel = index.substring(1, 2)
      }
      // get a new dealer with the correct deck
      const deckName = 'deck' + sublevel.toUpperCase()
      deal1 = getDealer(eval(deckName)) // eslint-disable-line
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
