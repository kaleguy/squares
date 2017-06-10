<template>
  <div class="numpad" @click="getNum">
    <div>1</div><div>2</div><div>3</div>
    <div>4</div><div>5</div><div>6</div>
    <div>7</div><div>8</div><div>9</div>
    <div><icon class='del' name="times-circle"></icon></div>
    <div>0</div>
    <div class="eq-button"><span class="eq">=</span></div>
  </div>
</template>


<script>
  const keyBus = {
    key: ''
  }
  document.onkeypress = function (e) {
    console.log('xx', e.key)
    keyBus.key = e.key
  }

  const vm = {
    name: 'numpad',
    data () {
      return {
      }
    },
    methods: {
      submit: function () {
      },

      warn: function (message, event) {
      },
      getNum: function (e) {
        const num = e.target.innerText
        if (num === '=') {
          return this.checkTotal()
        }
        console.log(e.target.innerText)
        this.$store.commit('ADDTOBUFFER', {num})
      },
      checkTotal: function () {
        const num1 = this.$store.state.num1
        const num2 = this.$store.state.num2
        const level = this.$store.state.currentLevel
        const op = this.$store.state.levels[level].op // operator, e.g. '+'
        console.log(num1, num2, op) // TODO: remove, this is here bc of jshint
        const total = 0
        const l = 'total = +num1 ' + op + ' +num2'
        console.log(l)
        eval('total = +num1 ' + op + ' +num2')
        const buffer = this.$store.state.buffer
        if (+total === +buffer) {
          console.log('ok')
          this.$store.commit('INCCOUNT')
          this.$store.commit('RESET')
        } else {
          this.$store.commit('CLEARBUFFER')
          this.$store.commit('RESETALL')
          console.log('NG')
        }
      }
    },
    computed: {
      num1 () {
      }
    }
  }

  export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
$button-size: 3em
.fa-icon
  width: auto;
  height: 1em /* or any other relative font sizes */
.del
  color: #f66
  font-size: 1em
  padding-bottom: 0
  line-height: .1em
.eq-button
  line-height: .8
.eq
  font-size: 1.2em
  font-weight: bold
.numpad
  font-size: 4em
  font-weight: bold
  display: flex
  flex-direction: row
  flex-flow: row wrap
  width: 4.2em
  margin-left: auto
  margin-right: auto
  border: 0px solid #ccc
  border-radius: 6px
  DIV
    width: 1em
    //height: $button-size - 10
    border: 2px solid #ccc
    border-radius: 10px
    margin: 2px
    padding: 8px
    line-height: 1
    height: .9em
    cursor: pointer
</style>
