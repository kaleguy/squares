<template>
<div class="fact-table answergrid">
  <table>
    <tr>
      <td class="vis-operator"></td>
      <td
        class="white-square"
        v-for="item in list"
        bind-id="$index"
        bind-data="item">{{getDot(item)}}</td>
    </tr>
    <tr>
      <td class="vis-operator">{{visOperator2}}</td>
      <td
          class="numerand1"
          v-for="item in list"
          bind-id="$index"
          bind-data="item">{{item}}</td>
    </tr>
    <tr>
      <td class="activen">{{visLevel}}</td>
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
    getDot (i) {
      let dot = '\u25CF'
      if (this.level.length > 1) {
        let levelType = this.level.substring(1, 2)
        switch (levelType) {
          case 'a':
            if (i > 3) { dot = '' }
            break
          case 'b':
            if (i < 4) { dot = '' }
            if (i > 6) { dot = '' }
            break
          case 'c':
            if (i < 7) { dot = '' }
            break
          default:
        }
      }
      return dot
    }
  },
  computed: {
    products () {
      const p = []
      let op = this.operator
      if (op === '-') { op = '+' }
      if (op === 'd') { op = '/' }
      if (op === 'X') { op = '*' }
      let total = 0
      let level = this.visLevel
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
<style lang="sass">
.fact-table TABLE TD.vis-operator
  font-weight: bold
  font-size: 34px
  line-height: .5
.white-square
  background: #fff
  font-size: 30px
  line-height: .5
</style>
