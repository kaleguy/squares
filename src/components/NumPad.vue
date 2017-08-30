<template>
  <div class="numpad" @click="getNum">
    <div>1</div><div>2</div><div>3</div>
    <div>4</div><div>5</div><div>6</div>
    <div>7</div><div>8</div><div>9</div>
    <div class="back" @click="menu">&#x21e6;</div>
    <div>0</div>
    <div class="del">&#x2297;</div>
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
    props: {
      level: Object
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
        const num1 = this.$store.state.num1
        const num2 = this.$store.state.currentLevel.index
        const level = this.$store.state.currentLevel
        let op = this.op
        if (op === 'X') { op = '*' }
        //console.log(num1, num2, op) // TODO: remove, this is here bc of jshint
        const total = 0
        const l = 'total = +num1 ' + op + ' +num2'
        console.log('L', l)
        eval('total = +num1 ' + op + ' +num2')
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
            console.log(levelKey)
            this.$store.commit('SETPASS', { key: levelKey })
            this.$swal('Good Job!', 'You passed this level', 'success')
              .then(() => this.$router.replace('/menu/' + op))
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
    font-weight: normal
  .del
    color: #f44
    font-size: 1em
    line-height: .8em
    height: 58px
    width: 64px
    display: block
  .back
    width: 64px
    font-weight: normal
    height: 58px
    color: #f44
    font-size: .7em
    line-height: 1.4em
</style>
