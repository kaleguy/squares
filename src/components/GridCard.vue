<template>
  <div class="page">
    <div class="grid-round">
      <!-- The switch and the counter flank the board, the way they flank the
           problem on a Steps card. The board is the tallest thing here, and
           the room beside it was empty. -->
      <div class="grid-top">
        <div class="grid-tools">
          <div class="grid-toggle">
            <div class="grid-toggle-rot">
              <toggle-button :value="mode === 't'"
                             :width="80"
                             :color="{checked: 'var(--answer)', unchecked: 'var(--operand)'}"
                             @change="switchMode"
                             :height="40" :sync="true"/>
            </div>
          </div>
          <div class="grid-info" @click="openFacts">i</div>
        </div>

        <div class="grid-middle" :style="{ width: boardSize + 'px' }">
          <div class="grid-nothing" v-if="practising && !practice.length"
               :style="{ height: boardSize + 'px' }">
            This is practice mode, which is for practicing missed items.
            You don't have any missed items yet.
          </div>
          <div class="grid-board" v-else :style="{ '--gcell': cell + 'px' }">
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

          <!-- Practice is not timed, so there is no clock to show. Its room
               is kept, so that the problem and the keypad stay where they
               were when the switch moves. -->
          <div class="grid-clock" :class="{ hidden: practising }">
            <div class="grid-clock-fill"
                 :class="{ error: errorState }"
                 :style="{ width: clockWidth }"></div>
          </div>
        </div>

        <div class="grid-counter">
          <div>{{practising ? ' ' : remaining}}</div>
          <div>{{recent[0] === undefined ? ' ' : recent[0]}}</div>
          <div>{{recent[1] === undefined ? ' ' : recent[1]}}</div>
        </div>
      </div>

      <!-- Nothing to answer means nothing to show. -->
      <div class="grid-problem" :class="{ error: errorState }" v-if="current">
        <span>{{firstNum}} {{visOperator}} {{current.b}} =</span>
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
// card does in Steps. The switch beside the board drops out of the timing and
// into practice, which drills only what was missed lately.
import Keypad from './Keypad'
import PassCard from './PassCard'
import { titleCase } from '../lib/name'
import {
  GRID_SECONDS, GRID_SIDE, shuffledFacts, firstOf, answerOf, factKey,
  factCounts, gridRecords, saveGridRecords, gridBest, practiceFacts, recordMiss
} from '../lib/grid'

const moment = require('moment')
// The board is the same size in both modes. Growing it for practice moved
// every square under the finger that had just tapped one.
const CELL = 22

const vm = {
  name: 'gridcard',
  components: {
    keypad: Keypad,
    passcard: PassCard
  },
  data () {
    return {
      mode: 't',
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
      clearOnNextPress: false,
      // Practice: the facts to drill, both ways round, and how each stands.
      practice: [],
      practiceIndex: 0,
      right: {},
      wrong: {}
    }
  },
  methods: {
    // Back to an empty board and a full clock, with the facts in a new order.
    reset: function () {
      this.clearTimers()
      this.facts = shuffledFacts(this.op)
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
    // Practice drills what was most recently missed; test times the table.
    // Changing mode starts whichever one is asked for from the beginning.
    switchMode: function (e) {
      const on = e && e.value !== undefined ? e.value : e
      const next = on ? 't' : 'p'
      if (next === this.mode) { return }
      this.mode = next
      this.buffer = ''
      this.clearOnNextPress = false
      this.missed = null
      if (next === 'p') {
        this.clearTimers()
        this.practice = practiceFacts(this.username, this.op)
        this.practiceIndex = 0
        this.right = {}
        this.wrong = {}
      } else {
        this.reset()
      }
    },
    clearTimers: function () {
      if (this.timer) { window.clearInterval(this.timer); this.timer = null }
    },
    tick: function () {
      if (this.mode !== 't') { return }
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
    openFacts: function () {
      this.$router.replace('/gridfacts/' + this.op)
    },
    // Timing: filled green as the facts come good, and red on the one the run
    // went wrong at. Practice: amber for a fact waiting to be drilled, then
    // green or red for how it has just been answered.
    squareClass: function (r, c) {
      const fact = { a: r, b: c }
      if (!factCounts(this.op, fact)) { return 'skip' }
      const key = factKey(fact)
      if (this.practising) {
        if (this.right[key]) { return 'done' }
        if (this.wrong[key]) { return 'missed' }
        return this.pending[key] ? 'pending' : ''
      }
      if (this.missed && this.missed.a === r && this.missed.b === c) { return 'missed' }
      return this.filled[key] ? 'done' : ''
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

      if (this.practising) {
        // Nothing is timed and nothing is lost here. A right answer greens
        // that square and moves on; a wrong one reds it and waits, and the
        // whole list comes round again either way.
        if (entered === total) {
          this.$delete(this.wrong, factKey(fact))
          this.$set(this.right, factKey(fact), true)
          this.buffer = ''
          this.practiceIndex = (this.practiceIndex + 1) % this.practice.length
        } else {
          this.$delete(this.right, factKey(fact))
          this.$set(this.wrong, factKey(fact), true)
          this.clearOnNextPress = true
        }
        return
      }

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
        recordMiss(this.username, this.op, fact)
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
    practising () {
      return this.mode === 'p'
    },
    // A wrong answer reddens the problem as well as its square, the way a
    // missed card does, so the mistake is read where it was made.
    errorState () {
      if (this.practising) {
        return !!(this.current && this.wrong[factKey(this.current)])
      }
      return !!this.missed
    },
    cell () {
      return CELL
    },
    boardSize () {
      return this.cell * (GRID_SIDE + 1)
    },
    pending () {
      const marks = {}
      this.practice.forEach(f => { marks[factKey(f)] = true })
      return marks
    },
    current () {
      if (this.practising) {
        if (!this.practice.length) { return null }
        return this.practice[this.practiceIndex % this.practice.length]
      }
      return this.dealt < this.facts.length ? this.facts[this.dealt] : null
    },
    firstNum () {
      return this.current ? firstOf(this.op, this.current) : ''
    },
    remaining () {
      return Math.max(0, GRID_SECONDS - this.elapsed)
    },
    // The scores of the two most recent rounds at this table.
    recent () {
      if (!this.username) { return [] }
      const mine = gridRecords(this.username)[this.op] || {}
      return Object.keys(mine).sort().reverse()
        .map(d => Math.max(0, GRID_SECONDS - mine[d]))
    },
    clockWidth () {
      const done = Math.min(1, this.elapsed / GRID_SECONDS)
      return Math.round(this.boardSize * done) + 'px'
    },
    passDetail () {
      const taken = GRID_SECONDS - this.score
      const mm = Math.floor(taken / 60)
      const ss = taken % 60
      return 'All ' + this.facts.length + ' facts in ' + mm + ':' + (ss < 10 ? '0' : '') + ss
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
.grid-round
  width: 360px
  margin-left: auto
  margin-right: auto
.grid-top
  display: flex
  align-items: flex-start
  justify-content: center
  gap: 12px
  margin-bottom: 12px
.grid-tools
  display: flex
  flex-direction: column
  align-items: center
  gap: 14px
  width: 48px
.grid-toggle
  position: relative
  width: 40px
  height: 80px
  margin: 0
.grid-toggle-rot
  position: absolute
  width: 80px
  height: 40px
  left: 50%
  top: 50%
  transform: translate(-50%, -50%) rotate(90deg)
.grid-info
  box-sizing: border-box
  width: 44px
  height: 44px
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--ink)
  color: var(--tile)
  font-family: inherit
  font-size: 28px
  font-weight: 700
  line-height: 44px
  text-align: center
  cursor: pointer
  user-select: none
.grid-counter
  display: flex
  flex-direction: column
  gap: 8px
  width: 48px
  DIV
    box-sizing: border-box
    width: 44px
    height: 44px
    border: 2px solid var(--line)
    border-radius: 8px
    box-shadow: 0 2px 0 var(--lip)
    background: var(--tile)
    color: var(--ink)
    font-size: 18px
    font-weight: 700
    line-height: 40px
    text-align: center
.grid-nothing
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  padding: 0 8px
  color: var(--ink)
  font-size: 17px
  line-height: 1.35
  text-align: center
.grid-board
  margin: 0 auto
.grid-row
  display: flex
.grid-corner, .grid-head
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: var(--gcell)
  height: var(--gcell)
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
  width: calc(var(--gcell) - 2px)
  height: calc(var(--gcell) - 2px)
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
  &.pending
    border-color: var(--operand)
    background: var(--operand)
  // The ones the table leaves out: there, but not in play.
  &.skip
    border-color: var(--track)
    background: var(--track)
.grid-clock
  height: 12px
  margin: 10px 0 0
  background: var(--track)
  &.hidden
    visibility: hidden
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
