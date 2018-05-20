<template>
  <div class="hello">
    <h1>{{ msg }} <span>,你好像迷路了！<a style="color: blue;cursor: pointer" @click="$router.go(-1)">原路返回</a></span></h1>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>图标test</h1>
    <i class="sprites sprites-arrow-red"></i>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        msg: 'Welcome to sales App',
      }
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
@import "../styles/sprites.css";
</style>
