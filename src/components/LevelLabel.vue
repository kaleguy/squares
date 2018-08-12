<template>
  <span class="level-label">
   <span>{{levelLabel}}</span>
   <leveldots></leveldots>
  </span>
</template>

<script>
import LevelDots from './LevelDots'
const vm = {
  name: 'levellabel',
  data () {
    return {
    }
  },
  props: {
    level: String
  },
  components: {
    leveldots: LevelDots
  },
  methods: {
  },
  computed: {
    levelLabel () {
      const levelNum = this.level.substring(0, 1)
      return levelNum
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
.level-label
</style>
