<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
  <div
    style="position:relative;margin-top:-30px"
    @click="goto()">
    <div class="fheading">
      <div class="numerand1">?</div>
      <div class="large-operator">{{visOperator}}</div>
      <div class="numerand2">{{level}}</div>
      <div class="large-operator">=</div>
      <div class="product">?</div>
    </div>
    <div class="fact-table" style="margin-left:-20px">
       <table align="center">
         <tr class="row">
           <td class="toperator"></td>
           <td v-for="c in 9" v-bind:class="num1Class()">{{c}}</td>
         </tr>
         <tr v-for="r in 9">
           <td class="col" v-bind:class="{activen: isActive(r)}">{{r}}</td>
           <td v-for="c in 9" v-bind:class="num3Class(r)">{{product(r,c)}}</td>
         </tr>
       </table>
    </div>
  </div>
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
      const op = this.operator
      let target = '/factlist/' + op + '/' + this.level
      if (op === 'X' || op === 'd') {
        target = '/factlistX/' + op + '/' + this.level
      }
      this.$router.replace(target)
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
      if (r !== this.level) { return 'numerand0' }
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
</style>
