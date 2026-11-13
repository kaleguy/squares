import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'lodash'
import { titleCase, setLastUser } from '../lib/name'
import { weightedDeck } from '../lib/facts'

// randomize the order of elements in a given array
const shuffle = require('shuffle-array')

Vue.use(Vuex)

let deck = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

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


// ========= The Store ===============
// TODO: move LocalStorage calls here
export default new Vuex.Store({
  state: {
    currentLevel: {
      op: '',
      index: 0
    },
    passedLevels: {},
    num1: 0,
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
      state.buffer = ''
      // state.ticks = 0
      if (!o) { return }
      state.currentLevel.index = o.level
      state.currentLevel.op = o.operator
      state.errorState = false
    },
    // A wrong answer ends the run, so the round starts over from the top:
    // the count, the clock and the bar all go back to the beginning. The bar
    // reads its width from `time`, so zeroing that here is what winds it back;
    // without `ticks` the round would restart on paper while the score carried
    // on from where the mistake happened.
    SETERRORSTATE (state) {
      state.errorState = true
      state.count = 0
      state.ticks = 0
      state.time = 0
    },
    CLEARERRORSTATE (state) {
      state.errorState = false
      state.buffer = ''
    },
    // The clock is read off the real clock and set here, rather than counted
    // up a tick at a time, so a second is a second.
    SETTICKS (state, o) {
      state.ticks = o.ticks
    },
    ADDTOBUFFER (state, o) {
      const digit = String(o.num == null ? '' : o.num).trim()
      if (!/^[0-9]$/.test(digit)) return
      state.buffer = (String(state.buffer).replace(/\D/g, '') + digit).slice(-2)
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
      let index = state.currentLevel.index
      const newLevel = get(o, 'level', '')
      if (newLevel) {
        index = newLevel
      }
      // Get a new dealer with the level's nine cards, weighted towards
      // whatever has been going wrong at this level.
      const dealOp = get(o, 'operator', state.currentLevel.op)
      deal1 = getDealer(weightedDeck(state.username, dealOp, index))
      state.num1 = deal1(true)
      state.buffer = ''
      state.mode = 't'
      if (!o) { return }
      state.currentLevel.index = o.level
      state.currentLevel.op = o.operator
    },
    SETPASS (state, o) {
      Vue.set(state.passedLevels, o.key, 1)
    },
    CLEARPASS (state, o) {
      Vue.delete(state.passedLevels, o.key)
    },
    // Whoever is playing is who the app opens on next time. An empty name
    // is a user deleted out from under the app, and clears it.
    SETUSER (state, o) {
      state.username = titleCase(o.username)
      setLastUser(state.username)
    }
  },
  actions: {
    dummy (context, o) {
    }
  }
})
