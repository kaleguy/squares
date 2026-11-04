<template>
  <div>
    <div class="timebar">
      <div id="timebarFill"></div>
    </div>
  </div>
</template>


<script>
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
    const step = bar / 120
    let w = 0
    const me = this
    let doTick = false
    function tick () {
      if (doTick) {
        me.$store.commit('TICK')
      }
      doTick = !doTick
      w = w + step
      if (w >= bar) {
        me.$store.commit('RESETALL')
        w = 0
        tb.style.width = '0px'
      } else {
        tb.style.width = w + 'px'
      }
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
