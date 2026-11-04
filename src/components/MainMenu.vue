<template>
  <div class="page menu-page">
    <div>
      <div class="squares bsquares main-board">
        <div
          @click="menu"
          class="title-button">{{username}}</div>
        <div class="count-tile"
             @click="goto('s')"
             aria-label="Counting">
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="squares csquares main-board">
        <div class="op-tile" @click="goto('+')"><span>&#x002b;</span></div>
        <div class="op-tile" @click="goto('-')"><span>&minus;</span></div>
        <div class="op-tile" @click="goto('X')"><span>&#x00d7;</span></div>
        <div class="op-tile" @click="goto('d')"><span>&#x00f7;</span></div>
        <div @click="goto('stars')" class="op-counts" :aria-label="opCountLabel">
          <span v-for="op in opCounts" :key="op.id">{{op.count}}</span>
        </div>
        <div @click="goto('points')" class="icon icon-point">{{points}}</div>
      </div>
      <button type="button" class="help-icon" @click="help" aria-label="Help">?</button>
    </div>
  </div>
</template>


<script>
import LeftArrow from './LeftArrow'
import _ from 'lodash'
import { titleCase, levelsKey } from '../lib/name'
const vm = {
  name: 'mainmenu',
  components: {
    leftarrow: LeftArrow
  },
  data () {
    return {
    }
  },
  methods: {
    goto: function (op) {
      if (op === 'stars' || op === 'points') {
        return this.$router.replace('/chart/' + op)
      }
      this.$router.replace('/menu/' + op)
    },
    menu: function () {
      this.$router.replace('/')
    },
    help: function () {
      this.$router.push('/help')
    }
  },
  computed: {
    levels () {
      return this.$store.state.levels
    },
    username () {
      return titleCase(this.$store.state.username)
    },
    opCounts () {
      const keys = Object.keys(this.record)
      return [
        { id: '+', name: 'Plus' },
        { id: '-', name: 'Minus' },
        { id: 'X', name: 'Times' },
        { id: 'd', name: 'Divide' }
      ].map(op => ({
        id: op.id,
        name: op.name,
        count: keys.filter(key => key.charAt(0) === op.id).length
      }))
    },
    opCountLabel () {
      return this.opCounts.map(op => op.name + ' ' + op.count).join(', ')
    },
    points () {
      const points = _.reduce(this.record, (points, level) => {
        let min = Object.values(level).sort((prev, next) => prev - next)[0]
        return points + 140 - min
      }, 0)
      return points
    },
    record () {
      const recordKey = levelsKey(this.$store.state.username)
      return JSON.parse(localStorage.getItem(recordKey)) || {}
    }
  },
  mounted () {
    if (!this.username) {
      this.$router.replace('/')
    }
    window.scrollTo(0, 0)
  },
  updated () {
  }
}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass" scoped>
.bsquares
  display: flex
  flex-direction: row
  height: 100%
</style>
