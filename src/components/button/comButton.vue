<template>
  <el-button
    :icon="icon"
    :disabled="disabled"
    @click="handleClick"
    :class="{
      'add': buttonType === 'add' ? true : false,
      'move': buttonType === 'move' ? true : false,
      'back-high-seas': buttonType === 'backHighSeas' ? true : false,
      'search': buttonType === 'search' ? true : false
    }">
    <slot></slot>
  </el-button>
</template>
<script>
  export default {
    name: 'comButton',
    props: {
      buttonType: { // add 添加,move 转移,backHighSeas 退回公海,search 搜索
        default: '',
        type: String,
      },
      icon: {
        type: String,
        default: '',
      },
      disabled: Boolean,
    },

    computed: {},

    methods: {
      handleClick (evt) {
        this.$emit('click', evt)
      },
    },
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .el-button--small {
    padding: 9px 0px;
  }
  .add {
    background-color: #00A7FE;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #00A7FE;
      color: #fff;
    }
  }
  .move{
    background-color: #FFA94B;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #FFA94B;
      color: #fff;
    }
  }
  .back-high-seas {
    background-color: #26C6DA;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #26C6DA;
      color: #fff;
    }
  }
  .search {
    background-color: #39C189;
    width: 72px;
    color: #fff;
    &:hover, &:focus {
      background-color: #39C189;
      color: #fff;
    }
  }
</style>
