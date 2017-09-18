<template>
    <div style="display:flex;height:100%;">
      <div style="align-items:center;margin:auto">

    <div class="squares bsquares" style="display: flex; flex-direction: row; height: 100%">
      <div class="title-button">squares</div>
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
    </div>
    <div
      @click="menu"
      class="uname">{{username}}</div>
    <div v-if="!username">
      <div
        @click="menu"
        style="margin-top:20px;cursor:pointer;width:200px;height:200px;border:none;box-shadow:none;margin-left:auto;margin-right:auto;">
        <leftarrow style="margin-left:60px" width="200"></leftarrow>
      </div>
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
