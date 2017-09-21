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
      ticks = 140 - ticks
      if (ticks < 0) { ticks = 0 }
      return ticks
    },
    counta () {
      if (!this.scores) { return }
      let dates = ''
      try {
        dates = Object.keys(this.scores).sort((a, b) => a < b)
        if (dates[0]) {
          return 140 - this.scores[dates[0]]
        }
      } catch (e) {
        console.log('E', e)
      }
      return ' '
    },
    countb () {
      if (!this.scores) { return }
      let dates = Object.keys(this.scores).sort((a, b) => a < b)
      if (dates[1]) { return 140 - this.scores[dates[1]] }
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
      const recordKey = this.username + '_levels'
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
  float: right
  margin-top: 14px
  margin-right: 32px
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
