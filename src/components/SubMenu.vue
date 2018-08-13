<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
      <div style="height:625px">
        <div class="squares csquares">
          <div class="title-button" style="line-height:2.2em">{{username}}</div>
          <div class="icon icon-point">{{points}}</div>
        </div>
        <div>
          <div class="squares top-squares" style="width:280px;border:none;margin-left:auto;margin-right:auto;">
            <div class="v-operator">
              {{visOperator}}
            </div>
            <div
              v-bind:class="passed('1')"
              @click="goto('1')"
              class="level">1
            </div>
            <div
                v-bind:class="passed('1')"
                @click="goto('2')"
                class="level">2
            </div>
          </div>
        </div>
        <div class="squares sub-squares">
          <div v-for="level in levels"
               v-bind:class="passed(level)"
               @click="goto(level)">
            <!--<span class="operator">{{visOperator}}</span>-->
            <levellabel :level="level"></levellabel>
          </div>
          <div
            @click="menu" class="arrow-button">
            <leftarrow style="margin-left:60px; border:none" width="200"></leftarrow>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LevelLabel from './LevelLabel'
import LeftArrow from './LeftArrow'
import _ from 'lodash'
const vm = {
  name: 'submenu',
  components: {
    levellabel: LevelLabel,
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
      return [
        '3a', '3b', '3c', '3d',
        '4a', '4b', '4c', '4d',
        '5a', '5b', '5c', '5d',
        '6a', '6b', '6c', '6d',
        '7a', '7b', '7c', '7d',
        '8a', '8b', '8c', '8d',
        '9a', '9b', '9c', '9d'
      ]
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
    },
    points () {
      const points = _.reduce(this.record, (points, level, k) => {
        if (k.indexOf(this.operator) !== 0) {
          return points
        }
        let min = Object.values(level).sort((prev, next) => prev - next)[0]
        return points + 140 - min
      }, 0)
      return points
    },
    record () {
      const recordKey = this.username + '_levels'
      return JSON.parse(localStorage.getItem(recordKey)) || {}
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
<style lang="sass" scoped>
.title-button
  margin-left: auto
  margin-right: auto
  line-height: 2.3em
.operator
  font-size: 44px
  font-weight: bold
  display: inline-block
  padding-top: 0
  line-height: .5em
  margin: 0
  margin-bottom: 200px
.level
  font-weight: bold
  font-size: 1em
.arrow-button
  width: 200px
  height: 200px
  border: none
  box-shadow: none
  margin-left: auto
  margin-right: auto
  padding-top: 0
.icon
  line-height: 79px
.top-squares DIV
  height: 66px
  padding-top: 7px
  font-weight: bold
  font-size: 3.4em
  padding-bottom: 7px
  line-height: 72px
.sub-squares
  DIV
    font-size: 2.5em
    font-weight: bold
    padding-top: 10px
    line-height: 0.65
    //padding-right: 4px
DIV.v-operator
  border: none
  font-size: 7em
</style>
