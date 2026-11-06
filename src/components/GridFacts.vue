<template>
  <div class="page">
    <div class="gridfacts" @click="back">
      <table class="gridfacts-table">
        <tr>
          <!-- The operation sits in the corner the two runs of numbers meet
               at, the way it does on the board being timed. -->
          <td class="gridfacts-corner">{{visOperator}}</td>
          <td class="gridfacts-edge" v-for="c in 9" :key="'c' + c">{{c}}</td>
        </tr>
        <tr v-for="r in 9" :key="'r' + r">
          <td class="gridfacts-edge">{{r}}</td>
          <!-- The diagonal is green: the table is the same read either way
               across it, so half of it is the other half seen in a mirror. -->
          <td v-for="c in 9" :key="'b' + r + '-' + c"
              class="gridfacts-cell"
              :class="{ diagonal: r === c }">{{product(r, c)}}</td>
        </tr>
      </table>
      <div class="gridfacts-back">Tap to go back</div>
    </div>
  </div>
</template>

<script>
// The whole table, answered: what the i on a Grid round opens. Minus reads
// its addition table and divide its times table, the same way the Steps fact
// table does, because that is the pair the answer is made from.
const vm = {
  name: 'gridfacts',
  methods: {
    product: function (a, b) {
      return this.isTimes ? a * b : a + b
    },
    back: function () {
      this.$router.replace('/gridcard/' + this.op)
    }
  },
  computed: {
    op () {
      return this.$route.params.operator || '+'
    },
    isTimes () {
      return this.op === 'X' || this.op === 'd'
    },
    visOperator () {
      if (this.op === 'd') { return '÷' }
      if (this.op === 'X') { return '×' }
      if (this.op === '-') { return '−' }
      return this.op
    }
  },
  mounted () {
    if (!this.$store.state.username) { this.$router.replace('/') }
  }
}

export default vm
</script>

<style lang="sass">
.gridfacts
  width: 340px
  margin: 0 auto
  cursor: pointer
  user-select: none
.gridfacts-table
  width: 340px
  border-collapse: collapse
  table-layout: fixed
  outline: 1px solid var(--paper)
.gridfacts-table td
  width: 34px
  height: 28px
  font-size: 20px
  font-weight: 700
  line-height: 1
  text-align: center
  border: 1px solid var(--paper)
.gridfacts-corner
  background: var(--ink)
  color: var(--tile)
  font-size: 22px
.gridfacts-edge
  background: var(--operand)
  color: #1A2744
.gridfacts-cell
  background: var(--ink)
  color: var(--tile)
  &.diagonal
    background: var(--answer)
    color: #fff
.gridfacts-back
  margin-top: 20px
  color: var(--muted)
  font-size: 16px
  text-align: center
</style>
