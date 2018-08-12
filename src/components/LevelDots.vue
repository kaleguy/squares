<template>
  <div class="level-dots">
    <span>&#9632;&#9632;&#9632;</span>
    <span>&#9632;&#9632;&#9632;</span>
    <span>&#9632;&#9632;&#9632;</span>
  </div>
</template>

<script>
const vm = {
  name: 'leveldots',
  data () {
    return {
    }
  },
  props: {
    level: String
  },
  components: {
  },
  methods: {
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
<style lang="sass">
DIV.level-dots
  border: none
  height: 0
  padding-top: 0
  font-size: 10px
.level-dots SPAN
  font-size: 22px
  border: none
  display: block
  line-height: .6
</style>
