<template>
  <div class="squares" style="margin-top:40px;">
    <div v-for="level in levels"
         v-bind:class="passed(level)"
         @click="goto(level)">
      <span class="operator">{{operator}}</span><span class="level">{{level}}</span>
    </div>
    <div class="arrow" @click="menu">&#x21e6;</div>
  </div>
</template>


<script>
// const _ = require('lodash')
const vm = {
  name: 'submenu',
  components: {
  },
  props: {
    // levels: Object
  },
  data () {
    return {
    }
  },
  methods: {
    menu: function () {
      this.$router.replace('/')
    },
    submit: function () {
      // console.log('foo')
    },
    goto: function (level) {
      this.$router.replace('/card/' + this.operator + '/' + level)
    },
    passed (level) {
      let cssClass = ''
      const passedLevels = this.$store.state.passedLevels
      const levelKey = this.operator + level
      if (passedLevels[levelKey]) {
        cssClass = 'passed'
      }
      // console.log(cssClass, passedLevels)
      return cssClass
    }
  },
  computed: {
    num1 () {
      return this.$store.state.num1
    },
    levels () {
      // console.log('CURRENT LEVEL = ', this.$store.state.currentLevel)
      // const allLevels = this.$store.state.levels
      // const l = _.find(allLevels, l => l.operator === this.operator).levels
      return [1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    operator () {
      return this.$route.params.operator || '+'
    }
  },
  mounted () {

  },
  updated () {
  }

}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.operator
  font-size: 44px
  display: inline-block
  padding-top: 0
  line-height: .5em
  margin: 0
  margin-bottom: 200px
.level
  display: inline-block
  padding: 0
.passed
  background: green
</style>
