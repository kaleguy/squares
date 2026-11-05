<template>
  <div class="page menu-page">
    <div>
      <div class="main-back-row">
        <button type="button" class="plain-back" @click="home" aria-label="Back">
          <leftarrow width="40" tight></leftarrow>
        </button>
      </div>
      <div class="squares bsquares main-board">
        <div
          @click="menu"
          class="title-button">{{username}}</div>
        <div class="count-tile"
             @click="goto('s')"
             aria-label="Counting">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="squares csquares main-board">
        <div class="op-tile" @click="goto('+')"><span>&#x002b;</span></div>
        <div class="op-tile" @click="goto('-')"><span>&minus;</span></div>
        <div class="op-tile" @click="goto('X')"><span>&#x00d7;</span></div>
        <div class="op-tile" @click="goto('d')"><span>&#x00f7;</span></div>
        <div @click="goto('stars')" class="op-counts" :aria-label="opCountLabel">
          <span v-for="op in opCounts" :key="op.id">{{op.count}}</span>
        </div>
        <div @click="goto('points')" class="op-scores" :aria-label="opScoreLabel">
          <span v-for="op in opScores" :key="op.id" :class="{ 'is-wide': op.score > 99, 'is-wider': op.score > 999 }">{{op.score}}</span>
        </div>
      </div>
      <button type="button" class="help-icon" @click="help"
              aria-label="Help">?</button>
    </div>
  </div>
</template>


<script>
import LeftArrow from './LeftArrow'
import { titleCase, levelsKey } from '../lib/name'
const vm = {
  name: 'mainmenu',
  components: {
    leftarrow: LeftArrow
  },
  data () {
    return {
    }
  },
  methods: {
    goto: function (op) {
      if (op === 'stars' || op === 'points') {
        return this.$router.replace('/chart/' + op)
      }
      this.$router.replace('/menu/' + op)
    },
    menu: function () {
      this.$router.replace('/')
    },
    // The arrow goes up to Steps and Grid; the name keeps its own job of
    // going out to the name screen.
    home: function () {
      this.$router.replace('/home')
    },
    help: function () {
      this.$router.push('/help')
    }
  },
  computed: {
    levels () {
      return this.$store.state.levels
    },
    username () {
      return titleCase(this.$store.state.username)
    },
    opCounts () {
      const keys = Object.keys(this.record)
      return [
        { id: '+', name: 'Plus' },
        { id: '-', name: 'Minus' },
        { id: 'X', name: 'Times' },
        { id: 'd', name: 'Divide' }
      ].map(op => ({
        id: op.id,
        name: op.name,
        count: keys.filter(key => key.charAt(0) === op.id).length
      }))
    },
    opCountLabel () {
      return this.opCounts.map(op => op.name + ' ' + op.count).join(', ')
    },
    opScores () {
      return [
        { id: '+', name: 'Plus' },
        { id: '-', name: 'Minus' },
        { id: 'X', name: 'Times' },
        { id: 'd', name: 'Divide' }
      ].map(op => {
        const score = Object.keys(this.record).reduce((total, key) => {
          if (key.charAt(0) !== op.id) return total
          const times = Object.values(this.record[key]).map(Number).filter(function (n) { return !isNaN(n) })
          if (!times.length) return total
          const best = times.sort(function (a, b) { return a - b })[0]
          return total + Math.max(0, 70 - best)
        }, 0)
        return { id: op.id, name: op.name, score: score }
      })
    },
    opScoreLabel () {
      return this.opScores.map(op => op.name + ' ' + op.score).join(', ')
    },
    record () {
      const recordKey = levelsKey(this.$store.state.username)
      return JSON.parse(localStorage.getItem(recordKey)) || {}
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
    window.scrollTo(0, 0)
  },
  updated () {
  }
}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.bsquares
  display: flex
  flex-direction: row
  height: 100%
.main-back-row
  width: 292px
  margin: 0 auto 4px
</style>
