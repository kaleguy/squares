<template>
  <div class="level-dots">
    <span v-for="n in 9" :key="n" v-bind:class="dotClass(rowOf(n))"></span>
  </div>
</template>

<script>
const vm = {
  name: 'leveldots',
  data () {
    return {
    }
  },
  props: {
    level: String
  },
  components: {
  },
  methods: {
    rowOf (n) {
      if (n <= 3) { return 'a' }
      if (n <= 6) { return 'b' }
      return 'c'
    },
    dotClass (sublevel) {
      let cssClass = 'dot-orange'
      const levelType = this.level.substring(1, 2)
      switch (levelType) {
        case 'a':
          if (sublevel === 'a') { cssClass = 'dot-green' }
          break
        case 'b':
          if (sublevel === 'b') { cssClass = 'dot-green' }
          break
        case 'c':
          if (sublevel === 'c') { cssClass = 'dot-green' }
          break
        case 'd':
          cssClass = 'dot-green'
          break
        default:
      }
      // console.log(cssClass, passedLevels)
      return cssClass
    }
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
DIV.level-dots.level-dots
  display: grid
  grid-template-columns: repeat(3, 1fr)
  grid-template-rows: repeat(3, 1fr)
  gap: 2px
  flex: none
  align-self: center
  width: 34px
  height: 34px
  min-height: 0
  margin: 0
  padding: 0
  border: none
  box-shadow: none
  background: transparent
  font-size: 0
  line-height: 0
.level-dots SPAN
  display: block
  width: auto
  height: auto
  min-width: 0
  min-height: 0
  margin: 0
  padding: 0
  border: none
  border-radius: 2px
  box-shadow: none
  font-size: 0
  line-height: 0
.dot-orange
  background: var(--mark-off)
.dot-green
  background: var(--mark-on)
.passed .dot-green
  background: var(--passed-dot-on)
.passed .dot-orange
  background: var(--passed-dot-off)
</style>
