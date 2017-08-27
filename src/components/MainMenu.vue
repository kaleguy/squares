<template>
  <div>
  <div class="squares bsquares" style="display: flex; flex-direction: row; height: 100%">
    <div class="title-button">squares</div>
  </div>
  <div class="squares csquares">
    <!--
    <div v-for="level in levels" @click="goto(level)">
      {{level.operator}}
    </div>
    -->
    <div @click="goto('+')">+</div>
    <div @click="goto('+')">--</div>
    <div @click="goto('X')">X</div>
    <div @click="goto('/')">/</div>
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
.bsquares
  font-size: 32px
  width: 180px
.csquares
  font-size: 32px
  width: 360px
.bsquares DIV
  width: 140px
  height: 120px
.csquares DIV
  width: 140px
  height: 100px
  line-height: .7

</style>
