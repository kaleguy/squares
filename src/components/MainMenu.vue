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
    goto: function (level) {
      console.log(level.operator)
      this.$router.replace('/menu/' + level.operator)
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
    console.log('MAIN')
  },
  updated () {
  }
}

export default vm

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
</style>
