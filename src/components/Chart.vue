<template>
  <div @click="menu" class="page">
      <div>
        <div class="chead icon" v-bind:class="icon">{{ mark }}</div>
        <chart v-bind:type="type"></chart>
      </div>
  </div>
</template>

<script>
import Chart from '../directives/chart'
import { levelsKey } from '../lib/name'
const vm = {
  name: 'chartc',
  props: {
    width: String
  },
  components: {
    chart: Chart
  },
  methods: {
    menu: function () {
      this.$router.replace('/main/')
    }
  },
  computed: {
    type () {
      return this.$route.params.type
    },
    icon () {
      if (this.type === 'stars') { return 'icon-star' }
      return 'icon-point'
    },
    mark () {
      if (this.type !== 'stars') { return '' }
      const record = JSON.parse(localStorage.getItem(levelsKey(this.$store.state.username))) || {}
      return Object.keys(record).length
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
DIV.chead.icon
  display: flex
  align-items: center
  justify-content: center
  margin: 0 auto -100px
  height: 140px
  width: 140px
  font-size: 64px
  font-weight: 700
  line-height: 1
DIV.chead.icon-star
  box-sizing: border-box
  border: 2px solid var(--line)
  border-radius: 8px
  box-shadow: 0 3px 0 var(--lip)
</style>
