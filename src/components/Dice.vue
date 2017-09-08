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
        <tr><td class="d"></td><td class=""></td><td class="d"></td></tr>
        <tr><td class="d"></td><td class=""></td><td class="d"></td></tr>
        <tr><td class="d"></td><td class=""></td><td class="d"></td></tr>
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
  name: 'dice',
  props: {
    count: Number
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
      if (this.count) { return this.count }
      if (this.$store.state.currentLevel.op === 's') {
        return this.$store.state.dice1
      }
      return this.$store.state.num1
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
.dice
  width: 120px
  height: 120px
  margin-left: auto
  margin-right: auto
  background: #fff
  margin-top: 0
  margin-bottom: 0
  border: 3px solid #666
  border-radius: 10px
  TD
    padding: 4px
    background: #fff
    border: 8px solid #fff
  .d
    background: blue
</style>
