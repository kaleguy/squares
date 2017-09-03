<template>
  <div class="numpad" @click="getNum">
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
    <div>5</div>
    <div>6</div>
    <div>7</div>
    <div>8</div>
    <div>9</div>
    <div class="back" @click="menu">
      <leftarrow width="110" style="margin-left:10px;margin-top:10px"></leftarrow>
    </div>
    <div>0</div>
    <div class="del">
      <xicon width="50" style="margin-top:5px"></xicon>
      </icon></div>
  </div>
</template>


<script>
  /* global playAudio */
  import LeftArrow from './LeftArrow'
  import X from './X'

  const moment = require('moment')
  const keyBus = {
    key: ''
  }
  document.onkeypress = function (e) {
    keyBus.key = e.key
  }
  const vm = {
    name: 'numpad',
    components: {
      leftarrow: LeftArrow,
      xicon: X
    },
    props: {},
    data () {
      return {}
    },
    methods: {
      recordPass: function (levelKey, time) {
        if (!time) {
          time = 30
        }
        const recordKey = this.username + '_levels'
        let record = JSON.parse(localStorage.getItem(recordKey))
        if (!record) {
          record = {}
        }
        let levelRecord = record[levelKey]
        if (!levelRecord) {
          levelRecord = {}
          record[levelKey] = levelRecord
        }
        let dateKey = moment().format('YYYY-MM-DD')
        levelRecord[dateKey] = time
        localStorage.setItem(recordKey, JSON.stringify(record))
      },
      submit: function () {
      },
      warn: function (message, event) {
      },
      getNum: function (e) {
        const num = e.target.innerText
        if (typeof num === 'undefined') {
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
        if (op === 'X') {
          op = '*'
        }
        if (op === 'd') {
          op = '/'
        }
        if (op === 's') {
          op = '+'
          if (level.index === '1') {
            num1 = +dice1
            num2 = +0
          }
          if (level.index === '2') {
            num1 = +dice1 + 5
            num2 = +0
          }
          if (level.index === '3') {
            num1 = +dice1
            num2 = +dice2
          }
        }
        let total = 0
        // const l = 'total = +num1 ' + op + ' +num2'
        eval('total = +num1 ' + op + ' +num2') // eslint-disable-line
        total = total / 1
        const buffer = this.$store.state.buffer
        if (buffer < 10 && total > 9) {
          return
        }
        if (+total === +buffer) {
          this.$store.commit('INCCOUNT')
          this.$store.commit('RESET')
          const count = this.$store.state.count
          console.log('COUNT', count)
          if (+count === 14) {
            const levelKey = this.op + level.index
            this.$store.commit('SETPASS', {key: levelKey})
            this.recordPass(levelKey)
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
    mounted () {
      if (!this.username) {
        this.$router.replace('/')
      }
    },
    computed: {
      op () {
        return this.$store.state.currentLevel.op
      },
      username () {
        return this.$store.state.username
      }
    }
  }

  export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  $button-size: 3em
  .fa-icon
    width: auto
    height: 1em
  /* or any other relative font sizes */
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
      height: 57px
      width: 64px
      display: block
    .back
      width: 64px
      font-weight: normal
      height: 57px
      color: #00f
      font-size: 40px
      line-height: 1.8
</style>
