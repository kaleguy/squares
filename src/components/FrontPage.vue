<template>
  <div style="margin-top:40px;">
    <div class="squares bsquares"
         @click="login()">
      <div class="title-button"
           style="margin-left:auto;margin-right:auto;cursor:pointer">squares</div>
    </div>
    <div style="width:260px;margin-left:auto;margin-right:auto;margin-top:20px">
    <div class="type-ahead-group">
      <input id="name" type="text" autocomplete="off" placeholder="Enter your name">
    </div>
    </div>
  </div>
</template>

<script>
const TypeAhead = require('type-ahead')
const vm = {
  name: 'frontpage',
  components: {
  },
  data () {
    return {
    }
  },
  methods: {
    login: function () {
      this.$router.replace('/main/')
    }
  },
  computed: {
  },
  mounted () {
    const me = this
    const t = new TypeAhead(
      document.getElementById('name'),
      ['Amy', 'Joe', 'Sky', 'Gaia'],
      {
        minLength: 1,
        onKeyDown: function (value) {
          console.log(value)
          me.$store.commit('SETUSER', {username: value})
          me.$router.replace('/main/')
        }
      })
    console.log(t)
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
