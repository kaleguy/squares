<template>
  <div style="position:relative">
    <div class="fheading">
      <div class="numerand">?</div>
      <div class="large-operator">{{operator}}</div>
      <div class="numerand">1</div>
      <div class="large-operator">=</div>
      <div class="product">?</div>
    </div>
  <div class="fact-table">
     <table align="center">
       <tr class="row">
         <td class="operator">{{operator}}</td>
         <td v-for="c in 9">{{c}}</td>
       </tr>
       <tr v-for="r in 9">
         <td class="col">{{r}}</td>
         <td v-for="c in 9" v-bind:class="{active: isActive(r)}">{{product(r,c)}}</td>
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
    submit: function () {
      // console.log('foo')
    },
    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    },
    product (a, b) {
      return a + b
    },
    isActive (i) {
      i = i + ''
      if (i === this.level) {
        return true
      }
      return false
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
    operator () {
      return this.$route.params.operator || '+'
    },
    level () {
      return this.$store.state.currentLevel.index || '1'
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
  .numerand
    background: blue
  .product
    background: green
  .large-operator
    color: #000
    width: 30px
.fact-table
  width: 340px
  border: 1px solid #fff
  margin-top: 30px
  position: relative
  margin-left: auto
  margin-right: auto
  .operator
    padding: 6px
    border-right: 2px solid #333
    font-weight: bold
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
</style>
