<template>
  <div class="ftp">
    <div class="factr">
          <div
            class="acell"
            v-for="item in list2"
            bind-id="$index"
            v-bind:class="num1Class(item)"
            bind-data="item">{{cnum(item)}}
          </div>
    </div>
    <div class="factr">
      <div
        class="acell"
        v-for="item in list2"
        bind-id="$index"
        v-bind:class="num2Class(item)"
        bind-data="item">{{item}}
      </div>
    </div>
  </div>
 </template>

<script>
import _ from 'lodash'
const vm = {
  name: 'factrowplus',
  props: {
    blank: Boolean,
    num1: Number,
    num2: Number,
    r: Boolean,
    mode: String
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
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
    num1Class (i) {
      if (this.blank) {
        return 'numerand00'
      }
      let class1 = 'numerand2'
      let class2 = 'numerand1'
      if (this.r) {
        class1 = 'numerand1'
        class2 = 'numerand2'
      }
      if (i <= this.num1 + 1) { return class1 }
      if (i - 1 > this.num1 && i <= (this.num1 + this.num2) + 1) {
        return class2
      }
      return 'numerand00'
    },
    num2Class (i) {
      if (this.blank) {
        return 'numerand00'
      }
      if (i <= this.num1 + 1) { return 'numerandb' }
      if (i - 1 > this.num1 && i <= (this.num1 + this.num2) + 1) {
        return 'numerandb'
      }
      return 'numerand00'
    },
    cnum (i) {
      if (this.blank) { return i }
      if (i - 1 > this.num1 && i <= (this.num1 + this.num2) + 1) {
        return i - this.num1 - 1
      }
      return i
    }
  },
  computed: {
    list1 () {
      return _.range(1, 10)
    },
    list2 () {
      const max = 9 + this.visLevel / 1 + 1
      return _.range(1, max)
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
.ftp
  position: relative
.numerand1
  background: orange
.activen
  background: blue
  color: #fff
.product
  background: green
  color: #fff
.numerand2
  background: blue
  color: #fff
.numerandb
  background: green
  color: #ffffff
.numerand00
  background: #fff
  color: #fff
.active
  background: green
  font-weight: bold
  color: #fff
.fheading
  font-size: 40px
  font-weight: bold
  color: #fff
  margin-top: 40px
  width: 300px
  margin-left: auto
  margin-right: auto
  padding-left: 24px
  DIV
    width: 60px
    margin: 0
    border-radius: 6px
    display: inline-block
  .large-operator
    color: #000
    width: 30px
.fact-table
  cursor: pointer
  // width: 1340px
  border: 1px solid #fff
  margin-top: 30px
  position: relative
  margin-left: auto
  margin-right: auto
  .toperator
    padding: 6px
    font-weight: bold
    font-size: 2em
    line-height: 1
.acell
  width: 24px
  height: 24px
  display: inline-block
  line-height: 24px
  border-left: 1px solid #fff
  border-bottom: 1px solid #fff
  font-weight: bold
.factr
  // width: 524px
  margin-left: auto
  margin-right: auto
</style>
