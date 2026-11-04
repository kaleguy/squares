<template>
  <div class="page">
    <div style="width:400px; margin-left:-10px">
      <div class="square-holder">
        <answergrid v-if="mode==='p'"></answergrid>
        <div
          style="width:340px; margin-left:auto; margin-right: auto; margin-top:6px"
          v-if="mode==='t'">
          <dots></dots>
          <timebar></timebar>
        </div>
      </div>
      <div v-if="op==='s'">
        <div class="smath">
          <div v-if="level==1">
            <dice></dice>
          </div>
          <div v-if="level==2">
            <dice v-bind:count="5"></dice>
            <dice></dice>
          </div>
          <div v-if="level==3">
            <dice></dice>
            <dice v-bind:count="dice2"></dice>
          </div>
        </div>
      </div>
      <div v-else class="problem-row">
        <div class="problem-tools">
          <div id="toggleh">
            <div class="toggle-rot">
              <toggle-button :value="mode === 't'"
                             :width="80"
                             :color="{checked: 'var(--level)', unchecked: 'var(--operand)'}"
                             @change="switchMode"
                             :height="40" :sync="true"/>
            </div>
          </div>
          <div
            @click="goto(level)"
            class="question-button">?</div>
        </div>
        <div class="math" v-bind:class="errorStateClass">
          <div>{{num1}}</div>
          <div>{{visOperator}} {{num2}}</div>
          <div class="total">{{buffer}}</div>
        </div>
        <tickcounter></tickcounter>
      </div>
      <numpad></numpad>
    </div>
  </div>
</template>


<script>
import DotBar from './Dotbar'
import NumPad from './NumPad'
import TimeBar from './TImeBar'
import Dice from './Dice'
import AnswerGrid from './AnswerGrid'
import TickCounter from './TickCounter'
const keyBus = {
  key: ''
}
document.onkeypress = function (e) {
  keyBus.key = e.key
}
const vm = {
  name: 'hello',
  components: {
    numpad: NumPad,
    dots: DotBar,
    timebar: TimeBar,
    dice: Dice,
    answergrid: AnswerGrid,
    tickcounter: TickCounter
  },
  data () {
    return {
    }
  },
  methods: {
    submit: function () {
      // console.log('foo')
    },
    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    },
    switchMode: function (v) {
      let mode = 'p'
      if (v.value) { mode = 't' }
      console.log('MODE', mode, v)
      if (window.mytimer) {
        this.$store.commit('RESETALL')
        window.clearInterval(window.mytimer)
      }
      this.$store.commit('SETMODE', { mode })
    },
    goto: function () {
      this.$router.replace('/facts/' + this.operator + '/' + this.level)
    }
  },
  computed: {
    errorStateClass () {
      const errorState = this.$store.state.errorState
      let c = ''
      if (errorState) { c = 'error' }
      return c
    },
    mode () {
      return this.$store.state.mode || 't'
    },
    op () {
      return this.$store.state.currentLevel.op
    },
    num1 () {
      let num = this.$store.state.num1
      if (this.op === '-') {
        num = this.$store.state.num1 + +this.num2
      }
      if (this.op === 'd') {
        num = this.$store.state.num1 * this.num2
      }
      return num
    },
    num2 () {
      const index = this.$store.state.currentLevel.index
      let num = index
      if (index.length > 1) {
        num = index.substring(0, 1)
      }
      return num
    },
    dice2 () {
      return this.$store.state.dice2
    },
    total () {
      return this.$store.state.total
    },
    buffer () {
      return this.$store.state.buffer
    },
    visOperator () {
      if (this.operator === 'd') {
        return '\u00f7'
      }
      if (this.operator === 'X') {
        return '\u00d7'
      }
      return this.operator
    },
    operator () {
      return this.$route.params.operator || '+'
    },
    level () {
      return this.$route.params.level || '1'
    }
  },
  mounted () {
    const level = this.level
    const operator = this.operator
    this.$store.commit('RESETALL', { operator, level })
  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.problem-row
  display: flex
  align-items: flex-start
  justify-content: center
  gap: 20px
  margin-top: 12px
  .math
    margin-left: 0
    margin-right: 0
.problem-tools
  display: flex
  flex-direction: column
  align-items: center
  gap: 14px
  width: 48px
  padding-top: 16px
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
.smath
  max-width: 400px
  margin-left: auto
  margin-right: auto
  height: 160px
  margin-bottom: 8px
  padding-top: 30px
.math
  font-size: 4em
  font-family: inherit
  font-weight: 700
  font-variant-numeric: tabular-nums
  color: var(--ink)
  background-color: var(--tile)
  border: 2px solid var(--line)
  box-shadow: 0 3px 0 var(--lip)
  max-width: 300px
  width: 3em
  margin-left: auto
  margin-right: auto
  border-radius: 8px
  margin-bottom: 8px
  padding: 14px 30px 0 0
  line-height: .95em
  height: 3.5em
  overflow: hidden
  DIV
    text-align: right
    margin-left: 30px
.total
  border-top: 6px solid var(--ink)
  padding-top: 5px
  margin-top: 12px
DIV.dtable
  display: inline-block
  height: 122px
  width: 122px
.math.error
  color: var(--miss)
  border-color: var(--miss)
  box-shadow: 0 3px 0 var(--miss)
  .total
    border-top-color: var(--miss)
.square-holder
  border: 1px solid transparent
.question-button
  width: 44px
  background: var(--ink)
  color: var(--tile)
  font-family: inherit
  font-size: 28px
  height: 44px
  line-height: 44px
  font-weight: 700
  cursor: pointer
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  margin: 0
  position: static
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
</style>
