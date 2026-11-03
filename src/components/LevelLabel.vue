<template>
  <span class="level-label">
   <span>{{levelLabel}}</span>
   <leveldots :level="level"></leveldots>
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
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: 100%
  height: 100%
  padding: 5px 8px
  gap: 2px
  line-height: 1
.level-label > SPAN
  flex: none
  font-size: 24px
  font-weight: 700
  line-height: 1
</style>
