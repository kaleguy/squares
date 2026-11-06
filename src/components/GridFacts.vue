<template>
  <div class="page">
    <div class="gridfacts" @click="back">
      <div class="gridfacts-head">{{isTimes ? '×' : '+'}}</div>
      <table class="gridfacts-table">
        <tr>
          <td class="gridfacts-corner"></td>
          <td class="gridfacts-edge" v-for="c in 9" :key="'c' + c">{{c}}</td>
        </tr>
        <tr v-for="r in 9" :key="'r' + r">
          <td class="gridfacts-edge">{{r}}</td>
          <td v-for="c in 9" :key="'b' + r + '-' + c"
              class="gridfacts-cell"
              :class="{ skip: !counts(r, c) }">{{product(r, c)}}</td>
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
import { factCounts } from '../lib/grid'

const vm = {
  name: 'gridfacts',
  methods: {
    product: function (a, b) {
      return this.isTimes ? a * b : a + b
    },
    // The ones the round leaves out are drawn flat, so the table reads as the
    // one being timed.
    counts: function (a, b) {
      return factCounts(this.op, { a: a, b: b })
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
.gridfacts-head
  color: var(--ink)
  font-size: 52px
  font-weight: 700
  line-height: 1
  text-align: center
  margin-bottom: 20px
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
  background: transparent
.gridfacts-edge
  background: var(--operand)
  color: #1A2744
.gridfacts-cell
  background: var(--ink)
  color: var(--tile)
  &.skip
    background: var(--track)
    color: var(--muted)
.gridfacts-back
  margin-top: 20px
  color: var(--muted)
  font-size: 16px
  text-align: center
</style>
