<template>
  <div class="page">
    <div class="card-screen">
      <div class="square-holder">
        <answergrid v-if="mode==='p'"></answergrid>
        <div class="clock-holder" v-if="mode==='t'">
          <dots></dots>
          <timebar></timebar>
        </div>
      </div>

      <div class="problem-row">
        <!-- The way out, the clock's switch and the facts: everything about
             the round rather than about the answer being typed. The way out
             came off the keypad's bottom left corner. -->
        <div class="problem-tools">
          <button type="button" class="tool-back" @click="back" aria-label="Back">
            <leftarrow width="46" tight></leftarrow>
          </button>
          <div id="toggleh">
            <div class="toggle-rot">
              <toggle-button :value="mode === 't'"
                             :width="80"
                             :color="{checked: 'var(--answer)', unchecked: 'var(--operand)'}"
                             @change="switchMode"
                             :height="40" :sync="true"/>
            </div>
          </div>
          <!-- An outline, not a tile: the switch above it is a control you
               reach for mid-round and the arrow above that is the way out,
               while this is a thing to go and read. -->
          <button type="button" class="question-button" @click="facts"
                  aria-label="Facts">i</button>
        </div>

        <div class="math" v-bind:class="errorStateClass">
          <div>{{num1}}</div>
          <div>{{visOperator}} {{num2}}</div>
          <div class="total">{{buffer}}</div>
        </div>

        <tickcounter @explain="tip = true"></tickcounter>
      </div>

      <numpad></numpad>
    </div>

    <scoretip v-if="tip" @close="tip = false"></scoretip>
  </div>
</template>

<script>
import * as analytics from '../lib/analytics'
import DotBar from './Dotbar'
import NumPad from './NumPad'
import TimeBar from './TImeBar'
import AnswerGrid from './AnswerGrid'
import TickCounter from './TickCounter'
import LeftArrow from './LeftArrow'
import ScoreTip from './ScoreTip'
import { glyphFor } from '../lib/levels'

const vm = {
  name: 'testcard',
  components: {
    numpad: NumPad,
    dots: DotBar,
    timebar: TimeBar,
    answergrid: AnswerGrid,
    tickcounter: TickCounter,
    leftarrow: LeftArrow,
    scoretip: ScoreTip
  },
  data () {
    return {
      tip: false
    }
  },
  methods: {
    switchMode: function (v) {
      const mode = v.value ? 't' : 'p'
      if (window.mytimer) {
        this.$store.commit('RESETALL')
        window.clearInterval(window.mytimer)
        window.mytimer = null
      }
      this.$store.commit('SETMODE', { mode })
      analytics.capture('mode set', { mode: mode, in: 'steps' })
    },
    facts: function () {
      this.$router.replace('/facts/' + this.operator + '/' + this.level)
    },
    back: function () {
      this.$router.replace('/menu/' + this.operator)
    }
  },
  computed: {
    errorStateClass () {
      return this.$store.state.errorState ? 'error' : ''
    },
    mode () {
      return this.$store.state.mode || 't'
    },
    op () {
      return this.$store.state.currentLevel.op
    },
    // The card dealt is the answer for minus and divide, which read their
    // tables backwards, so what is shown first is built back up from it.
    num1 () {
      const card = this.$store.state.num1
      if (this.op === '-') { return card + +this.num2 }
      if (this.op === 'd') { return card * +this.num2 }
      return card
    },
    // The second operand comes from the level, not from the deck. The index
    // is a digit, or a digit and the d the records are kept under.
    num2 () {
      return this.$store.state.currentLevel.index.substring(0, 1)
    },
    buffer () {
      return this.$store.state.buffer
    },
    visOperator () {
      return glyphFor(this.operator)
    },
    operator () {
      return this.$route.params.operator || '+'
    },
    level () {
      return this.$route.params.level || '2'
    }
  },
  mounted () {
    const level = this.level
    const operator = this.operator
    this.$store.commit('RESETALL', { operator, level })
  }
}

export default vm
</script>

<style lang="sass">
.card-screen
  width: 358px
  margin: 0 auto
.problem-row
  display: flex
  align-items: flex-start
  justify-content: center
  gap: 20px
  padding-bottom: 4px
// Ten apart, not sixteen: at sixteen the three of them came to exactly the
// height of the card beside them, and the i finished flush against the top
// of the keypad.
.problem-tools
  display: flex
  flex-direction: column
  align-items: center
  gap: 10px
  width: 48px
  padding-top: 2px
.tool-back
  display: flex
  align-items: center
  justify-content: center
  width: 46px
  height: 44px
  padding: 0
  border: none
  background: transparent
  color: var(--ink)
  cursor: pointer
  DIV
    display: flex
    line-height: 0
#toggleh
  position: relative
  width: 40px
  height: 80px
  margin: 0
.toggle-rot
  position: absolute
  width: 80px
  height: 40px
  left: 50%
  top: 50%
  transform: translate(-50%, -50%) rotate(90deg)
.question-button
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  width: 44px
  height: 44px
  padding: 0
  border: 3px solid var(--ink)
  border-radius: 50%
  background: transparent
  color: var(--ink)
  font-family: inherit
  font-size: 22px
  font-weight: 700
  line-height: 1
  cursor: pointer
  user-select: none
// The numbers are the size they were; what came off is the air around them,
// and it went to the keys below. Three lines of 58 and the rule fit the sum
// in the card with the same gap above the first digit as below the last.
.math
  box-sizing: border-box
  width: 222px
  height: 200px
  padding: 7.5px 30px 0 30px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-size: 64px
  font-weight: 700
  font-variant-numeric: tabular-nums
  line-height: 58px
  overflow: hidden
  DIV
    height: 58px
    text-align: right
.total
  margin-top: 6px
  padding-top: 9px
  border-top: 6px solid var(--ink)
// The border turns red; the lip under it does not. The lip is a shadow, and
// a red one read as three more points of border along the bottom edge, which
// is the edge nearest the keys.
.math.error
  color: var(--miss)
  border-color: var(--miss)
  .total
    border-top-color: var(--miss)
.square-holder
  // The dots with their clock and the practice grid are different heights, so
  // the problem sat wherever the one on show happened to end. One slot of a
  // fixed height holds either, and it carries the gap down to the problem too,
  // which is why the row below adds none.
  height: 152px
.clock-holder
  width: 340px
  height: 100%
  margin: 0 auto
  padding-top: 6px
  box-sizing: border-box
  display: flex
  flex-direction: column
  // The dots and the clock sit together just above the problem; the one
  // spring, above the dots, takes whatever the level does not need.
  > div:first-child
    margin-top: auto
  > div:last-child
    margin-top: 14px
    margin-bottom: 14px
    .timebar
      margin-bottom: 0
</style>
