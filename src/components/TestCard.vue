<template>
  <div style="display: flex; flex-direction: column; height: 100%;">
    <div style="margin: auto;">
      <dots></dots>
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
        <div class="math">
          <div>{{num1}}</div>
          <div>{{visOperator}} {{num2}}</div>
          <div class="total">{{buffer}}</div>
        </div>
      </div>
      <timebar></timebar>
      <numpad></numpad>
    </div>
  </div>
</template>


<script>
import DotBar from './Dotbar'
import NumPad from './NumPad'
import TimeBar from './TimeBar'
import Dice from './Dice'
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
    dice: Dice
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
    }
  },
  computed: {
    op () {
      return this.$store.state.currentLevel.op
    },
    num1 () {
      console.log('Dd', this.op)
      let num = this.$store.state.num1
      if (this.op === '-') {
        num = this.$store.state.num1 + +this.num2
      }
      if (this.op === 'd') {
        console.log('D', this.op)
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
    this.$store.commit('RESET', { operator, level })
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
.smath
  max-width: 400px
  margin-left: auto
  margin-right: auto
  height: 160px
  margin-bottom: 8px
  padding-top: 30px
.math
  box-shadow: 2px 2px 5px #888888;
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

</style>
