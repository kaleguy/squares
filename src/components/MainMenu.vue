<template>
  <div style="display:flex;height:100%;">
    <div style="align-items:center;margin:auto">
      <div class="squares bsquares" style="display: flex; flex-direction: row; height: 100%">
        <div class="title-button">{{username}}</div>
        <div class="title-button"
             @click="goto('s')"
             style="background:#fff;cursor:pointer;color:#000;font-size:44px;line-height:0.7;">
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
        <div @click="goto('gs')" class="icon icon-star" style="line-height:79px">{{levelCount}}</div>
        <div @click="goto('gp')" class="icon icon-point" style="line-height:79px">9999</div>
      </div>
    </div>
  </div>
</template>


<script>
import LeftArrow from './LeftArrow'
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
      this.$router.replace('/menu/' + op)
    },
    menu: function () {
      this.$router.replace('/')
    }
  },
  computed: {
    levels () {
      console.log(this.$store.state.levels)
      return this.$store.state.levels
    },
    username () {
      return this.$store.state.username
    },
    levelCount () {
      const recordKey = this.username + '_levels'
      let record = JSON.parse(localStorage.getItem(recordKey))
      return Object.keys(record).length || ' '
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
