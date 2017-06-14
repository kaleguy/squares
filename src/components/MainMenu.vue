<template>
  <div class="squares" style="display: flex; flex-direction: row; height: 100%">
    <div class="title-button">squares</div>
    <div v-for="level in levels" @click="goto(level)">
      {{level.operator}}
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
    submit: function () {
      // console.log('foo')
    },
    goto: function (level) {
      console.log(level.operator)
    }
  },
  computed: {
    num1 () {
      return this.$store.state.num1
    },
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
HTML, BODY
  height: 100%
  width: 100%
.squares
  DIV.title-button
    font-size: 1em
    background: #33f
    color: #fff
    cursor: default
  DIV
    cursor: pointer
    font-size: 2em
    width: 100px
    border: 1px solid #ccc
    border-radius: 10px
    height: 80px
    margin: 6px

</style>
