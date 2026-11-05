<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">
@import ./styles/tokens
\:root
  --paper: #12211B
  --ink: #F4F0E4
  --tile: #1C3328
  --line: #E6E0D0
  --lip: #070E0B
  --operand: #F0B429
  --answer: #1C7A45
  --miss: #FF8A82
  --mark-on: #8FCBAA
  --mark-off: #F0C36A
  --grid: rgba(244, 240, 228, 0.07)
  --muted: #A8B5A4
  --track: #2C463A
  --level: #C98FC4
  --level-text: #12211B
  --passed-dot-on: #1C7A45
  --passed-dot-off: #C4841A
HTML
  height: 100%
*
  touch-action: manipulation
HTML, BODY
  margin: 0
  font-family: "Atkinson Hyperlegible", "Avenir Next", "Segoe UI", sans-serif
  font-variant-numeric: tabular-nums lining-nums
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  -webkit-tap-highlight-color: transparent
  text-align: center
  color: $ink
  background-color: $paper
  background-image: linear-gradient(var(--grid) 1px, transparent 1px), linear-gradient(90deg, var(--grid) 1px, transparent 1px)
  background-size: 28px 28px
  min-height: 100%
  width: 100%
#app
  min-height: 100%
.page
  display: flex
  justify-content: center
  align-items: safe center
  box-sizing: border-box
  min-height: 100vh
  padding: 16px 0
.bsquares, .csquares
  font-size: 32px
  font-weight: 700
  width: 303px
.bsquares DIV
  width: 140px
  height: 140px
.csquares DIV
  width: 140px
  height: 140px
  line-height: 1
.squares
  width: 360px
  margin-left: auto
  margin-right: auto
  display: flex
  flex-wrap: wrap
  flex-direction: row
  DIV.title-button
    display: flex
    align-items: center
    justify-content: center
    width: 140px
    height: 140px
    padding: 0
    font-size: 1em
    font-weight: 700
    line-height: 1
    background-color: var(--answer)
    color: #fff
    cursor: pointer
    font-family: inherit
    text-shadow: none
  DIV
    cursor: pointer
    font-size: 3.5em
    font-weight: 700
    padding-top: 26px
    line-height: 1em
    width: 80px
    color: $ink
    background-color: $tile
    border: 2px solid $line
    border-radius: 8px
    box-shadow: 0 3px 0 $lip
    height: 75px
    margin: 2px
    user-select: none
    &:active
      transform: translateY(2px)
      box-shadow: 0 1px 0 $lip
  DIV.op-tile
    display: flex
    align-items: center
    justify-content: center
    overflow: hidden
    width: 140px
    height: 140px
    padding: 0
    font-size: 200px
    line-height: 1
    SPAN
      display: block
      line-height: 1
      // Glyphs sit low in the em box, so the oversized line box is shifted up until the ink is centered.
      transform: translateY(-16px)
  DIV.count-tile
    width: 140px
    height: 140px
    display: grid
    grid-template-columns: repeat(3, 36px)
    grid-template-rows: repeat(3, 36px)
    gap: 8px
    place-content: center
    padding: 0
    color: $ink
    background-color: $tile
    SPAN
      display: block
      width: 36px
      height: 36px
      margin: 0
      padding: 0
      border: none
      border-radius: 3px
      box-shadow: none
      background-color: $ink
  DIV.op-counts
    width: 140px
    height: 140px
    display: grid
    grid-template-columns: repeat(2, 58px)
    grid-template-rows: repeat(2, 58px)
    gap: 8px
    place-content: center
    padding: 0
    background-color: $tile
    SPAN
      display: flex
      align-items: center
      justify-content: center
      width: 58px
      height: 58px
      margin: 0
      padding: 0
      border: none
      border-radius: 6px
      box-shadow: none
      background-color: $level
      color: $level-text
      font-size: 26px
      font-weight: 700
      line-height: 1
  DIV.op-scores
    width: 140px
    height: 140px
    display: grid
    grid-template-columns: repeat(2, 58px)
    grid-template-rows: repeat(2, 58px)
    gap: 8px
    place-content: center
    padding: 0
    background-color: $tile
    SPAN
      display: flex
      align-items: center
      justify-content: center
      width: 58px
      height: 58px
      margin: 0
      padding: 0
      border: none
      border-radius: 50%
      box-shadow: none
      background-color: var(--answer)
      color: #fff
      font-size: 22px
      font-weight: 700
      line-height: 1
      &.is-wide
        font-size: 16px
      &.is-wider
        font-size: 13px
  DIV.icon-star, DIV.icon-point
    display: flex
    align-items: center
    justify-content: center
    width: 140px
    height: 140px
    padding: 0
    line-height: 1
    color: $tile
  DIV.icon-star
    background-color: $level
    background-image: none
    color: $level-text
  DIV.icon-point
    color: #fff
    background-size: 100% 100%
    background-image: radial-gradient(circle closest-side, var(--answer) 0 84%, transparent 85%)
  DIV.level-dots
    border: none
    box-shadow: none
    background-color: transparent
    transform: none
  DIV.review-button
    width: 330px

.squares.main-board
  width: 300px
  gap: 12px
  DIV
    margin: 0
.squares.bsquares.main-board
  margin-bottom: 12px

// The arrow out of a menu. It colours itself, so this only places it.
// Both menus use it, so it lives here rather than with either of them.
.plain-back
  display: flex
  align-items: center
  justify-content: center
  width: 56px
  height: 56px
  padding: 0
  border: none
  background: transparent
  box-shadow: none
  cursor: pointer
  DIV
    display: flex
    line-height: 0

// The way into the help screen: a question mark in a circle. The word was
// a heavy block at the foot of every screen. The glyph is free to mean
// "help" now that the choice screen's notes are marked with an i instead.
// The border is what keeps it from reading as a fifth score ball on the
// menus, where four of them sit in the same green just above.
.help-icon
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  width: 52px
  height: 52px
  margin: 22px auto 0
  padding: 0
  border: 2px solid var(--line)
  border-radius: 50%
  background: var(--answer)
  color: #fff
  box-shadow: 0 3px 0 var(--lip)
  font-family: inherit
  font-size: 28px
  font-weight: 700
  line-height: 1
  cursor: pointer
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 var(--lip)

// type-ahead
.type-ahead-group
  position: relative
.type-ahead-group > input
  box-sizing: border-box
  width: 100%
  background-color: $tile
  background-image: none
  border-radius: 8px
  border: 2px solid $line
  box-shadow: 0 3px 0 $lip
  color: $ink
  font-family: inherit
  font-size: 22px
  font-weight: 700
  line-height: 1.3
  padding: 10px 12px
  &::placeholder
    color: var(--muted)
    font-weight: 400
  &:focus
    outline: 3px solid $ink
    outline-offset: 2px
.type-ahead-group > ul
  background-color: $tile
  border-radius: 8px
  border: 2px solid $line
  box-shadow: 0 3px 0 $lip
  display: none
  float: left
  font-size: 22px
  left: 0
  list-style: none
  margin: 8px 0 0
  min-width: 170px
  padding: 5px 0
  position: absolute
  text-align: left
  top: 100%
  z-index: 1000
.type-ahead-group > ul > li > a
  clear: both
  color: $ink
  cursor: default
  display: block
  font-weight: 700
  line-height: 1.3
  padding: 6px 16px
  white-space: nowrap
.type-ahead-group > ul > li.active > a, .type-ahead-group > ul > li > a:hover
  background-color: $level
  color: $level-text
  text-decoration: none

// Fact table sand answergrids
.numerand0
  background: $ink
  color: $tile
.numerand1
  background: $operand
  color: #1A2744
.activen
  background: $level
  color: $level-text
.product
  background: $answer
  color: #fff
.numerand2
  background: $level
  color: $level-text
.active
  background: $answer
  font-weight: 700
  color: #fff
.fheading
  font-size: 40px
  font-weight: 700
  color: $ink
  width: 300px
  margin-left: auto
  margin-right: auto
  padding-left: 24px
  DIV
    width: 60px
    margin: 0
    border-radius: 6px
    display: inline-block
  .large-operator
    color: $ink
    width: 30px
.fact-table
  cursor: pointer
  width: 340px
  border: 1px solid $paper
  margin-top: 20px
  margin-bottom: 28px
  position: relative
  margin-left: auto
  margin-right: auto
  .toperator
    padding: 6px
    border-right: 2px solid $paper
    font-weight: 700
    font-size: 2em
    line-height: 1
  .col
    border-right: 1px solid $paper
    background: $ink
    color: $tile
  .col.activen
    background: $level
    color: $level-text
    // Ink and Chalk set the level colour to the ink, so the cell would vanish
    // into the column. Ring it in the one colour the level is always legible
    // against: its own text colour.
    box-shadow: inset 0 0 0 3px $level-text
  .row
  TABLE
    width: 100%
    border-collapse: collapse
    border: 1px solid $paper
    TD
      font-size: 20px
      font-weight: 700
      padding-top: 4px
      padding-bottom: 4px
      border-bottom: 1px solid $paper
      border-right: 1px solid $paper
      width: 30px
// passed-level count and point total
DIV.icon
  display: inline-block
  font-size: 50px
  line-height: 60px
  background-size: cover
  background-repeat: no-repeat
  background-position: 50% 50%
.icon-star
  width: 100px
  height: 100px
  color: $level-text
  background-color: $level
  background-image: none
.icon-point
  color: #fff
  width: 100px
  height: 100px
  background-size: 100% 100%
  background-image: radial-gradient(circle closest-side, var(--answer) 0 84%, transparent 85%)
@media (prefers-reduced-motion: reduce)
  body .squares DIV:active, body .numpad DIV:active, body .srow:active, body .question-button:active
    transform: none
    box-shadow: 0 3px 0 $lip
</style>
