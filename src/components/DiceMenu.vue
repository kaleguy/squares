<template>
  <div class="dsquares" style="margin-top:40px;">
    <div @click="goto(1)" style="cursor:pointer" class="srow">
      <dice v-bind:count="3"></dice>
    </div>
    <div @click="goto(2)" style="cursor:pointer" class="srow">
      <dice v-bind:count="5"></dice>
      <dice v-bind:count="3"></dice>
    </div>
    <div @click="goto(3)" style="cursor:pointer" class="srow">
      <dice v-bind:count="3"></dice>
      <dice v-bind:count="3"></dice>
    </div>
    <div class="arrow" @click="menu">&#x21e6;</div>
  </div>
</template>

<script>
// const _ = require('lodash')
import Dice from './Dice'
const vm = {
  name: 'dicemenu',
  components: {
    dice: Dice
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
TABLE.dice
  border: 1px solid #aaa
DIV.arrow
  border: none
.passed
  background: green
.srow
  border: 1px solid #eee
  background: #eee
  border-radius: 10px
  padding-top: 10px
  margin-bottom: 8px
</style>
