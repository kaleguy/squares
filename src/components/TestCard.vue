<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin: auto;width:400px">
      <div class="square-holder">
        <answergrid v-if="mode==='p'"></answergrid>
        <div
          style="width:340px; margin-left:auto; margin-right: auto; margin-top:6px"
          v-if="mode==='t'">
          <dots></dots>
          <timebar></timebar>
        </div>
      </div>
      <div id="toggleh" v-if="op!=='s'">
        <toggle-button :value="true"
                       :width="80"
                       color="#008000"
                       @change="switchMode"
                       :height="40" :sync="true"/>
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
      <div v-else>
        <div class="math" v-bind:class="errorStateClass">
          <div>{{num1}}</div>
          <div>{{visOperator}} {{num2}}</div>
          <div class="total">{{buffer}}</div>
        </div>
      </div>
      <numpad></numpad>
    </div>
  </div>
</template>


<script>
import DotBar from './Dotbar'
import NumPad from './NumPad'
import TimeBar from './TimeBar'
import Dice from './Dice'
import AnswerGrid from './AnswerGrid'
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
    answergrid: AnswerGrid
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
      this.$store.commit('SETMODE', { mode })
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
      return this.$store.state.currentLevel.index
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
HTML, BODY
  width: 100%
  max-width: 100%
  height: 100%
#toggleh
  margin-top: 70px
  margin-left: 20px
  -webkit-transform: rotate(90deg)
  -moz-transform: rotate(90deg)
  -o-transform: rotate(90deg)
  -ms-transform: rotate(90deg)
  transform: rotate(90deg)
  float: left
.smath
  max-width: 400px
  margin-left: auto
  margin-right: auto
  height: 160px
  margin-bottom: 8px
  padding-top: 30px
.math
  // box-shadow: 2px 2px 5px #888888;
  font-size: 3.5em
  font-family: verdana
  font-weight: bold
  color: #00f
  border: 2px solid blue
  max-width: 300px
  width: 3em
  margin-left: auto
  margin-right: auto
  border-radius: 20px
  margin-bottom: 8px
  padding: 0px
  line-height: .95em
  padding-right: 30px
  height: 3.5em
  DIV
    text-align: right
    //border: 1px solid red
    margin-left: 30px
.total
  border-top: 10px solid blue
  //width: 160px
  //float: right
  padding-top: 5px
  margin-top: 12px
DIV.dtable
  display: inline-block
  height: 122px
  width: 122px
.error
  color: red
.square-holder
  height: 106px
  border: 1px solid #fff
</style>
