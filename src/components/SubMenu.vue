<template>
  <div class="squares">
    <div v-for="level in levels" @click="goto(level)">
      {{operator}}{{level}}
    </div>
    <div class="review-button">Review</div>
    <div class="arrow" @click="menu">&#x2b05</div>
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
      console.log(level.operator)
      this.$router.replace('/card/' + this.operator + '/' + level)
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

</style>
