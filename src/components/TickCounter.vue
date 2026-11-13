<template>
  <button type="button" class="tick-counter" @click="$emit('explain')"
          :aria-label="count + ' seconds left. What the scores are.'">
    <div>{{count}}</div>
    <div>{{recent[0]}}</div>
    <div>{{recent[1]}}</div>
  </button>
</template>

<script>
import { levelsKey } from '../lib/name'
import { ROUND_SECONDS } from '../lib/round'

// The countdown, plus the scores from the two most recent attempts.
//
// Touching it says what it is. A score is seconds left on a clock, which
// nobody guesses from a bare number in a box.
const vm = {
  name: 'tickcounter',
  computed: {
    // One a second, the same second the bar steps in. It used to show only
    // even numbers, dropping two at a time, which read as a clock losing
    // time rather than keeping it.
    count () {
      return Math.max(0, ROUND_SECONDS - this.$store.state.ticks)
    },
    recent () {
      const scores = this.scores
      const dates = Object.keys(scores).sort().reverse()
      return [0, 1].map(function (i) {
        if (!dates[i]) { return ' ' }
        return Math.max(0, ROUND_SECONDS - scores[dates[i]])
      })
    },
    scores () {
      const username = this.$store.state.username
      if (!username) { return {} }
      const record = JSON.parse(localStorage.getItem(levelsKey(username))) || {}
      return record[this.$store.state.currentLevel.op + this.$store.state.currentLevel.index] || {}
    }
  }
}

export default vm
</script>

<style lang="sass">
.tick-counter
  display: flex
  flex-direction: column
  gap: 8px
  margin: 0
  padding: 0
  border: none
  background: transparent
  font-family: inherit
  cursor: pointer
  DIV
    box-sizing: border-box
    display: flex
    align-items: center
    justify-content: center
    width: 48px
    height: 48px
    border: 2px solid var(--line)
    border-radius: 8px
    box-shadow: 0 2px 0 var(--lip)
    background: var(--tile)
    color: var(--ink)
    font-size: 18px
    font-weight: 700
    line-height: 1
</style>
