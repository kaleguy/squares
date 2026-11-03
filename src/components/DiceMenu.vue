<template>
  <div class="page">
  <div class="dsquares smenu">
    <div @click="goto(1)" style="cursor:pointer"
         v-bind:class="passed('1')"
         class="srow">
      <dice v-bind:count="3"></dice>
    </div>
    <div @click="goto(2)" style="cursor:pointer"
         v-bind:class="passed('2')"
         class="srow">
      <dice v-bind:count="5"></dice>
      <dice v-bind:count="3"></dice>
    </div>
    <div @click="goto(3)" style="cursor:pointer"
         v-bind:class="passed('3')"
         class="srow">
      <dice v-bind:count="3"></dice>
      <dice v-bind:count="3"></dice>
    </div>
    <div class="arrow"
         style="width:200px;height:200px;border:none;box-shadow:none;margin-left:auto;margin-right:auto;margin-top:20px"
         @click="menu">
      <leftarrow style="margin-left:60px" width="200"></leftarrow>
    </div>
  </div>
  </div>
</template>

<script>
// const _ = require('lodash')
import Dice from './Dice'
import LeftArrow from './LeftArrow'
const vm = {
  name: 'dicemenu',
  components: {
    dice: Dice,
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
      this.$router.replace('/card/s/' + level)
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
    operator () {
      return 's'
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
.dsquares
  width: 360px
  margin-left: auto
  margin-right: auto
DIV.dtable
  display: inline-block
  height: 122px
  width: 122px
.smenu TABLE.dice
  border: 2px solid #1A2744
  box-shadow: none
DIV.arrow
  font-size: 80px
  width: 100px
  height: 100px
  line-height: 1.8
.srow
  border: 2px solid #1A2744
  background: #fff
  border-radius: 8px
  box-shadow: 0 3px 0 #1A2744
  padding-top: 10px
  margin-bottom: 12px
  &:active
    transform: translateY(2px)
    box-shadow: 0 1px 0 #1A2744
.passed
  background: #1C7A45
</style>
