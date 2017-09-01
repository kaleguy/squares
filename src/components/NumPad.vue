<template>
  <div class="numpad" @click="getNum">
    <div>1</div><div>2</div><div>3</div>
    <div>4</div><div>5</div><div>6</div>
    <div>7</div><div>8</div><div>9</div>
    <div class="back" @click="menu"><icon name="arrow-circle-o-left"></icon></div>
    <div>0</div>
    <div class="del"><icon name="times-circle-o"></icon></div>
  </div>
</template>


<script>
  const keyBus = {
    key: ''
  }
  document.onkeypress = function (e) {
    keyBus.key = e.key
  }

  const vm = {
    name: 'numpad',
    props: {
      //level: Object
    },
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
        if (num === '\u2297') {
          return this.$store.commit('CLEARBUFFER')
        }
        this.$store.commit('ADDTOBUFFER', {num})
        return this.checkTotal()
      },
      menu: function () {
        this.$router.replace('/menu/' + this.op)
      },
      checkTotal: function () {
        let num1 = this.$store.state.num1
        let num2 = this.$store.state.currentLevel.index
        let dice1 = this.$store.state.dice1
        let dice2 = this.$store.state.dice2
        if (this.op === '-') {
          num1 = +this.$store.state.num1 + +num2
        }
        if (this.op === 'd') {
          num1 = +this.$store.state.num1 * +num2
        }
        const level = this.$store.state.currentLevel
        let op = this.op
        if (op === 'X') { op = '*' }
        if (op === 'd') { op = '/' }
        if (op === 's') {
          op = '+'
          if (level.index === '1') { num1 = +dice1; num2 = +0 }
          if (level.index === '2') { num1 = +dice1 + 5; num2 = +0 }
          if (level.index === '3') { num1 = +dice1; num2 = +dice2 }
        }
        //console.log(num1, num2, op) // TODO: remove, this is here bc of jshint
        let total = 0
        const l = 'total = +num1 ' + op + ' +num2'
        eval('total = +num1 ' + op + ' +num2')
        total = total / 1
        const buffer = this.$store.state.buffer
        if (buffer < 10 && total > 9) {
          return
        }
        if (+total === +buffer) {
          this.$store.commit('INCCOUNT')
          this.$store.commit('RESET')
          const count = this.$store.state.count
          if (count === 14) {
            const levelKey = this.op + num2;
            this.$store.commit('SETPASS', { key: levelKey })
            playAudio('yay')
            this.$swal('Good Job!', 'You passed this level', 'success')
              .then(() => this.$router.replace('/menu/' + this.op))
          } else {
            console.log(count)
          }
        } else {
          this.$store.commit('CLEARBUFFER')
          this.$store.commit('RESETALL')
          console.log(total, num1, num2, 'NG')
        }
      }
    },
    computed: {
      op () {
        return this.$store.state.currentLevel.op
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
.eq-button
  line-height: .8
.eq
  font-size: 1.2em
  font-weight: bold
  line-height: .5em
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
    box-shadow: 1px 1px 3px #888888;
    width: 1em
    //height: $button-size - 10
    border: 1px solid #000
    border-radius: 10px
    margin: 2px
    padding: 8px
    line-height: 1
    height: .9em
    cursor: pointer
    font-weight: bold
  .del
    color: #00f
    font-size: 40px
    line-height: 1.8
    height: 58px
    width: 64px
    display: block
  .back
    width: 64px
    font-weight: normal
    height: 58px
    color: #00f
    font-size: 40px
    line-height: 1.8
</style>
