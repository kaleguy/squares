<template>
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
        </span>
      </span>
      <span class="palette-label">{{ theme.label }}</span>
    </button>
  </div>
</template>

<script>
import * as analytics from '../lib/analytics'
// The six themes, each shown as the thing the choice actually changes: a
// level in the colour that theme gives a level, on that theme's paper. Four
// of the six change nothing else, so it is the one thing a swatch can show
// that tells them apart.
//
// The tile used to carry nine dots as well, a third of them lit, from when a
// level tile said which third of the level it asked. The thirds are off the
// menu and the dots went with them.
import { THEMES, applyTheme, currentThemeId } from '../lib/theme'

const vm = {
  name: 'themepicker',
  data () {
    return {
      themes: THEMES,
      current: currentThemeId()
    }
  },
  methods: {
    swatch: function (theme) {
      const line = theme.line || '#1A2744'
      const lip = theme.lip || '#1A2744'
      return {
        background: theme.level,
        color: theme.levelText,
        borderColor: line,
        boxShadow: '0 3px 0 ' + lip
      }
    },
    plate: function (theme) {
      return { background: theme.paper || '#E8EEF6' }
    },
    choose: function (id) {
      this.current = applyTheme(id)
      analytics.capture('theme chosen', { theme: this.current })
    }
  }
}

export default vm
</script>

<style lang="sass">
@import ../styles/tokens

.palette-row
  display: flex
  flex-wrap: wrap
  gap: 18px 14px
.palette-choice
  flex: 0 0 calc(33.333% - 10px)
  display: flex
  flex-direction: column
  align-items: center
  gap: 8px
  margin: 0
  padding: 0
  border: none
  background: transparent
  color: var(--ink)
  font: inherit
  cursor: pointer
.palette-plate
  display: flex
  align-items: center
  justify-content: center
  width: 100%
  box-sizing: border-box
  min-height: 86px
  padding: 14px 10px
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
.palette-choice.is-on .palette-plate
  outline: 3px solid var(--ink)
  outline-offset: 3px
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
</style>
