<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="sass">

HTML, BODY
  margin: 0
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  height: 100%
  height: 100%
  width: 100%
.squares
  width: 400px
  margin-left: auto
  margin-right: auto
  display: flex
  flex-wrap: wrap
  flex-direction: row
  DIV.title-button
    font-size: 1em
    line-height: 3em
    background: #33f
    color: #fff
    cursor: default
  DIV
    cursor: pointer
    font-size: 3em
    font-weight: bold
    padding-top: 26px
    line-height: 1em
    width: 100px
    border: 1px solid #ccc
    border-radius: 10px
    height: 80px
    margin: 6px
</style>
