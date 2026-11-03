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
HTML
  height: 100%
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
  background-image: linear-gradient(rgba(26, 39, 68, 0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(26, 39, 68, 0.055) 1px, transparent 1px)
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
    background-color: $ink
    color: $tile
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
    border: 2px solid $ink
    border-radius: 8px
    box-shadow: 0 3px 0 $ink
    height: 75px
    margin: 2px
    user-select: none
    &:active
      transform: translateY(2px)
      box-shadow: 0 1px 0 $ink
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
  DIV.icon-star, DIV.icon-point
    display: flex
    align-items: center
    justify-content: center
    width: 140px
    height: 140px
    padding: 0
    line-height: 1
    color: $tile
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

.help-link
  display: block
  margin: 22px auto 0
  padding: 8px 12px
  border: none
  background: transparent
  color: $ink
  font: inherit
  font-size: 18px
  font-weight: 700
  text-decoration: underline
  text-underline-offset: 3px
  cursor: pointer

// type-ahead
.type-ahead-group
  position: relative
.type-ahead-group > input
  box-sizing: border-box
  width: 100%
  background-color: $tile
  background-image: none
  border-radius: 8px
  border: 2px solid $ink
  box-shadow: 0 3px 0 $ink
  color: $ink
  font-family: inherit
  font-size: 22px
  font-weight: 700
  line-height: 1.3
  padding: 10px 12px
  &::placeholder
    color: #8B97AD
    font-weight: 400
  &:focus
    outline: 3px solid $pen
    outline-offset: 2px
.type-ahead-group > ul
  background-color: $tile
  border-radius: 8px
  border: 2px solid $ink
  box-shadow: 0 3px 0 $ink
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
  background-color: $pen
  color: $tile
  text-decoration: none

// Fact table sand answergrids
.numerand0
  background: $ink
  color: $tile
.numerand1
  background: $operand
  color: $ink
.activen
  background: $pen
  color: $tile
.product
  background: $answer
  color: $tile
.numerand2
  background: $pen
  color: $tile
.active
  background: $answer
  font-weight: 700
  color: $tile
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
    background: $pen
    color: $tile
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
// star and point icon/images
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
  color: $tile
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 31.201 29.676'><polygon points='15.602,0 19.325,11.279 31.2,11.332 21.624,18.36 25.243,29.676 15.602,22.738 5.96,29.676 9.577,18.36 0,11.332 11.878,11.279' fill='%231C7A45'/></svg>")
.icon-star .dot-green
  color: $tile
.icon-star .dot-orange
  color: rgba(255, 255, 255, 0.62)
.icon-point
  color: $tile
  width: 100px
  height: 100px
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><circle cx='50' cy='50' r='42' fill='%231C7A45'/></svg>")
@media (prefers-reduced-motion: reduce)
  body .squares DIV:active, body .numpad DIV:active, body .srow:active, body .question-button:active
    transform: none
    box-shadow: 0 3px 0 $ink
</style>
