<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
    <table style="margin-bottom:10px;margin-top:-10px" align="center"><tr><td>
    <span class="ftitle">+{{visLevel}}</span>
    </td><td>
    <div id="toggle">
      <toggle-button :value="true"
                     :width="80"
                     :color="{unchecked: 'orange', checked: 'blue'}"
                     @change="switchMode"
                     :height="40"
                     :sync="true"/>
    </div>
    </td></tr></table>
    <div
      @click="goto()"
      style="cursor:pointer">
      <factrowplus
        v-if="flip"
        class="factrow"
        v-for="item, index in list" :key="item.id"
        bind-id="$index"
        bind-data="item"
        :num1="index" :num2="visLevel" :r="true"></factrowplus>
      <factrowplus
        v-if="!flip"
        class="factrow"
        v-for="item, index in list" :key="item.id"
        bind-id="$index"
        bind-data="item"
        :num1="visLevel - 1" :num2="index + 1"></factrowplus>
      </div>
    </div>
  </div>
 </template>

<script>
import FactRowPlus from './FactRowPlus'
const vm = {
  name: 'facttableplus',
  components: {
    factrowplus: FactRowPlus
  },
  data () {
    return {
      flip: false,
      list2: [ 1, 2, 3, 5, 6, 7 ],
      list: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
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
      if (r !== this.visLevel) { return }
      if (this.operator === 'd') { return 'numerand1' }
      if (this.operator === '-') { return 'numerand1' }
      return 'product'
    }
  },
  computed: {
    count () {
      return 10
    },
    operator () {
      // let op = this.$route.params.operator || '+'
      return '+'
    },
    level () {
      let s = this.$route.params.level
      // s = s.substring(0, 1)
      return s || 1
    },
    visLevel () {
      return this.level.substring(0, 1) / 1
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
<style lang="sass" scoped>
.factrow
  margin-bottom: 0
.ftitle
  display: inline-block
  font-family: "Avenir Next"
  font-weight: bold
  font-size: 60px
  line-height: 60px
</style>
