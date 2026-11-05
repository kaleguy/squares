<template>
  <div class="page menu-page">
    <div>
      <div class="grid-back-row">
        <button type="button" class="plain-back" @click="home" aria-label="Back">
          <leftarrow width="40" tight></leftarrow>
        </button>
      </div>
      <div class="squares bsquares main-board">
        <div class="title-button is-flat">{{username}}</div>
        <div class="op-scores is-flat" :aria-label="opScoreLabel">
          <span v-for="op in opScores" :key="op.id"
                :class="{ 'is-wide': op.score > 99, 'is-wider': op.score > 999 }">{{op.score}}</span>
        </div>
      </div>
      <div class="squares csquares main-board">
        <div class="op-tile" @click="goto('+')"><span>&#x002b;</span></div>
        <div class="op-tile" @click="goto('-')"><span>&minus;</span></div>
        <div class="op-tile" @click="goto('X')"><span>&#x00d7;</span></div>
        <div class="op-tile" @click="goto('d')"><span>&#x00f7;</span></div>
      </div>
      <button type="button" class="help-icon" @click="help"
              aria-label="Help">?</button>
    </div>
  </div>
</template>

<script>
// Grid's first screen. It is the Steps menu with two changes: the scores take
// the top right, where Steps counts the levels passed, and the row that held
// the counts and the scores is gone.
//
// The operators open a round. The name and the scores are flat, so neither
// takes a tap it has nothing to do with.
import LeftArrow from './LeftArrow'
import { titleCase } from '../lib/name'
import { GRID_SECONDS, gridBest } from '../lib/grid'

const OPS = [
  { id: '+', name: 'Plus' },
  { id: '-', name: 'Minus' },
  { id: 'X', name: 'Times' },
  { id: 'd', name: 'Divide' }
]

const vm = {
  name: 'gridmenu',
  components: {
    leftarrow: LeftArrow
  },
  data () {
    return {
    }
  },
  methods: {
    goto: function (op) {
      this.$router.replace('/gridcard/' + op)
    },
    home: function () {
      this.$router.replace('/home')
    },
    help: function () {
      this.$router.push('/help')
    }
  },
  computed: {
    username () {
      return titleCase(this.$store.state.username)
    },
    // Grid's own bests, never the Steps ones: a whole table at once is not
    // the same feat as a level.
    opScores () {
      const name = this.$store.state.username
      return OPS.map(op => ({
        id: op.id,
        name: op.name,
        score: gridBest(name, op.id, GRID_SECONDS)
      }))
    },
    opScoreLabel () {
      return this.opScores.map(op => op.name + ' ' + op.score).join(', ')
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
    window.scrollTo(0, 0)
  }
}

export default vm
</script>

<style lang="sass">
.grid-back-row
  width: 292px
  margin: 0 auto 4px
.squares DIV.is-flat
  cursor: default
  &:active
    transform: none
    box-shadow: 0 3px 0 var(--lip)
</style>
