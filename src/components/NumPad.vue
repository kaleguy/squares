<template>
  <div>
    <keypad @digit="onDigit" @back="menu" @clear="clear"></keypad>
    <passcard v-if="passed"
              title="Level passed"
              :score="score"
              :detail="passDetail"
              :is-best="isBest"
              @done="done"></passcard>
  </div>
</template>


<script>
  import * as analytics from '../lib/analytics'
  /* global playAudio */
  import Keypad from './Keypad'
  import PassCard from './PassCard'
  import { levelsKey } from '../lib/name'
  import { roundTarget, scoredTicks } from '../lib/round'
  import { noteFact } from '../lib/facts'

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
      keypad: Keypad,
      passcard: PassCard
    },
    props: {},
    data () {
      return {
        passed: false,
        score: 0,
        isBest: false,
        passDetail: ''
      }
    },
    methods: {
      best: function (levelRecord) {
        if (!levelRecord) { return 0 }
        const times = Object.values(levelRecord).map(Number).filter(n => !isNaN(n))
        if (!times.length) { return 0 }
        return Math.max(0, 70 - times.sort((a, b) => a - b)[0])
      },
      done: function () {
        this.passed = false
        this.$router.replace('/menu/' + this.op)
      },
      recordPass: function (levelKey) {
        const level = this.$store.state.currentLevel.index
        let time = scoredTicks(this.$store.state.ticks, level)
        const recordKey = levelsKey(this.username)
        let record = JSON.parse(localStorage.getItem(recordKey))
        if (!record) { record = {} }
        // What the round just passed was worth, and whether it beat the best.
        this.score = Math.max(0, 70 - time)
        this.isBest = this.score > this.best(record[levelKey])
        const secs = this.$store.state.ticks
        this.passDetail = roundTarget(level) + ' answers in ' + secs +
          (secs === 1 ? ' second' : ' seconds')
        let levelRecord = record[levelKey]
        if (!levelRecord) {
          levelRecord = {}
          record[levelKey] = levelRecord
        }
        // With no hour in it, two rounds an hour apart to the minute and
        // second overwrote each other, and the later one was lost.
        let dateKey = moment().format('YYYY-MM-DD-HH-mm-ss')
        levelRecord[dateKey] = time
        localStorage.setItem(recordKey, JSON.stringify(record))
      },
      recordFail: function (levelKey) {
        if (!this.$store.state.passedLevels[levelKey]) return
        const recordKey = levelsKey(this.username)
        const record = JSON.parse(localStorage.getItem(recordKey)) || {}
        delete record[levelKey]
        localStorage.setItem(recordKey, JSON.stringify(record))
        this.$store.commit('CLEARPASS', { key: levelKey })
      },
      submit: function () {
      },
      warn: function (message, event) {
      },
      clear: function () {
        this.$store.commit('CLEARBUFFER')
      },
      onDigit: function (num) {
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
        // The eval below is the only reader of num1 once the operator has
        // been folded in, and eslint cannot see inside it.
        let num1 = this.$store.state.num1 // eslint-disable-line no-unused-vars
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
        const card = this.$store.state.num1
        if (+total === +buffer) {
          noteFact(this.username, this.op, level.index, card, true)
          this.$store.commit('INCCOUNT')
          this.$store.commit('RESET')
          const count = this.$store.state.count
          if (this.mode === 'p') { return }
          if (+count === roundTarget(level.index)) {
            const levelKey = this.op + level.index
            this.$store.commit('SETPASS', {key: levelKey})
            this.recordPass(levelKey)
            analytics.capture('level passed', {
              operator: this.op,
              level: level.index,
              seconds: this.$store.state.ticks,
              score: this.score,
              best: this.isBest,
              spoken: false
            })
            playAudio('yay')
            this.passed = true
          } else {
          }
        } else {
          noteFact(this.username, this.op, level.index, card, false)
          // The card holds the problem until the right number is entered: the
          // wrong digits stay, red, and the next keypress clears them. The
          // round starts again from the top, which is what the mistake costs,
          // but it stays a timed round. Dropping into practice meant a
          // mistyped digit cost a trip to the switch and back, and a mistyped
          // digit is most of what goes wrong.
          if (this.mode === 't' && this.op !== 's') {
            this.recordFail(this.op + this.$store.state.currentLevel.index)
          }
          this.$store.commit('SETERRORSTATE')
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
