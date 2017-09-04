<template>
  <div
    style="position:relative"
    @click="goto()">
    <div class="fheading">
      <div class="numerand1">?</div>
      <div class="large-operator">{{visOperator}}</div>
      <div class="numerand2">{{level}}</div>
      <div class="large-operator">=</div>
      <div class="product">?</div>
    </div>
  <div class="fact-table">
     <table align="center">
       <tr class="row">
         <td class="toperator">{{visOperator2}}</td>
         <td v-for="c in 9" v-bind:class="num1Class()">{{c}}</td>
       </tr>
       <tr v-for="r in 9">
         <td class="col" v-bind:class="{activen: isActive(r)}">{{r}}</td>
         <td v-for="c in 9" v-bind:class="num3Class(r)">{{product(r,c)}}</td>
       </tr>
     </table>
  </div>
  </div>
</template>


<script>
const vm = {
  name: 'facttable',
  components: {
  },
  methods: {
    goto: function () {
      this.$router.replace('/card/' + this.operator + '/' + this.level)
    },
    submit: function () {
      // console.log('foo')
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
      console.log('OP', op)
      return eval('a ' + op + ' b')// eslint-disable-line
    },
    isActive (i) {
      i = i + ''
      if (i === this.level) {
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
      if (r !== this.level) { return }
      if (this.operator === 'd') { return 'numerand1' }
      if (this.operator === '-') { return 'numerand1' }
      return 'product'
    }
  },
  computed: {
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
  DIV
    width: 60px
    margin: 0
    display: inline-block
  .large-operator
    color: #000
    width: 30px
.fact-table
  cursor: pointer
  width: 340px
  border: 1px solid #fff
  margin-top: 30px
  position: relative
  margin-left: auto
  margin-right: auto
  .toperator
    padding: 6px
    border-right: 2px solid #333
    font-weight: bold
    font-size: 2em
    line-height: 1
  .col
    border-right: 2px solid #333
  .row
    border-bottom: 2px solid #333
  TABLE
    width: 100%
    border-collapse: collapse
    margin-left: -10px
    TD
      font-size: 20px
      font-weight: bold
      padding-top: 4px
      padding-bottom: 4px
      border-bottom: 1px solid #ccc
      border-right: 1px solid #ccc
      width: 30px
</style>
