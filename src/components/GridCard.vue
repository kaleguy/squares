<template>
  <div class="page">
    <div class="grid-round">
      <div class="grid-board">
        <div class="grid-row">
          <div class="grid-corner">{{visOperator}}</div>
          <div class="grid-head" v-for="c in side" :key="'c' + c">{{c}}</div>
        </div>
        <div class="grid-row" v-for="r in side" :key="'r' + r">
          <div class="grid-head">{{r}}</div>
          <div v-for="c in side" :key="'s' + r + '-' + c"
               class="grid-square"
               :class="squareClass(r, c)"></div>
        </div>
      </div>

      <div class="grid-clock">
        <div class="grid-clock-fill"
             :class="{ error: missed }"
             :style="{ width: clockWidth }"></div>
      </div>

      <div class="grid-problem" :class="{ error: missed }">
        <span v-if="current">{{firstNum}} {{visOperator}} {{current.b}} =</span>
        <span class="grid-answer">{{buffer}}</span>
      </div>

      <keypad @digit="onDigit" @back="leave" @clear="clearBuffer"></keypad>
    </div>

    <passcard v-if="passed"
              title="Full board"
              :score="score"
              :detail="passDetail"
              :is-best="isBest"
              again="Again"
              @again="restart"
              @done="done"></passcard>
  </div>
</template>

<script>
/* global playAudio */
// A Grid round: the whole table in one sitting, against a four minute clock,
// with a square for every fact. A wrong answer halts the run on that fact
// until the right answer is given, and then starts it over, the way a missed
// card does in Steps.
import Keypad from './Keypad'
import PassCard from './PassCard'
import { titleCase } from '../lib/name'
import {
  GRID_SECONDS, GRID_SIDE, shuffledFacts, firstOf, answerOf, factKey,
  gridRecords, saveGridRecords, gridBest
} from '../lib/grid'

const moment = require('moment')
const BOARD = 220

const vm = {
  name: 'gridcard',
  components: {
    keypad: Keypad,
    passcard: PassCard
  },
  data () {
    return {
      facts: [],
      dealt: 0,
      filled: {},
      missed: null,
      elapsed: 0,
      buffer: '',
      passed: false,
      score: 0,
      isBest: false,
      side: GRID_SIDE,
      timer: null,
      // The wrong answer is left on show. The next digit pressed clears it,
      // as it does on a Steps card.
      clearOnNextPress: false
    }
  },
  methods: {
    // Back to an empty board and a full clock, with the facts in a new order.
    reset: function () {
      this.clearTimers()
      this.facts = shuffledFacts()
      this.dealt = 0
      this.filled = {}
      this.missed = null
      this.clearOnNextPress = false
      this.elapsed = 0
      this.buffer = ''
      this.passed = false
      const me = this
      this.timer = window.setInterval(function () { me.tick() }, 1000)
    },
    clearTimers: function () {
      if (this.timer) { window.clearInterval(this.timer); this.timer = null }
    },
    tick: function () {
      this.elapsed += 1
      // Out of time is not a miss: nothing was got wrong, so nothing is
      // marked. The run simply starts again.
      if (this.elapsed >= GRID_SECONDS) { this.reset() }
    },
    restart: function () {
      this.reset()
    },
    done: function () {
      this.$router.replace('/grid/')
    },
    leave: function () {
      this.$router.replace('/grid/')
    },
    squareClass: function (r, c) {
      const fact = { a: r, b: c }
      if (this.missed && this.missed.a === r && this.missed.b === c) { return 'missed' }
      return this.filled[factKey(fact)] ? 'done' : ''
    },
    onDigit: function (num) {
      if (!this.current) { return }
      if (this.clearOnNextPress) { this.buffer = ''; this.clearOnNextPress = false }
      if (this.buffer.length >= 2) { return }
      this.buffer += num
      this.check()
    },
    clearBuffer: function () {
      this.buffer = ''
      this.clearOnNextPress = false
    },
    check: function () {
      const fact = this.current
      if (!fact) { return }
      const total = answerOf(this.op, fact)
      const entered = +this.buffer
      // A two digit answer needs its second digit before it is judged.
      if (entered < 10 && total > 9) { return }
      if (entered === total) {
        // Getting the missed one right is what frees the run, and the run it
        // frees starts from an empty board.
        if (this.missed) { this.reset(); return }
        this.$set(this.filled, factKey(fact), true)
        this.dealt += 1
        this.buffer = ''
        if (Object.keys(this.filled).length === this.facts.length) { this.finish() }
      } else {
        // The run halts here, on the fact it went wrong on, until that fact
        // is answered. Nothing moves on by itself.
        this.missed = fact
        this.clearOnNextPress = true
        if (this.timer) { window.clearInterval(this.timer); this.timer = null }
      }
    },
    // The board is full. Score what is left of the clock, keep it if it is
    // this table's best, and say so.
    finish: function () {
      this.clearTimers()
      this.score = Math.max(0, GRID_SECONDS - this.elapsed)
      playAudio('yay')
      const name = this.$store.state.username
      if (name) {
        const all = gridRecords(name)
        this.isBest = this.score > gridBest(name, this.op, GRID_SECONDS)
        const mine = all[this.op] || {}
        mine[moment().format('YYYY-MM-DD-HH-mm-ss')] = this.elapsed
        all[this.op] = mine
        saveGridRecords(name, all)
      }
      this.passed = true
    }
  },
  computed: {
    op () {
      return this.$route.params.operator || '+'
    },
    current () {
      return this.dealt < this.facts.length ? this.facts[this.dealt] : null
    },
    firstNum () {
      return this.current ? firstOf(this.op, this.current) : ''
    },
    clockWidth () {
      const done = Math.min(1, this.elapsed / GRID_SECONDS)
      return Math.round(BOARD * done) + 'px'
    },
    passDetail () {
      const total = GRID_SIDE * GRID_SIDE
      const taken = GRID_SECONDS - this.score
      const mm = Math.floor(taken / 60)
      const ss = taken % 60
      return 'All ' + total + ' facts in ' + mm + ':' + (ss < 10 ? '0' : '') + ss
    },
    visOperator () {
      if (this.op === 'd') { return '÷' }
      if (this.op === 'X') { return '×' }
      if (this.op === '-') { return '−' }
      return this.op
    },
    username () {
      return titleCase(this.$store.state.username)
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
      return
    }
    this.reset()
  },
  beforeDestroy () {
    this.clearTimers()
  }
}

export default vm
</script>

<style lang="sass">
$cell: 22px
.grid-round
  width: 360px
  margin-left: auto
  margin-right: auto
.grid-board
  width: $cell * 10
  margin: 0 auto 10px
.grid-row
  display: flex
.grid-corner, .grid-head
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: $cell
  height: $cell
  font-size: 13px
  font-weight: 700
  line-height: 1
.grid-corner
  background: var(--ink)
  color: var(--tile)
  font-size: 15px
.grid-head
  background: var(--operand)
  color: #1A2744
.grid-square
  box-sizing: border-box
  width: $cell - 2px
  height: $cell - 2px
  margin: 1px
  border: 1.5px solid var(--line)
  border-radius: 2px
  background: var(--tile)
  &.done
    border-color: var(--answer)
    background: var(--answer)
  &.missed
    border-color: var(--miss)
    background: var(--miss)
.grid-clock
  width: $cell * 10
  height: 12px
  margin: 0 auto 12px
  background: var(--track)
.grid-clock-fill
  height: 100%
  width: 0
  background: var(--answer)
  &.error
    background: var(--miss)
.grid-problem
  display: flex
  align-items: center
  justify-content: center
  gap: 10px
  box-sizing: border-box
  width: 300px
  height: 76px
  margin: 0 auto 8px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-size: 44px
  font-weight: 700
  font-variant-numeric: tabular-nums
  line-height: 1
  &.error
    color: var(--miss)
    border-color: var(--miss)
    box-shadow: 0 3px 0 var(--miss)
.grid-answer
  min-width: 54px
  text-align: left
</style>
