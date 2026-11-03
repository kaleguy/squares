<template>
  <div class="help-page">
    <div class="help-wrap">
      <div class="help-back" @click="back">
        <leftarrow width="64"></leftarrow>
      </div>
      <h1>Help</h1>

      <section>
        <h2>Colors</h2>
        <p>Pick a color for the levels you have passed. Night and Chalk darken the whole page.</p>
        <div class="palette-row" role="group" aria-label="Color theme">
          <button
            v-for="theme in themes"
            type="button"
            class="palette-choice"
            :key="theme.id"
            :class="{ 'is-on': theme.id === current }"
            :aria-pressed="theme.id === current ? 'true' : 'false'"
            @click="choose(theme.id)">
            <span class="palette-plate" :style="plate(theme)">
              <span class="palette-tile" :style="swatch(theme)">
                <span class="palette-num">3</span>
                <span class="palette-grid">
                  <i v-for="n in 9" :key="n" :style="{ background: n < 4 ? theme.dotOn : theme.dotOff }"></i>
                </span>
              </span>
            </span>
            <span class="palette-label">{{ theme.label }}</span>
          </button>
        </div>
      </section>

      <section>
        <h2>Your name</h2>
        <p>Type your name and press Return. Squares keeps your scores on this device.</p>
        <shot file="static/help/name.png" caption="The name screen."></shot>
      </section>

      <section>
        <h2>The menu</h2>
        <p>Your name goes back to the name screen. The nine squares are counting. Plus, minus, times, and divide open those facts. The filled square is how many levels you have passed, and it shows zero until you pass one. The green circle is your points.</p>
        <shot file="static/help/menu.png" caption="The main menu."></shot>
      </section>

      <section>
        <h2>Levels</h2>
        <p>Levels 1 and 2 are short. The rest are grouped by number. The small squares show which facts are in that level. A filled square means you passed it.</p>
        <shot file="static/help/levels.png" caption="Picking a level."></shot>
      </section>

      <section>
        <h2>A round</h2>
        <p>The problem is in the big tile. Tap the keypad to answer. Each right answer fills a square along the top. The bar is time, and the number on the right is your score, up to 140. Finish all 27 to pass. A wrong answer turns red. X clears the digits. The arrow goes back. The question mark opens the facts. The switch beside the problem turns the timer off and shows the answers.</p>
        <shot file="static/help/drill.png" caption="Answering a problem."></shot>
      </section>

      <section>
        <h2>Facts</h2>
        <p>The table shows the whole set for that level. Amber is one number, the color you picked is the level, and green is the answer.</p>
        <shot file="static/help/facts.png" caption="The fact table."></shot>
      </section>

      <section>
        <h2>Counting</h2>
        <p>Count the pips on the dice and enter the total.</p>
        <shot file="static/help/dice.png" caption="A counting problem."></shot>
      </section>
    </div>
  </div>
</template>

<script>
import LeftArrow from './LeftArrow'
import { THEMES, applyTheme, currentThemeId } from '../lib/theme'

const Shot = {
  name: 'shot',
  props: {
    file: String,
    caption: String
  },
  data () {
    return { missing: false }
  },
  template: '<figure class="shot">' +
    '<img v-if="!missing" :src="file" alt="" @error="missing = true">' +
    '<div v-else class="shot-missing">' +
      '<div>Add a screenshot</div>' +
      '<div class="shot-file">{{file}}</div>' +
    '</div>' +
    '<figcaption>{{caption}}</figcaption>' +
  '</figure>'
}

export default {
  name: 'help',
  components: {
    leftarrow: LeftArrow,
    shot: Shot
  },
  data () {
    return {
      themes: THEMES,
      current: currentThemeId()
    }
  },
  methods: {
    swatch (theme) {
      const line = theme.line || '#1A2744'
      const lip = theme.lip || '#1A2744'
      return {
        background: theme.level,
        color: theme.levelText,
        borderColor: line,
        boxShadow: '0 3px 0 ' + lip
      }
    },
    plate (theme) {
      if (!theme.paper) return {}
      return { background: theme.paper }
    },
    choose (id) {
      this.current = applyTheme(id)
    },
    back () {
      if (this.$store.state.username) {
        this.$router.replace('/main/')
      } else {
        this.$router.replace('/')
      }
    }
  }
}
</script>

<style lang="sass">
@import ../styles/tokens

.help-page
  min-height: 100vh
  display: flex
  justify-content: center
  align-items: safe center
  padding: 28px 18px 56px
  box-sizing: border-box
.help-wrap
  width: 100%
  max-width: 360px
  text-align: left
  color: $ink
.help-back
  width: 64px
  cursor: pointer
  margin-bottom: 4px
.help-wrap h1
  font-size: 40px
  font-weight: 700
  line-height: 1.1
  margin: 0 0 8px
.help-wrap h2
  font-size: 22px
  font-weight: 700
  line-height: 1.2
  margin: 28px 0 8px
.help-wrap p
  font-size: 18px
  font-weight: 400
  line-height: 1.45
  margin: 0 0 12px
.palette-row
  display: flex
  flex-wrap: wrap
  gap: 16px 8px
.palette-choice
  flex: 0 0 calc(33.333% - 6px)
  display: flex
  flex-direction: column
  align-items: center
  gap: 8px
  margin: 0
  padding: 0
  border: none
  background: transparent
  color: $ink
  font: inherit
  cursor: pointer
.palette-plate
  display: flex
  align-items: center
  justify-content: center
  padding: 6px
  border-radius: 12px
.palette-tile
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 3px
  width: 58px
  height: 58px
  box-sizing: border-box
  border: 2px solid $line
  border-radius: 8px
  box-shadow: 0 3px 0 $lip
.palette-choice.is-on .palette-tile
  transform: translateY(2px)
  box-shadow: 0 1px 0 $lip
.palette-num
  font-size: 16px
  font-weight: 700
  line-height: 1
.palette-grid
  display: grid
  grid-template-columns: repeat(3, 7px)
  grid-template-rows: repeat(3, 7px)
  gap: 1px
.palette-grid i
  display: block
  border-radius: 1px
.palette-label
  font-size: 14px
  font-weight: 700
  line-height: 1
.shot
  margin: 0
.shot img
  display: block
  width: 100%
  background: $tile
  border: 2px solid $ink
  border-radius: 8px
  box-shadow: 0 3px 0 $ink
.shot-missing
  min-height: 168px
  box-sizing: border-box
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  gap: 8px
  padding: 20px
  text-align: center
  background: $tile
  color: $ink
  border: 2px dashed $ink
  border-radius: 8px
  font-size: 16px
.shot-file
  font-weight: 700
.shot figcaption
  margin-top: 8px
  font-size: 16px
  line-height: 1.3
</style>
