<template>
<div class="fact-table answergrid">
  <table>
    <tr>
      <td>{{visOperator2}}</td>
      <td
          class="numerand1"
          v-for="item in list"
          bind-id="$index"
          bind-data="item">{{item}}</td>
    </tr>
    <tr>
      <td class="activen">{{level}}</td>
      <td
        class="product"
        v-for="item in products"
        bind-id="$index"
        bind-data="item">{{item}}</td>
    </tr>
  </table>
</div>
</template>

<script>
const vm = {
  name: 'answergrid',
  props: {
    width: String
  },
  data () {
    return {
      list: [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
    }
  },
  components: {
  },
  methods: {
  },
  computed: {
    products () {
      const p = []
      let op = this.operator
      if (op === '-') { op = '+' }
      if (op === 'd') { op = '/' }
      let total = 0
      let level = this.level
      this.list.forEach((n) => {
        eval ('total = ' + n + ' ' + op + ' ' + level) // eslint-disable-line
        p.push(total)
      })
      return p
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
<style lang="sass">
.answergrid
  margin-top: 10px
  margin-bottom: 18px
</style>
