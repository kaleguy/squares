<template>
  <div class="dotbar">
    <div v-for="dot, index in dots"
         v-bind:class="[index < count ? 'ball' : '', 'dot']">
    </div>
  </div>
</template>

<script>
const vm = {
  name: 'dots',
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
      const numDots = 27
      const dotArray = []
      for (let i = 0; i < numDots; i++) {
        dotArray[i] = 0
      }
      return dotArray
    },
    count () {
      return this.$store.state.count
    }
  },
  mounted () {
  },
  updated () {
  }
}

export default vm

</script>

<style lang="sass" scoped>
$size: 1.4em
$color: green
.dot
  width: $size
  height: $size
  border-radius: 4px
  border: 2px solid $color
  display: inline-block
  margin: 3px
  margin-bottom: 0
.dotbar
  width: 300px
  margin-top: 3px
  margin-bottom: 4px
  margin-left: auto
  margin-right: auto
.ball
  background: $color
</style>
