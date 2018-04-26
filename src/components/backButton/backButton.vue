<!--返回按钮
2018.4.7 姚政伟 构建
-->
<template>
  <el-button type="info" @click="onCancel()">
    <slot></slot>
  </el-button>
</template>

<script>
  export default {
    name: 'backButton',
    methods: {
      onCancel () {
        var that = this
        var source = that.$route.query.source
        if (source && source !== '') {
          this.$router.push({path: source})
        } else {
          history.back()
        }
      },
    },
  }
</script>
