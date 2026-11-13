<template>
<div class="answergrid-holder">
  <!-- The switch beside the problem is the only other thing that says the
       clock is off, and it says it quietly: a green knob one way up or the
       other. This is the head of the screen in practice, so this is where
       the word belongs. -->
  <div class="practice-title">Practice mode</div>
  <div class="fact-table answergrid">
  <table>
    <tr>
      <td class="vis-operator"></td>
      <td
        class="white-square"
        :class="{ missed: missedColumn === item }"
        v-for="item in list"
        bind-id="$index"
        bind-data="item">{{dotFor(item)}}</td>
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
    // A dot over every fact in the level. It used to mark out which third
    // of the level was being asked, and the thirds are gone.
    dotFor (i) {
      return '\u25CF'
    }
  },
  computed: {
    products () {
      const p = []
      let op = this.operator
      if (op === '-') { op = '+' }
      // The row is headed with a times sign, so divide lists products too.
      if (op === 'd') { op = '*' }
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
      return this.$route.params.level || '2'
    },
    visLevel () {
      return this.level.substring(0, 1)
    },
    missedColumn () {
      if (!this.$store.state.errorState) return null
      const n = this.$store.state.num1
      if (n < 1 || n > 9) return null
      return n
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
.practice-title
  height: 22px
  color: var(--muted)
  font-size: 18px
  font-weight: 700
  line-height: 22px
.answergrid-holder
  padding-top: 2px
.fact-table TABLE TD.vis-operator
  font-weight: bold
  font-size: 34px
  line-height: .5
.white-square
  background: var(--tile)
  font-size: 30px
  line-height: .5
.white-square.missed
  color: var(--miss)
</style>
