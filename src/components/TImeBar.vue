<template>
  <div>
    <div class="timebar">
      <div id="timebarFill"></div>
    </div>
  </div>
</template>


<script>
import { roundSeconds } from '../lib/round'

const vm = {
  name: 'timebar',
  props: {
    active: 'boolean'
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    count () {
      return this.$store.state.count
    }
  },
  beforeDestroy () {
    if (window.mytimer) {
      window.clearInterval(window.mytimer)
      window.mytimer = null
    }
  },
  mounted () {
    this.$store.commit('RESETALL')
    if (this.$store.state.mode === 'p') {
      if (window.mytimer) {
        window.clearInterval(window.mytimer)
      }
      return
    }
    const tb = document.getElementById('timebarFill')
    tb.style.width = 0
    this.$store.commit('RESETALL')
    const bar = 285
    const me = this
    let doTick = false
    function tick () {
      if (doTick) {
        me.$store.commit('TICK')
      }
      doTick = !doTick
      // Two steps a second, for as many seconds as the level is worth. Read
      // per tick, and from the route: this component mounts before its parent
      // has put the new level into the store.
      //
      // The width comes from the store rather than a count kept out here, so
      // that a mistake can wind it back. Held in this closure it was beyond
      // the reach of the mutation that restarts the round, and the bar went on
      // filling from wherever it had got to.
      let w = me.$store.state.time + bar / (roundSeconds(me.$route.params.level) * 2)
      if (w >= bar) {
        me.$store.commit('RESETALL')
        w = 0
      }
      tb.style.width = w + 'px'
      me.$store.commit('SETTIME', { time: w })
    }
    if (window.mytimer) {
      window.clearInterval(window.mytimer)
    }
    window.mytimer = window.setInterval(tick, 500)
  },
  updated () {
  }

}

export default vm

</script>

<style lang="sass">
.timebar
  width: 285px
  background: var(--track)
  height: 12px
  margin-left: auto
  margin-right: auto
  margin-bottom: 10px
#timebarFill
  background: var(--answer)
  height: 100%
  width: 0
</style>
