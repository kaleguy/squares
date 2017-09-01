<template>
  <div style="margin-top:40px;">
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
    <!--
    <div v-for="level in levels" @click="goto(level)">
      {{level.operator}}
    </div>
    -->
    <div @click="goto('+')">&#x002b;</div>
    <div @click="goto('-')">&minus;</div>
    <div @click="goto('X')">&#x00d7;</div>
    <div @click="goto('d')">&#x00f7;</div>
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
    goto: function (op) {
      this.$router.replace('/menu/' + op)
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
  DIV
    font-weight: bold
.bsquares DIV
  width: 140px
  height: 120px
.csquares DIV
  width: 140px
  height: 100px
  line-height: .7

</style>
