<template>
  <div class="dotbar">
    <div v-for="dot, index in dots"
         v-bind:class="[index < count ? 'ball' : '', 'dot']">
    </div>
  </div>
</template>


<script>
const vm = {
  name: 'timebar',
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

    warn: function (message, event) {
      // now we have access to the native event
      if (event) event.preventDefault()
      alert(message)
    }
  },
  computed: {
    dots () {
      return [0, 0, 0, 0, 0, 0, 0, 0, 0]
    },
    count () {
      return this.$store.state.count
    }
  },
  mounted () {
    console.log('MOUNTED')
    this.$store.commit('RESET')
  },
  updated () {
  }

}

export default vm

</script>

<style lang="sass">
$size: 1em
$color: green
.dot
  width: $size
  height: $size
  border-radius: 4px
  border: 2px solid $color
  display: inline-block
  margin: 3px
.dotbar
  margin: 10px
.ball
  background: $color
</style>
