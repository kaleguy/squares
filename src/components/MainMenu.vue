<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
      <div class="squares bsquares" style="display: flex; flex-direction: row; height: 100%">
        <div
          @click="menu"
          class="title-button">{{username}}</div>
        <div class="title-button"
             @click="goto('s')"
             style="background:#fff;cursor:pointer;color:#000;font-size:44px;line-height:0.7;font-family:inherit">
          &#x25a0;&#x25a0;&#x25a0;<br />
          &#x25a0;&#x25a0;&#x25a0;<br />
          &#x25a0;&#x25a0;&#x25a0;
        </div>
      </div>
      <div class="squares csquares">
        <div @click="goto('+')">&#x002b;</div>
        <div @click="goto('-')">&minus;</div>
        <div @click="goto('X')">&#x00d7;</div>
        <div @click="goto('d')">&#x00f7;</div>
        <div @click="goto('stars')" class="icon icon-star" style="line-height:79px">{{levelCount}}</div>
        <div @click="goto('points')" class="icon icon-point" style="line-height:79px">{{points}}</div>
      </div>
    </div>
  </div>
</template>


<script>
import LeftArrow from './LeftArrow'
import _ from 'lodash'
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
    }
  },
  computed: {
    levels () {
      return this.$store.state.levels
    },
    username () {
      return this.$store.state.username
    },
    levelCount () {
      return Object.keys(this.record).length || ' '
    },
    points () {
      const points = _.reduce(this.record, (points, level) => {
        let min = Object.values(level).sort((prev, next) => prev - next)[0]
        return points + 140 - min
      }, 0)
      return points
    },
    record () {
      const recordKey = this.username + '_levels'
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
<style lang="sass">
.bsquares, .csquares
  DIV
    font-weight: bold
//  transform: rotate(90deg)
//  transform-origin: left top 0
//  font-weight: bold
</style>
