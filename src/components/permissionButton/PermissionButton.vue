<!--权限按钮
2018.4.21 姚政伟 构建
-->
<template>
  <el-button :size="size" :type="type" v-show="!isDisabled">
    <slot></slot>
  </el-button>
</template>

<script>
  import utils from '@/common/utils'

  export default {
    name: 'permissionButton',
    data () {
      return {
        isDisabled: true,
      }
    },
    props: {
      size: {
        type: String,
        required: false,
        default: '',
      },
      type: {
        type: String,
        required: false,
        default: '',
      },
      authCode: {
        type: String,
        required: true,
        default: '',
      },
    },
    created () {
      var that = this
      that.userInfo = utils.loginExamine(that)
      var rightList = that.userInfo.rightList
      if (rightList && rightList.length > 0) {
        var fIndex = rightList.indexOf(that.authCode)
        if (fIndex > -1) {
          that.isDisabled = false
        }
      }
    },
  }
</script>
