<template>
  <div class="com-icon-text-box com-icon-text-h">
    <i style="font-size: 30px;" :class="icon"></i>
    <span class="com-icon-t">{{text}}</span>
  </div>
</template>

<script>
  export default {
    name: 'iconText',
    data () {
      return {}
    },
    props: {
      text: {
        type: String,
        default: ''
      },
      icon: {
        type: String,
        default: '',
      },
      status: {
        type: String,
        default: '1', // 1 完成， 2 我未完成 ， 3 其他人未完成 todo 三种图片加后缀
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../styles/common";
</style>
