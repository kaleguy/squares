<template>
  <div class="page">
    <div class="level-screen">
      <div class="level-head">
        <button type="button" class="level-back" @click="menu" aria-label="Back">
          <leftarrow width="40" tight></leftarrow>
        </button>
        <!-- The operator says which table this is better than a name does,
             so it takes the middle of the row. The empty box on the right
             keeps the room the points ball used to take, so the glyph stays
             over the middle of the levels. -->
        <div class="v-operator"><span>{{glyph}}</span></div>
        <div class="level-spacer"></div>
      </div>

      <!-- Nine tiles, three to a row: the eight levels, and the whole table
           in the corner they end at. Every tile is a whole level; a third of
           a level is a smaller thing to pass than the screen made it look,
           and three of them in front of every level made a table read as
           twenty-four things to learn rather than eight. -->
      <div class="level-grid">
        <button type="button" v-for="level in levels" :key="level"
                class="level-tile" :class="{ passed: passed(level) }"
                @click="goto(level)"
                :aria-label="name + ' ' + level.charAt(0)">{{level.charAt(0)}}</button>
        <button type="button" class="level-tile" :class="{ passed: tableFilled }"
                @click="table" aria-label="The whole table">all</button>
      </div>

      <div class="level-foot"></div>
    </div>

    <!-- Outside the centred column: the page centres what is on it, and a
         total that moves with the tiles is a thing to go looking for. In the
         corner it is always the same corner. Small and grey on purpose - it
         is not a target and nothing is scored off it. -->
    <div class="level-clock" :aria-label="'Time on this table'">{{clock}}</div>
  </div>
</template>

<script>
import LeftArrow from './LeftArrow'
import { titleCase } from '../lib/name'
import { gridRecords } from '../lib/grid'
import { MENU_LEVELS, OPERATORS, glyphFor } from '../lib/levels'
import { readout, seconds } from '../lib/study'

const vm = {
  name: 'submenu',
  components: {
    leftarrow: LeftArrow
  },
  data () {
    // Read back once a second, since the clock it comes from runs whether
    // this screen is looking or not.
    return { total: 0, ticker: null }
  },
  methods: {
    menu () {
      this.$router.replace('/main/')
    },
    goto (level) {
      this.$router.replace('/card/' + this.operator + '/' + level)
    },
    table () {
      this.$router.replace('/gridcard/' + this.operator)
    },
    passed (level) {
      return !!this.$store.state.passedLevels[this.operator + level]
    }
  },
  computed: {
    levels () {
      return MENU_LEVELS
    },
    operator () {
      return this.$route.params.operator || '+'
    },
    glyph () {
      return glyphFor(this.operator)
    },
    name () {
      const found = OPERATORS.filter(op => op.id === this.operator)[0]
      return found ? found.name : this.operator
    },
    // The whole table is never passed, only filled, so its tile goes green
    // on the first finished board - the same thing the ninth square on the
    // operator menu says.
    tableFilled () {
      const board = gridRecords(this.$store.state.username)[this.operator]
      return !!board && Object.keys(board).length > 0
    },
    username () {
      return titleCase(this.$store.state.username)
    },
    // How long has gone into this table, all time, counting the visit open
    // now. The clock itself is kept in lib/study.js, where the router winds
    // it on; this only reads it.
    clock () {
      return readout(this.total)
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
      return
    }
    const me = this
    const read = function () {
      me.total = seconds(me.operator, me.$store.state.username)
    }
    read()
    this.ticker = window.setInterval(read, 1000)
  },
  beforeDestroy () {
    if (this.ticker) { window.clearInterval(this.ticker) }
  }
}

export default vm
</script>

<style lang="sass" scoped>
.level-screen
  width: 342px
.level-head
  display: flex
  align-items: center
  gap: 4px
  width: 342px
  // Room for the tallest glyph to clear the levels: the divide sign hangs
  // lowest. The same height is left empty below the grid by .level-foot, so
  // what the page centres is the grid of levels, not the head and the grid.
  height: 94px
  box-sizing: border-box
.level-foot
  height: 94px
.level-clock
  position: fixed
  left: 24px
  bottom: 16px
  font-size: 15px
  font-weight: 400
  font-variant-numeric: tabular-nums
  color: var(--muted)
.level-back, .level-spacer
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: 74px
  height: 74px
  padding: 0
  border: none
  background: transparent
  box-shadow: none
  color: var(--ink)
  cursor: pointer
  DIV
    display: flex
    line-height: 0
.level-spacer
  cursor: default
.v-operator
  flex: 1
  display: flex
  align-items: center
  justify-content: center
  height: 74px
  font-size: 140px
  // The sign is drawn heavy here, the way it is on the menu before this
  // one. It used to inherit the weight from a wrapper that is gone, and
  // came out in the book weight: a thin sign over nine heavy digits.
  font-weight: 700
  line-height: 1
  cursor: default
  pointer-events: none
  SPAN
    display: block
    line-height: 1
    transform: translateY(-11px)
// Nine tiles with a digit each have room the four big signs on the menu
// before them do not, and this screen was mostly paper: the tiles take some
// of it, and the digits take the tiles.
.level-grid
  display: grid
  grid-template-columns: repeat(3, 106px)
  gap: 12px
  justify-content: center
.level-tile
  box-sizing: border-box
  width: 106px
  height: 106px
  padding: 0 6px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-family: inherit
  // Sixty-six, not the seventy-four the iOS app sets. Atkinson is a wider
  // face than the Avenir the port falls back to, and at the same size its
  // "all" took 87 of the tile's 106 where Avenir's takes 78. This is the
  // size at which the two screens read alike.
  font-size: 66px
  font-weight: 700
  line-height: 1
  cursor: pointer
  user-select: none
  &.passed
    background: var(--answer)
    color: #fff
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
</style>
