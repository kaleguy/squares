<template>
  <div>
    <div class="timebar">
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
.timebar
  width: 14em
  background: green
  height: 1em
  margin-left: auto
  margin-right: auto
  margin-bottom: 10px
</style>
