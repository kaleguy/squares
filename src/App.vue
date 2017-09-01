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
  width: 342px
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
    box-shadow: 2px 2px 5px #888888;
    cursor: pointer
    font-size: 3.5em
    font-weight: normal
    padding-top: 26px
    line-height: 1em
    width: 100px
    border: 1px solid #ccc
    border-radius: 10px
    height: 80px
    margin: 6px
  DIV.review-button
    width: 330px
DIV.arrow
  margin-top: 0
  font-size: 80px
  color: #00f
  cursor: pointer
  border: none
  margin-left: auto
  margin-right: auto
  box-shadow: none
  font-weight: normal
.fa-icon
  width: auto
  height: 1em /* or any other relative font sizes */
.fa
  font-size: 70px

</style>
