<template>
 <div class="test-button">
   <div class="square-row">
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
   </div>
   <div class="square-row">
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
     <div></div>
   </div>
   <div>
     <div class="bar">
       <div class="bar2"
     </div>
   </div>
 </div>
</template>

<script>
const vm = {
  name: 'testbutton',
  props: {
    width: String
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
.test-button
  border: 1px solid #ccc
  width: 160px
  height: 60px
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.17)
.square-row
  border: 0px solid blue
  height: 20px
  DIV
    width: 9px
    height: 9px
    border: 1px solid blue
    display: inline-block
</style>
