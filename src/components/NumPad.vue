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
      <leftarrow width="40" tight></leftarrow>
    </div>
    <div>0</div>
    <div class="del">
      <xicon width="50" style="margin-top:5px"></xicon>
    </div>
  </div>
</template>


<script>
  /* global playAudio */
  import LeftArrow from './LeftArrow'
  import X from './X'
  import { levelsKey } from '../lib/name'

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
      return {

      }
    },
    methods: {
      recordPass: function (levelKey) {
        // if (!time) { time = 140 }
        let time = this.$store.state.ticks
        const recordKey = levelsKey(this.username)
        let record = JSON.parse(localStorage.getItem(recordKey))
        if (!record) { record = {} }
        let levelRecord = record[levelKey]
        if (!levelRecord) {
          levelRecord = {}
          record[levelKey] = levelRecord
        }
        let dateKey = moment().format('YYYY-MM-DD-mm-ss')
        levelRecord[dateKey] = time
        localStorage.setItem(recordKey, JSON.stringify(record))
      },
      submit: function () {
      },
      warn: function (message, event) {
      },
      keyFromEvent: function (e) {
        let el = e.target
        if (el !== this.$el && el.closest) {
          const key = el.closest('.numpad > div')
          if (key) return key
        }
        // Rounded corners and the press lip sit outside the key, so a click
        // there hits the pad. Count it as the nearest key.
        const x = e.clientX
        const y = e.clientY
        let best = null
        let bestD = 64
        Array.from(this.$el.children).forEach(key => {
          const r = key.getBoundingClientRect()
          const cx = Math.min(Math.max(x, r.left), r.right)
          const cy = Math.min(Math.max(y, r.top), r.bottom)
          const d = (x - cx) * (x - cx) + (y - cy) * (y - cy)
          if (d < bestD) {
            bestD = d
            best = key
          }
        })
        return best
      },
      getNum: function (e) {
        const el = this.keyFromEvent(e)
        if (!el) return
        if (el.classList.contains('back')) {
          if (e.target === this.$el) this.menu()
          return
        }
        const num = (el.innerText || '').trim()
        if (!/^[0-9]$/.test(num)) {
          return this.$store.commit('CLEARBUFFER')
        }
        if (this.$store.state.errorState) {
          this.$store.commit('CLEARERRORSTATE')
        }
        this.$store.commit('ADDTOBUFFER', {num})
        return this.checkTotal()
      },
      menu: function () {
        this.$router.replace('/menu/' + this.op)
      },
      checkTotal: function () {
        let num1 = this.$store.state.num1
        let num2 = this.$store.state.currentLevel.index.substring(0, 1)
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
          if (this.errorState) {
            this.$store.commit('RESETALL')
          }
          this.$store.commit('RESET')
          const count = this.$store.state.count
          if (this.mode === 'p') { return }
          if (+count === 27) {
            const levelKey = this.op + level.index
            this.$store.commit('SETPASS', {key: levelKey})
            this.recordPass(levelKey)
            playAudio('yay')
            this.$swal('Good Job!', 'You passed this level', 'success')
              .then(() => this.$router.replace('/menu/' + this.op))
          } else {
          }
        } else {
          this.$store.commit('SETERRORSTATE')
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
      mode () {
        return this.$store.state.mode || 't'
      },
      op () {
        return this.$store.state.currentLevel.op
      },
      username () {
        return this.$store.state.username
      },
      errorState () {
        return this.$store.state.errorState
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
      width: 1em
      border: 2px solid var(--line)
      border-radius: 8px
      background-color: var(--tile)
      color: var(--ink)
      box-shadow: 0 3px 0 var(--lip)
      margin: 2px
      padding: 8px
      line-height: 1
      height: .9em
      cursor: pointer
      font-weight: 700
      user-select: none
      &:active
        transform: translateY(2px)
        box-shadow: 0 1px 0 var(--lip)
    DIV DIV
      border: none
      box-shadow: none
      background-color: transparent
      width: auto
      height: auto
      margin: 0
      padding: 0
      line-height: 0
      &:active
        transform: none
    .del
      color: var(--miss)
      font-size: 40px
      line-height: 1.8
      height: 57px
      width: 64px
      display: block
    .back
      display: flex
      align-items: center
      justify-content: center
      width: 64px
      height: 57px
      color: var(--ink)
      font-size: 40px
      line-height: 1
</style>
