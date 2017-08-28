<template>
  <div style="margin-top:40px;">
  <div class="squares bsquares" style="display: flex; flex-direction: row; height: 100%">
    <div class="title-button">squares</div>
    <div class="title-button" style="background:#fff;color:#000;font-size:44px;line-height:0.7;">

      &#x25a0;&#x25a0;&#x25a0;<br />
      &#x25a0;&#x25a0;&#x25a0;<br />
      &#x25a0;&#x25a0;&#x25a0;

    </div>
  </div>
  <div class="squares csquares">
    <!--
    <div v-for="level in levels" @click="goto(level)">
      {{level.operator}}
    </div>
    -->
    <div @click="goto('+')">&#x002b;</div>
    <div @click="goto('-')">&#8213;</div>
    <div @click="goto('X')">&#x00d7;</div>
    <div @click="goto('/')">&#x00f7;</div>
  </div>
  </div>
</template>


<script>
const vm = {
  name: 'mainmenu',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    goto: function (level) {
      console.log(level.operator)
      this.$router.replace('/menu/' + level)
      // route.navigate(submenu, level.operator)
    }
  },
  computed: {
    levels () {
      console.log(this.$store.state.levels)
      return this.$store.state.levels
    }
  },
  mounted () {
  },
  updated () {
  }
}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.bsquares, .csquares
  font-size: 32px
  width: 310px
.bsquares DIV
  width: 140px
  height: 120px
.csquares DIV
  width: 140px
  height: 100px
  line-height: .7

</style>
