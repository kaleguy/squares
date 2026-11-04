<template>
  <div class="tick-counter">
    <div>{{count}}</div>
    <div>{{counta}}</div>
    <div>{{countb}}</div>
  </div>
</template>

<script>
import { levelsKey } from '../lib/name'
import { roundSeconds } from '../lib/round'
const vm = {
  name: 'tickcounter',
  data () {
    return {
      oldTicks: 0
    }
  },
  props: {
    width: String
  },
  components: {
  },
  methods: {
  },
  computed: {
    count () {
      let ticks = this.$store.state.ticks
      if (ticks % 2 === 0) {
        this.oldTicks = ticks
      } else {
        ticks = this.oldTicks
      }
      ticks = roundSeconds(this.$store.state.currentLevel.index) - ticks
      if (ticks < 0) { ticks = 0 }
      return ticks
    },
    counta () {
      if (!this.scores) { return }
      let dates = ''
      try {
        dates = Object.keys(this.scores).sort((a, b) => a < b)
        if (dates[0]) {
          return Math.max(0, 70 - this.scores[dates[0]])
        }
      } catch (e) {
        console.log('E', e)
      }
      return ' '
    },
    countb () {
      if (!this.scores) { return }
      let dates = Object.keys(this.scores).sort((a, b) => a < b)
      if (dates[1]) { return Math.max(0, 70 - this.scores[dates[1]]) }
      console.log(dates, dates[1])
      return ' '
    },
    username () {
      return this.$store.state.username
    },
    scores () {
      if (!this.username) {
        return {}
      }
      const recordKey = levelsKey(this.username)
      const levelKey = this.op + '' + this.level.index
      let record = JSON.parse(localStorage.getItem(recordKey))
      if (!record) {
        return {}
      }
      return record[levelKey]
    },
    level () {
      return this.$store.state.currentLevel
    },
    op () {
      return this.$store.state.currentLevel.op
    }
  },
  mounted () {
  },
  updated () {
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
  DIV
    background: var(--tile)
    width: 44px
    height: 44px
    border: 2px solid var(--line)
    border-radius: 8px
    box-shadow: 0 2px 0 var(--lip)
    line-height: 40px
    font-size: 18px
    font-weight: 700
    color: var(--ink)
</style>
