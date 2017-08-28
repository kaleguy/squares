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
    submit: function () {
      // console.log('foo')
    },

    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    }
  },
  computed: {
    dots () {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    count () {
      return this.$store.state.count
    }
  },
  mounted () {
    console.log('MOUNTED')
    const tb = document.getElementById('timebarFill')
    tb.style.width = 0
    this.$store.commit('RESETALL')
    let w = this.$store.state.time
    const me = this
    function tick () {
      w = me.$store.state.time
      if (w < 240) {
        w = w + 1
        tb.style.width = w + 'px'
      } else {
        // tb.style.width = 0
        me.$store.commit('RESETALL')
        w = -8
      }
      me.$store.commit('SETTIME', { time: w })
    }
    // console.log(tick)
    if (window.mytimer) {
      window.clearInterval(window.mytimer)
    }
    console.log('got here')
    window.mytimer = window.setInterval(tick, 150)
  },
  updated () {
  }

}

export default vm

</script>

<style lang="sass">
.timebar
  box-shadow: 1px 1px 3px #888888;
  width: 240px
  background: green
  height: 1em
  margin-left: auto
  margin-right: auto
  margin-bottom: 10px
#timebarFill
  background: lightgreen
  height: 100%
  width: 240px
</style>
