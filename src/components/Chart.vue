<template>
  <div><chart></chart></div>
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
  },
  computed: {
  },
  mounted () {
  },
  updated () {
  }
}

export default vm

</script>
<style lang="sass">
</style>
