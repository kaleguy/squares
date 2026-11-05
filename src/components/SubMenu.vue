<template>
  <div class="page">
    <div class="level-screen">
      <div class="level-head">
        <button type="button" class="level-back" @click="menu" aria-label="Back">
          <leftarrow width="40" tight></leftarrow>
        </button>
        <div class="v-operator"><span>{{visOperator}}</span></div>
        <div class="level-points">{{points}}</div>
      </div>
      <div class="squares sub-squares">
        <div v-for="level in levels"
             v-bind:class="passed(level)"
             @click="goto(level)">
          <levellabel :level="labelFor(level)" :score="scoreFor(level)"></levellabel>
        </div>
      </div>
      <div class="level-foot"></div>
    </div>
  </div>
</template>

<script>
import LevelLabel from './LevelLabel'
import LeftArrow from './LeftArrow'
import _ from 'lodash'
import { titleCase, levelsKey } from '../lib/name'
const vm = {
  name: 'submenu',
  components: {
    levellabel: LevelLabel,
    leftarrow: LeftArrow
  },
  props: {
    // levels: Object
  },
  data () {
    return {
    }
  },
  methods: {
    menu: function () {
      this.$router.replace('/main/')
    },
    goto: function (level) {
      this.$router.replace('/card/' + this.operator + '/' + level)
    },
    passed (level) {
      let cssClass = ''
      const passedLevels = this.$store.state.passedLevels
      const levelKey = this.operator + level
      if (passedLevels[levelKey]) {
        cssClass = 'passed'
      }
      // console.log(cssClass, passedLevels)
      return cssClass
    },
    // A whole level fills every dot, the way its last column does.
    labelFor (level) {
      return level.length > 1 ? level : level + 'd'
    },
    scoreFor (level) {
      const levelKey = this.operator + level
      if (!this.$store.state.passedLevels[levelKey]) return null
      const levelRecord = this.record[levelKey]
      if (!levelRecord) return 0
      const times = Object.values(levelRecord).map(Number).filter(function (n) { return !isNaN(n) })
      if (!times.length) return 0
      const best = times.sort(function (a, b) { return a - b })[0]
      return Math.max(0, 70 - best)
    }
  },
  computed: {
    num1 () {
      return this.$store.state.num1
    },
    levels () {
      // console.log('CURRENT LEVEL = ', this.$store.state.currentLevel)
      // const allLevels = this.$store.state.levels
      // const l = _.find(allLevels, l => l.operator === this.operator).levels
      // Levels one to four hold few enough facts to drill whole, so each is
      // a single tile; from five up a level is split into its three thirds
      // and the whole. Either way the screen reads four tiles to a row.
      //
      // Three and four go to their d index, not to a bare '3': the two are
      // the same round, and keeping d means a level passed before this split
      // is still passed after it.
      return [
        '1', '2', '3d', '4d',
        '5a', '5b', '5c', '5d',
        '6a', '6b', '6c', '6d',
        '7a', '7b', '7c', '7d',
        '8a', '8b', '8c', '8d',
        '9a', '9b', '9c', '9d'
      ]
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
      let op = this.$route.params.operator || '+'
      return op
    },
    username () {
      return titleCase(this.$store.state.username)
    },
    points () {
      const points = _.reduce(this.record, (points, level, k) => {
        if (k.indexOf(this.operator) !== 0) {
          return points
        }
        let min = Object.values(level).sort((prev, next) => prev - next)[0]
        return points + Math.max(0, 70 - min)
      }, 0)
      return points
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
  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.level-screen
  width: 312px
.level-head
  display: flex
  align-items: center
  gap: 4px
  width: 308px
  margin: 0 2px 2px
  // Room for the tallest glyph to clear the levels: the divide sign hangs
  // lowest. The same height is left empty below the grid by .level-foot, so
  // what the page centres is the grid of levels, not the head and the grid.
  height: 94px
  box-sizing: border-box
.level-foot
  height: 94px
.level-back, .level-points
  display: flex
  align-items: center
  justify-content: center
  box-sizing: content-box
  width: 70px
  height: 70px
  padding: 0
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  font-family: inherit
  font-size: 26px
  font-weight: 700
  line-height: 1
  cursor: pointer
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.level-back
  // The arrow is not a tile, the way the keypad's is not.
  background: transparent
  border-color: transparent
  box-shadow: none
  color: var(--ink)
  &:active
    box-shadow: none
  DIV
    display: flex
    line-height: 0
.level-name
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  height: 74px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  text-align: center
  padding: 0 8px
  overflow: hidden
  white-space: nowrap
  font-size: 28px
  font-weight: 700
  line-height: 1
  &.is-long
    font-size: 20px
.level-points
  // A score is round wherever it is shown.
  background: var(--answer)
  border-radius: 50%
  color: #fff
  cursor: default
  &:active
    transform: none
    box-shadow: 0 3px 0 var(--lip)
.sub-squares
  width: 312px
.sub-squares > DIV
  display: flex
  flex-direction: column
  align-items: stretch
  justify-content: center
  box-sizing: content-box
  width: 70px
  height: 70px
  padding: 0
  font-size: 24px
  font-weight: 700
  line-height: 1
.sub-squares > DIV.passed
  background-color: var(--answer)
  color: #fff
.level-head .v-operator
  // The operator says which table this is better than a name does, so it
  // takes the middle of the row.
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  box-sizing: content-box
  height: 74px
  margin: 0
  padding: 0
  border: none
  box-shadow: none
  background-color: transparent
  font-size: 140px
  line-height: 1
  cursor: default
  pointer-events: none
  &:active
    transform: none
    box-shadow: none
  span
    display: block
    line-height: 1
    transform: translateY(-11px)
</style>
<style lang="sass">
.sub-squares > DIV.passed .dot-green
  background: var(--mark-on)
.sub-squares > DIV.passed .dot-orange
  background: var(--mark-off)
</style>
