import Vue from 'vue'
import Vuex from 'vuex'
import { get } from 'lodash'
import { titleCase, setLastUser } from '../lib/name'
import { weightedDeck } from '../lib/facts'

// randomize the order of elements in a given array
const shuffle = require('shuffle-array')

Vue.use(Vuex)

const deck = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

// Shuffle until no card has landed beside another of itself, and the deck
// does not open on `last`, the card just dealt.
//
// A weighted deck holds up to three copies of a card, and a plain shuffle
// puts two of them side by side often enough to notice: a twentieth of all
// deals repeated the problem just answered. The same problem twice running
// reads as the app having lost its place, and the second answer is not
// practice - it is the first answer again, still in the hand.
function spread (deck, last) {
  for (let attempt = 0; attempt < 16; attempt++) {
    shuffle(deck)
    let stuck = false
    for (let i = 0; i < deck.length; i++) {
      const before = i === 0 ? last : deck[i - 1]
      if (deck[i] !== before) { continue }
      // Trade it for a later card that is not the one in front of it.
      // Whatever that breaks is behind the trade and still ahead of this
      // loop, so it gets traded in its turn.
      let j = i + 1
      while (j < deck.length && deck[j] === before) { j++ }
      if (j < deck.length) {
        const card = deck[i]
        deck[i] = deck[j]
        deck[j] = card
      } else {
        stuck = true // nothing but copies of it left to the end of the deck
      }
    }
    if (!stuck) { return }
  }
}

// returns a function that will deal the next card of the deck, in an order
// that never asks the same card twice running. `after` is the card on show,
// which the deck must not open on either.
function getDealer (myDeck, after) {
  let index = -1
  const deck1 = myDeck
  spread(deck1, after)
  return function () {
    index = index + 1 // deal next card
    if (index > deck1.length - 1) {
      // A new order for the next pass through, which must not open on the
      // card this one ended with.
      spread(deck1, deck1[deck1.length - 1])
      index = 0
    }
    return deck1[index]
  }
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
      // The card on show is the one not to open on: a round that starts
      // again, because the clock ran out, should not start again on the
      // problem it was looking at.
      deal1 = getDealer(weightedDeck(state.username, dealOp, index), state.num1)
      state.num1 = deal1()
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
