<template>
  <div class="hello">
    <h1><span>你好像迷路了！<a style="color: blue;cursor: pointer" @click="$router.go(-1)">原路返回</a></span></h1>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        fileList: [],
      }
    },
    methods: {
      submitUpload () {
        this.$refs.upload.submit()
      },
      handleRemove (file, fileList) {
        console.log(file, fileList)
      },
      handlePreview (file) {
        console.log(file)
      },
    },
    mounted () {},
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/sprites.css";
  @import '../element_ui/element-variables';
  @import '../element_ui/element';
</style>
