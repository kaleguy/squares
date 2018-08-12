<template>
  <div class="level-dots">
    <span v-bind:class="dotClass('a')">&#9632;&#9632;&#9632;</span>
    <span v-bind:class="dotClass('b')">&#9632;&#9632;&#9632;</span>
    <span v-bind:class="dotClass('c')">&#9632;&#9632;&#9632;</span>
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
DIV.level-dots
  border: none
  height: 0
  padding-top: 0
  font-size: 10px
  margin: 0
.level-dots SPAN
  font-size: 22px
  border: none
  display: block
  line-height: .6
.dot-orange
  color: #F8C471
.dot-green
  color: #1F9524
</style>
