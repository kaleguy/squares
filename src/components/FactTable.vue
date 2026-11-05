<template>
  <div class="page">
    <div class="fact-screen">
      <div class="fact-head">
        <span class="ftitle">{{visOperator}}{{visLevel}}</span>
        <div id="toggle" v-if="!isTimes">
          <toggle-button :value="!flip"
                         :width="80"
                         :color="{unchecked: 'var(--operand)', checked: 'var(--level)'}"
                         @change="switchMode"
                         :height="40"
                         :sync="true"/>
        </div>
      </div>
  <div
    style="position:relative; cursor:pointer"
    @click="goto()">
    <div class="fact-table" style="margin-left:-20px">
       <table align="center">
         <tr class="row">
           <td class="toperator"></td>
           <td v-for="c in 9" v-bind:class="num1Class()">{{c}}</td>
         </tr>
         <tr v-for="r in 9">
           <td class="col" v-bind:class="{activen: isActive(r)}">{{r}}</td>
           <td v-for="c in 9"
               v-bind:class="[num3Class(r), {weak: isWeak(r, c)}]">{{product(r,c)}}</td>
         </tr>
       </table>
    </div>
    <!-- Nine rows of the level's own width, numbered straight through: the
         number ending each row is that row's multiple. -->
    <div class="times-rows" v-if="isTimes">
      <div class="times-row" v-for="r in 9" :key="'t' + r">
        <div class="times-cell"
             v-for="c in levelNum"
             :key="'t' + r + '-' + c"
             v-bind:class="{ product: c === levelNum }">{{(r - 1) * levelNum + c}}</div>
      </div>
    </div>
    <div v-else class="plus-bars">
      <factrowplus
        class="factrow"
        v-for="(item, index) in nine" :key="'b' + index"
        :num1="flip ? index : levelNum - 1"
        :num2="flip ? levelNum : index + 1"
        :r="flip"></factrowplus>
      <factrowplus class="factrow" ruler></factrowplus>
    </div>
  </div>
      <div class="fact-foot"></div>
    </div>
  </div>
 </template>

<script>
import FactRowPlus from './FactRowPlus'
import { getWeights, factKey } from '../lib/facts'

const vm = {
  name: 'facttable',
  components: {
    factrowplus: FactRowPlus
  },
  data () {
    return {
      // Which way round the plus bars are read. The times rows do not flip.
      flip: false,
      nine: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
  },
  methods: {
    switchMode: function (v) {
      this.flip = Boolean(!v.value)
    },
    goto: function () {
      this.$router.replace('/card/' + this.operator + '/' + this.level)
    },
    submit: function () {
    },
    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    },
    product (a, b) {
      let op = this.operator
      if (op === 'd') {
        op = '*'
      }
      if (op === 'X') {
        op = '*'
      }
      if (op === '-') {
        op = '+'
      }
      return eval('a ' + op + ' b')// eslint-disable-line
    },
    // A fact in this level that the dealer is currently favouring. Weights
    // are kept for every level, but ringing the whole table scattered marks
    // across rows this screen is not about; the level's own row is the one a
    // child is here to read.
    isWeak (r, c) {
      if (r + '' !== this.visLevel) { return false }
      return (this.weights[factKey(this.operator, r, c)] || 0) > 0
    },
    isActive (i) {
      i = i + ''
      if (i === this.visLevel) {
        return true
      }
      return false
    },
    num1Class () {
      if (this.operator === 'd') { return 'product' }
      if (this.operator === '-') { return 'product' }
      return 'numerand1'
    },
    num2Class () {
      if (this.operator === 'd') { return 'numerand1' }
      if (this.operator === '-') { return 'numerand1' }
      return 'numerand2'
    },
    num3Class (r) {
      r = r + ''
      if (r !== this.visLevel) { return 'numerand0' }
      if (this.operator === 'd') { return 'numerand1' }
      if (this.operator === '-') { return 'numerand1' }
      return 'product'
    }
  },
  computed: {
    weights () {
      return getWeights(this.$store.state.username)
    },
    count () {
      return 10
    },
    visOperator () {
      if (this.operator === 'd') {
        return '\u00f7'
      }
      if (this.operator === 'X') {
        return '\u00d7'
      }
      if (this.operator === '-') {
        return '\u2212'
      }
      return this.operator
    },
    visOperator2 () {
      if (this.operator === 'X' || this.operator === 'd') {
        return '\u00d7'
      }
      if (this.operator === '-') {
        return '+'
      }
      return this.operator
    },
    operator () {
      let op = this.$route.params.operator || '+'
      return op
    },
    level () {
      return this.$route.params.level || '1'
    },
    visLevel () {
      return this.level.substring(0, 1)
    },
    levelNum () {
      return +this.visLevel || 1
    },
    isTimes () {
      return this.operator === 'X' || this.operator === 'd'
    }
  },
  mounted () {
  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.weak
  box-shadow: inset 0 0 0 3px var(--miss)
.fact-head
  display: flex
  align-items: center
  justify-content: center
  gap: 12px
  // The heading counted towards what the page centres, so the pair of grids
  // sat above centre by half of it. The same height left empty below them
  // evens it up.
  height: 88px
.fact-foot
  height: 88px
.ftitle
  display: inline-block
  font-family: inherit
  font-weight: 700
  color: var(--ink)
  font-size: 52px
  line-height: 1
.factrow
  margin-bottom: 0
.plus-bars, .times-rows
  margin-top: 28px
.times-rows
  display: flex
  flex-direction: column
  align-items: center
.times-row
  display: flex
.times-cell
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: 34px
  height: 28px
  border-right: 1px solid var(--paper)
  border-bottom: 1px solid var(--paper)
  background: var(--ink)
  color: var(--tile)
  font-size: 16px
  font-weight: 700
  line-height: 1
  &.product
    background: var(--answer)
    color: #fff
</style>
