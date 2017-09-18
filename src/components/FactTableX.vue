<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
  <div class="xtable"
       @click="goto()"
       style="cursor:pointer;margin-top:-90px;">
    <div class="xtitle">
      &#x00d7; {{level}}
    </div>
    <div class="cell"
         v-for="item, index in list" :key="item.id"
         bind-id="$index"
         bind-data="item"
         v-bind:class="num1Class(item)"
         :num1="index"
         :num2="level">{{item}}</div>
  </div>
    </div>
  </div>
 </template>

<script>
import FactRowPlus from './FactRowPlus'
import _ from 'lodash'
const vm = {
  name: 'facttableplus',
  components: {
    factrowplus: FactRowPlus
  },
  data () {
    return {
      flip: false
    }
  },
  methods: {
    switchMode: function (v) {
      console.log(v)
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
    isActive (i) {
      i = i + ''
      if (i === this.level) {
        return true
      }
      return false
    },
    num1Class (i) {
      if (i % this.level === 0) { return 'numerand1x' }
      return 'numerand0'
    },
    num2Class () {
      if (this.operator === 'd') { return 'numerand1x' }
      if (this.operator === '-') { return 'numerand1x' }
      return 'numerand2'
    },
    num3Class (r) {
      r = r + ''
      if (r !== this.level) { return }
      if (this.operator === 'd') { return 'numerand1x' }
      if (this.operator === '-') { return 'numerand1x' }
      return 'product'
    }
  },
  computed: {
    count () {
      return 10
    },
    operator () {
      //  let op = this.$route.params.operator || '+'
      return 'X'
    },
    level () {
      return this.$route.params.level / 1 || 1
    },
    list () {
      return _.range(1, 101)
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
.xtitle
  font-size: 60px
  font-weight: bold
  font-family: "Avenir Next"
.xtable
  width: 350px
  margin-left: auto
  margin-right: auto
.factrow
  margin-bottom: 0px
.cell
  width: 34px
  height: 34px
  display: inline-block
  line-height: 34px
  border-left: 1px solid #fff
  border-bottom: 1px solid #fff
  font-weight: bold
.numerand0
  color: #ffffff
  background: #000
.numerand1x
  color: #ffffff
  background: blue
</style>
