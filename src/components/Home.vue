<template>
  <div class="page">
    <div class="home">
      <!-- The name the splash gives the app, kept on the one screen that
           has room for it. -->
      <div class="home-title">squares</div>
      <div class="home-name" @click="rename">{{username}}</div>
      <div class="mode-tile" @click="go('/main/')">
        <span>Steps</span>
        <button type="button" class="mode-why"
                @click.stop="note = 'steps'"
                aria-label="What is Steps?">i</button>
      </div>
      <div class="mode-tile" @click="go('/grid/')">
        <span>Grid</span>
        <button type="button" class="mode-why"
                @click.stop="note = 'grid'"
                aria-label="What is Grid?">i</button>
      </div>
      <!-- The two pieces of chrome, side by side: what the app is, and
           how it looks. -->
      <div class="home-chrome">
        <button type="button" class="help-icon" @click="help"
                aria-label="Help">?</button>
        <button type="button" class="help-icon gear-icon" @click="settings = true"
                aria-label="Settings">
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
    <div class="note-veil" v-if="settings" @click="settings = false">
      <div class="note-card settings-card" @click.stop>
        <div class="note-title">Colors</div>
        <div class="note-body settings-body">Pick a color for the levels you have passed. Night and Chalk darken the whole page.</div>
        <themepicker></themepicker>
        <button type="button" class="settings-done" @click="settings = false">Done</button>
      </div>
    </div>
    <div class="note-veil" v-if="note" @click="note = null">
      <div class="note-card">
        <div class="note-title">{{noteTitle}}</div>
        <div class="note-body">{{noteBody}}</div>
        <div class="note-close">Tap to close</div>
      </div>
    </div>
  </div>
</template>

<script>
// The screen that chooses how to drill: one fact set at a time, or the whole
// table in one sitting. It sits between the name and the operator menu.
import { titleCase } from '../lib/name'
import ThemePicker from './ThemePicker'

const NOTES = {
  steps: {
    title: 'Steps',
    body: 'Start here if you do not know many facts yet. ' +
          'It teaches them all, a small set at a time.'
  },
  grid: {
    title: 'Grid',
    body: 'Every fact in one sitting. ' +
          'Start here if you already know most of them.'
  }
}

const vm = {
  name: 'home',
  components: {
    themepicker: ThemePicker
  },
  data () {
    return {
      note: null,
      settings: false
    }
  },
  methods: {
    go: function (path) {
      this.$router.replace(path)
    },
    rename: function () {
      this.$router.replace('/')
    },
    help: function () {
      this.$router.push('/help')
    }
  },
  computed: {
    username () {
      return titleCase(this.$store.state.username)
    },
    noteTitle () {
      return this.note ? NOTES[this.note].title : ''
    },
    noteBody () {
      return this.note ? NOTES[this.note].body : ''
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
  }
}

export default vm
</script>

<style lang="sass">
.home
  width: 280px
  margin-left: auto
  margin-right: auto
.home-title
  margin-bottom: 24px
  color: var(--ink)
  font-size: 46px
  font-weight: 700
  line-height: 1
  text-align: center
.home-name
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  height: 56px
  margin-bottom: 24px
  padding: 0 12px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--answer)
  color: #fff
  font-size: 26px
  font-weight: 700
  line-height: 1
  overflow: hidden
  white-space: nowrap
  cursor: pointer
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.mode-tile
  position: relative
  display: flex
  align-items: center
  justify-content: center
  box-sizing: border-box
  height: 120px
  margin-bottom: 14px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  font-size: 44px
  font-weight: 700
  line-height: 1
  cursor: pointer
  user-select: none
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.home-chrome
  display: flex
  justify-content: center
  gap: 16px
.home-chrome .help-icon
  margin: 22px 0 0
.gear-icon svg
  display: block
  width: 26px
  height: 26px
.settings-done
  box-sizing: border-box
  width: 130px
  height: 48px
  margin-top: 22px
  padding: 0
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--ink)
  color: var(--tile)
  font-family: inherit
  font-size: 20px
  font-weight: 700
  line-height: 1
  cursor: pointer
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)
.mode-why
  position: absolute
  top: 10px
  right: 10px
  display: flex
  align-items: center
  justify-content: center
  width: 32px
  height: 32px
  padding: 0
  border: none
  border-radius: 50%
  background: var(--ink)
  color: var(--tile)
  font-family: inherit
  font-size: 18px
  font-weight: 700
  line-height: 1
  cursor: pointer
.note-veil
  position: fixed
  left: 0
  top: 0
  right: 0
  bottom: 0
  display: flex
  align-items: center
  justify-content: center
  background: rgba(0, 0, 0, 0.4)
  z-index: 20
.note-card
  box-sizing: border-box
  width: 290px
  padding: 24px
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
  background: var(--tile)
  color: var(--ink)
  text-align: center
.note-title
  font-size: 28px
  font-weight: 700
  line-height: 1
  margin-bottom: 12px
.note-body
  font-size: 18px
  line-height: 1.35
.note-close
  margin-top: 12px
  color: var(--muted)
  font-size: 14px
// Wider than a note: three swatches have to stand in a row.
.note-card.settings-card
  width: 320px
  padding: 22px
.note-body.settings-body
  font-size: 16px
  margin-bottom: 18px
</style>
