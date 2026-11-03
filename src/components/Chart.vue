<template>
  <div @click="menu" class="page">
      <div>
        <div class="chead icon" v-bind:class="icon"></div>
        <chart v-bind:type="type"></chart>
      </div>
  </div>
</template>

<script>
import Chart from '../directives/chart'
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
.chead
  position: middle
  margin-bottom: -100px
  height: 140px
  width: 140px
</style>
