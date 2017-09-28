<template>
  <div @click="menu" style="height:100%">
    <div style="display:flex;height:100%">
      <div style="margin:auto">
        <div style="height:140px;width:140px" class="chead icon" v-bind:class="icon"></div>
        <chart v-bind:type="type"></chart>
        </div>
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
</style>
