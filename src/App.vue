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
  --grid: rgba(244, 240, 228, 0.07)
  --muted: #A8B5A4
  --track: #2C463A
  --level: #C98FC4
  --level-text: #12211B
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
// The three circles at the foot of the menu: what the app is, how it is
// going, and how it looks. The border keeps them from reading as a row of
// score balls in the same green.
.round-icon
  box-sizing: border-box
  display: flex
  align-items: center
  justify-content: center
  width: 52px
  height: 52px
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
  SVG
    display: block
    width: 26px
    height: 26px
// A card raised over the screen, and the veil it sits on. It was the note
// the Steps-or-Grid screen raised; the settings card and the card that says
// what a score is are drawn the same way.
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
  width: 300px
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
  font-size: 16px
  line-height: 1.35
// Wider than a note: three swatches have to stand in a row.
.note-card.settings-card
  width: 320px
  padding: 22px
.note-title.settings-title
  margin-bottom: 16px
.settings-heading
  margin: 4px 0 10px
  color: var(--muted)
  font-size: 16px
  font-weight: 700
  text-align: left
.settings-names
  overflow-y: auto
  text-align: left
.settings-empty
  color: var(--muted)
  font-size: 16px
.settings-name
  display: flex
  align-items: center
  justify-content: space-between
  height: 36px
  color: var(--ink)
  font-size: 18px
  font-weight: 700
.settings-x
  display: flex
  align-items: center
  justify-content: center
  width: 36px
  height: 36px
  padding: 0
  border: none
  background: transparent
  color: var(--miss)
  cursor: pointer
.settings-confirm
  padding: 6px 0
  color: var(--ink)
  font-size: 15px
  text-align: center
.settings-confirm-buttons
  display: flex
  justify-content: center
  gap: 10px
  margin-top: 8px
.settings-keep, .settings-delete
  box-sizing: border-box
  width: 100px
  height: 38px
  padding: 0
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 2px 0 var(--lip)
  font-family: inherit
  font-size: 16px
  font-weight: 700
  cursor: pointer
.settings-keep
  background: var(--tile)
  color: var(--ink)
.settings-delete
  background: var(--miss)
  color: #fff
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
@media (prefers-reduced-motion: reduce)
  body .numpad DIV:active, body .level-tile:active, body .op-tile:active
    transform: none
    box-shadow: 0 3px 0 $lip
</style>
