<template>
  <div>
    <div class="math">
      <div>{{num1}}</div>
      <div>+ {{num2}}</div>
      <div class="total">{{total}}</div>
    </div>
    <numpad></numpad>
  </div>
</template>


<script>
const keyBus = {
  key: ''
}
document.onkeypress = function (e) {
  console.log('xx', e.key)
  keyBus.key = e.key
}
import NumPad from './NumPad'
const vm = {
  name: 'hello',
  components: {
    numpad: NumPad
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
    num1 () {
      return this.$store.state.num1
    },
    num2 () {
      return this.$store.state.num2
    },
    total () {
      return this.$store.state.total
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
.math
  font-size: 10em
  font-family: verdana
  font-weight: bold
  color: #0b97c4
  border: 2px solid #0b97c4
  width: 400px;
  margin-left: auto
  margin-right: auto
  border-radius: 20px
  margin-bottom: 8px
  padding: 0px
  //line-height: 73px
  padding-right: 30px
  height: 620px
  DIV
    text-align: right
    //border: 1px solid red
    margin-left: 30px
.total
  border-top: 18px solid green
  //width: 160px
  //float: right
  padding-top: 5px
  margin-top: 12px
</style>
