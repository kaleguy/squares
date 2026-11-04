<template>
  <div class="level-label">
   <span>{{levelLabel}}</span>
   <div class="level-mark">
     <leveldots :level="level"></leveldots>
     <span v-if="score !== null" class="level-score">{{score}}</span>
   </div>
  </div>
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
    level: String,
    score: { default: null }
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
.squares DIV.level-label
  display: flex
  flex-direction: column
  align-items: center
  justify-content: center
  box-sizing: border-box
  width: 100%
  height: 100%
  margin: 0
  padding: 4px 6px
  gap: 2px
  border: none
  border-radius: 0
  box-shadow: none
  background: transparent
  transform: none
  font-size: 24px
  font-weight: 700
  line-height: 1
  color: inherit
  cursor: inherit
.level-label > SPAN
  flex: none
  font-size: 24px
  font-weight: 700
  line-height: 1
.squares DIV.level-mark
  position: relative
  flex: none
  width: 34px
  height: 34px
  margin: 0
  padding: 0
  border: none
  border-radius: 0
  box-shadow: none
  background: transparent
  transform: none
  font-size: 0
  line-height: 0
  color: inherit
  cursor: inherit
body .squares DIV.level-label:active,
body .squares DIV.level-mark:active
  transform: none
  box-shadow: none
.level-mark > .level-score
  position: absolute
  left: 50%
  top: 50%
  transform: translate(-50%, -50%)
  display: flex
  align-items: center
  justify-content: center
  width: 28px
  height: 28px
  border-radius: 50%
  background: rgba(7, 14, 11, 0.5)
  box-shadow: inset 0 0 0 1.5px rgba(244, 240, 228, 0.85)
  font-size: 15px
  font-weight: 700
  line-height: 1
  color: var(--mark-off)
</style>
