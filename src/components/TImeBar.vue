<template>
  <div>
    <div class="timebar">
      <div class="timebar-fill" :style="{ width: width + 'px' }"></div>
    </div>
  </div>
</template>

<script>
import { ROUND_SECONDS } from '../lib/round'

const BAR = 285

// The round's clock. Mounting it starts the round; leaving stops it.
//
// The ticks are read off the real clock rather than counted in timer fires.
// Counting fires, two to a second, let a busy page stretch a second and the
// round with it, and left the bar half a second ahead of the number beside
// it. The bar and the number step together now, once a second, on the second.
const vm = {
  name: 'timebar',
  data () {
    return {
      width: 0
    }
  },
  methods: {
    stop () {
      if (window.mytimer) {
        window.clearInterval(window.mytimer)
        window.mytimer = null
      }
    },
    tick () {
      const elapsed = Math.floor((Date.now() - this.started) / 1000)
      if (elapsed === this.$store.state.ticks) { return }
      // A mistake winds the clock back, and the round with it.
      if (this.$store.state.ticks === 0 && elapsed > 1) {
        this.started = Date.now()
        this.width = 0
        return
      }
      this.$store.commit('SETTICKS', { ticks: elapsed })
      this.width = Math.min(BAR, elapsed * BAR / ROUND_SECONDS)
      this.$store.commit('SETTIME', { time: this.width })
      // Out of time: the round starts over.
      if (elapsed >= ROUND_SECONDS) {
        this.$store.commit('RESETALL')
        this.started = Date.now()
        this.width = 0
      }
    }
  },
  beforeDestroy () {
    this.stop()
  },
  mounted () {
    this.$store.commit('RESETALL')
    this.stop()
    if (this.$store.state.mode === 'p') { return }
    this.started = Date.now()
    this.width = 0
    window.mytimer = window.setInterval(this.tick, 100)
  }
}

export default vm
</script>

<style lang="sass">
.timebar
  width: 285px
  // Taller than the hairline it was. It is the only thing on the card that
  // moves of its own accord, and a round is read off it.
  height: 18px
  margin: 0 auto 10px
  background: var(--track)
.timebar-fill
  height: 100%
  width: 0
  background: var(--answer)
</style>
