<template>
  <div class="dtable">
    <div v-if="num1===1">
      <table class="dice">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td class="d"></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
      </table>
    </div>
    <div v-if="num1===2">
      <table class="dice">
        <tr><td></td><td></td><td class="d"></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td class="d"></td><td></td><td></td></tr>
      </table>
    </div>
    <div v-if="num1===3">
      <table class="dice">
        <tr><td></td><td></td><td class="d"></td></tr>
        <tr><td></td><td class="d"></td><td></td></tr>
        <tr><td class="d"></td><td></td><td></td></tr>
      </table>
    </div>
    <div v-if="num1===4">
      <table class="dice">
        <tr><td class="d"></td><td></td><td class="d"></td></tr>
        <tr><td></td><td></td><td></td></tr>
        <tr><td class="d"></td><td></td><td class="d"></td></tr>
      </table>
    </div>
    <div v-if="num1===5">
      <table class="dice">
        <tr><td class="d"></td><td></td><td class="d"></td></tr>
        <tr><td></td><td class="d"></td><td></td></tr>
        <tr><td class="d"></td><td></td><td class="d"></td></tr>
      </table>
    </div>
    <div v-if="num1===6">
      <table class="dice">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td class="d"></td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
      </table>
    </div>
    <div v-if="num1 &gt; 6">
      <table class="dice">
        <tr><td></td><td></td><td></td></tr>
        <tr><td></td><td>{{num1}}</td><td></td></tr>
        <tr><td></td><td></td><td></td></tr>
      </table>
    </div>
  </div>
</template>

<script>
const vm = {
  name: 'die',
  props: {
    count: Object
  },
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    num1 () {
      return this.$store.state.dice1
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
$size: 1.4em
$color: green
.dot
  box-shadow: 1px 1px 3px #888888;
  width: $size
  height: $size
  border-radius: 4px
  border: 2px solid $color
  display: inline-block
  margin: 3px
  margin-bottom: 0
.dotbar
  width: 240px
  margin-top: 3px
  margin-bottom: 4px
  margin-left: auto
  margin-right: auto
.ball
  background: $color
DIV.dtable
  display: inline-block
  height: 122px
  width: 122px
.dice
  width: 140px
  height: 140px
  margin-left: auto
  margin-right: auto
  background: #fff
  margin-top: 40px
  margin-bottom: auto
  border: 3px solid #ccc
  border-radius: 10px
  TD
    padding: 4px
    background: #fff
    border: 8px solid #fff
  .d
    background: blue
</style>
