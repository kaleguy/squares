<template>
  <div class="page menu-page">
    <div class="main-menu">
      <!-- What the app is. Anyone who has used it once lands here from then
           on and never sees the name screen again, so this is where the name
           of the app has to be. No tile under it: the green name bar below
           is the block this screen leads with, and a second block over it
           would be two headings arguing. -->
      <div class="brand-mark">
        <div class="brand-name">squares</div>
        <div class="brand-sub">math facts</div>
      </div>

      <!-- The name is also the way back out: this screen is the top of the
           app, and the only thing above it is the name itself. -->
      <button type="button" class="name-bar" @click="rename">{{username}}</button>

      <div class="op-grid">
        <button type="button" class="op-tile" v-for="op in operators" :key="op.id"
                @click="goto(op.id)" :aria-label="label(op)">
          <!-- The level menu behind the sign, in miniature: the same three
               rows, the eight levels and the whole table, each lit as it is
               won. Drawn the other way round, with the squares solid and the
               sign faint enough to let them through, the sign stopped
               reading as a sign. -->
          <span class="op-progress">
            <i v-for="(won, i) in progress(op.id)" :key="i" :class="{ lit: won }"></i>
          </span>
          <span class="op-glyph">{{op.glyph}}</span>
        </button>
      </div>

      <!-- What the app is, how it is going, and how it looks. -->
      <div class="menu-chrome">
        <button type="button" class="round-icon" @click="help" aria-label="Help">?</button>
        <button type="button" class="round-icon" @click="scores" aria-label="Scores">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g fill="#fff">
              <rect x="3" y="13" width="4.6" height="8" rx="1.2"/>
              <rect x="9.7" y="7" width="4.6" height="14" rx="1.2"/>
              <rect x="16.4" y="10" width="4.6" height="11" rx="1.2"/>
            </g>
          </svg>
        </button>
        <button type="button" class="round-icon" @click="settings = true" aria-label="Settings">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <g fill="#fff">
              <rect x="10.2" y="1" width="3.6" height="22" rx="1.4"/>
              <rect x="10.2" y="1" width="3.6" height="22" rx="1.4"
                    transform="rotate(45 12 12)"/>
              <rect x="10.2" y="1" width="3.6" height="22" rx="1.4"
                    transform="rotate(90 12 12)"/>
              <rect x="10.2" y="1" width="3.6" height="22" rx="1.4"
                    transform="rotate(135 12 12)"/>
              <circle cx="12" cy="12" r="7.6"/>
            </g>
            <circle cx="12" cy="12" r="3" fill="var(--answer)"/>
          </svg>
        </button>
      </div>
    </div>

    <settingscard v-if="settings" @close="settings = false"></settingscard>
  </div>
</template>

<script>
import SettingsCard from './SettingsCard'
import { titleCase } from '../lib/name'
import { gridRecords } from '../lib/grid'
import { MENU_LEVELS, OPERATORS } from '../lib/levels'

const vm = {
  name: 'mainmenu',
  components: {
    settingscard: SettingsCard
  },
  data () {
    return {
      settings: false
    }
  },
  methods: {
    goto (op) {
      this.$router.replace('/menu/' + op)
    },
    rename () {
      this.$router.replace('/')
    },
    help () {
      this.$router.push('/help')
    },
    scores () {
      this.$router.replace('/scores')
    },
    // The whole table is never passed, only filled, so the ninth square
    // lights on the first finished board rather than on a pass.
    progress (op) {
      const passed = this.$store.state.passedLevels
      const won = MENU_LEVELS.map(level => !!passed[op + level])
      const board = this.boards[op]
      won.push(!!board && Object.keys(board).length > 0)
      return won
    },
    label (op) {
      const done = this.progress(op.id).filter(Boolean).length
      return op.name + ', ' + done + ' of 9 done'
    }
  },
  computed: {
    operators () {
      return OPERATORS
    },
    username () {
      return titleCase(this.$store.state.username)
    },
    boards () {
      return gridRecords(this.$store.state.username)
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

<style lang="sass" scoped>
.main-menu
  width: 292px
  margin: 0 auto
.brand-mark
  margin-bottom: 22px
  color: var(--ink)
.brand-name
  font-size: 46px
  font-weight: 700
  line-height: 1
.brand-sub
  margin-top: 10px
  font-size: 16px
  font-weight: 400
  line-height: 1
.name-bar
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  width: 292px
  height: 51px
  margin-bottom: 15px
  padding: 0 16px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--answer)
  color: #fff
  font-family: inherit
  font-size: 30px
  font-weight: 700
  line-height: 1
  overflow: hidden
  white-space: nowrap
  cursor: pointer
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.op-grid
  display: grid
  grid-template-columns: repeat(2, 140px)
  gap: 12px
  justify-content: center
.op-tile
  position: relative
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  width: 140px
  height: 140px
  padding: 0
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  cursor: pointer
  overflow: hidden
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
// Nearly the whole tile: squares this size read as what the tile is made of,
// rather than as a second mark competing with the sign. The margin round the
// nine matches the gaps between them - and carries the two points of border
// with it, or the paper outside the grid reads thinner than the paper in it.
.op-progress
  position: absolute
  left: 5px
  top: 5px
  display: grid
  grid-template-columns: repeat(3, 38.67px)
  grid-auto-rows: 38.67px
  gap: 5px
  I
    border-radius: 4px
    background: var(--mark-on)
    opacity: 0.12
    &.lit
      opacity: 0.5
.op-glyph
  position: relative
  color: var(--ink)
  font-size: 200px
  font-weight: 700
  line-height: 1
  // All four signs centre their ink on the maths axis, 71.5px above the
  // baseline at this size, and a 200px line box centred in a 140px tile
  // puts that axis two points above the tile's own centre. So two points
  // down, and the same two for all four. It was sixteen points up, from
  // when these tiles were drawn another way, which left every sign riding
  // high in its square.
  transform: translateY(2px)
.menu-chrome
  display: flex
  justify-content: center
  gap: 16px
  margin-top: 22px
</style>
