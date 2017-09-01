<template>
  <div style="margin-top:40px;">
    <div class="squares bsquares"
         @click="login()">
      <div class="title-button"
           style="margin-left:auto;margin-right:auto;cursor:pointer">squares</div>
    </div>
  </div>
</template>


<script>
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
