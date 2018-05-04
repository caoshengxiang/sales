<template>
  <el-button
    :icon="icon"
    :disabled="disabled"
    @click="handleClick"
    :class="{
      'add': buttonType === 'add' ? true : false,
      'move': buttonType === 'move' ? true : false,
      'back-high-seas': buttonType === 'backHighSeas' ? true : false,
      'search': buttonType === 'search' ? true : false,
      'theme': buttonType === 'theme' ? true : false,
      'grey': buttonType === 'grey' ? true : false,
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
  @import "../../styles/var";
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
      border-color:#00A7FE;
    }
  }
  .move{
    background-color: #FFA94B;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #FFA94B;
      color: #fff;
      border-color: #FFA94B;
    }
  }
  .back-high-seas {
    background-color: #26C6DA;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #26C6DA;
      color: #fff;
      border-color: #26C6DA;
    }
  }
  .search {
    background-color: #39C189;
    width: 72px;
    color: #fff;
    &:hover, &:focus {
      background-color: #39C189;
      color: #fff;
      border-color: #39C189;
    }
  }
  .theme {
    background-color: #4BCF99;
    width: 100px;
    color: #fff;
    &:hover, &:focus {
      background-color: #4BCF99;
      color: #fff;
      border-color: #4BCF99;
    }
  }
  .grey {
    background-color: #f6f6f6;
    width: 100px;
    color: $font-color-2;
    border: 1px solid #DDDDDD;
    &:hover, &:focus {
      background-color: #f6f6f6;
      color: $font-color-2;
      border-color: #DDDDDD;
    }
  }
</style>
