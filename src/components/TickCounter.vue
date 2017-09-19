<template>
  <div class="tick-counter">
    <table>
      <tr><td><div>{{count}}</div></td></tr>
      <tr><td></td></tr><div>{{counta}}</div></td></tr>
      <tr><td></td></tr><div>{{countb}}</div></td></tr>
    </table>
  </div>
</template>

<script>
const vm = {
  name: 'xicon',
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
      ticks = 140 - ticks
      if (ticks < 0) { ticks = 0 }
      return ticks
    },
    counta () {
      return ' '
    },
    countb () {
      return ' '
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
  float: right
  margin-top: 14px
  margin-right: 30px
  DIV
    background: blue
    width: 45px
    height: 45px
    border-radius: 40px
    line-height: 45px
    font-size: 20px
    color: #fff
    float: right
</style>
