<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
      <div style="height:625px">

        <div class="squares bsquares">
          <div class="title-button" style="margin-left:auto;margin-right:auto">{{username}}</div>
        </div>

        <div class="squares">
          <div v-for="level in levels"
               v-bind:class="passed(level)"
               @click="goto(level)">
            <span class="operator">{{visOperator}}</span><span class="level">{{level}}</span>
          </div>
          <div
            @click="menu"
            style="width:200px;height:200px;border:none;box-shadow:none;margin-left:auto;margin-right:auto;padding-top:0">
            <leftarrow style="margin-left:60px" width="200"></leftarrow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LeftArrow from './LeftArrow'
const vm = {
  name: 'submenu',
  components: {
    leftarrow: LeftArrow
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
      this.$router.replace('/main/')
    },
    goto: function (level) {
      this.$router.replace('/card/' + this.operator + '/' + level)
    },
    passed (level) {
      let cssClass = ''
      const passedLevels = this.$store.state.passedLevels
      const levelKey = this.operator + level
      if (passedLevels[levelKey]) {
        cssClass = 'icon icon-star'
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
    visOperator () {
      if (this.operator === 'd') {
        return '\u00f7'
      }
      if (this.operator === 'X') {
        return '\u00d7'
      }
      if (this.operator === '-') {
        return '\u2212'
      }
      return this.operator
    },
    operator () {
      let op = this.$route.params.operator || '+'
      return op
    },
    username () {
      return this.$store.state.username
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
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
  font-weight: bold
  display: inline-block
  padding-top: 0
  line-height: .5em
  margin: 0
  margin-bottom: 200px
.level
  display: inline-block
  padding: 0
  font-weight: bold
.passed
  color: #fff
  background: green
</style>
