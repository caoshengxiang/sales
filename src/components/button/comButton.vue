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
      'delete': buttonType === 'delete' ? true : false,
      'export': buttonType === 'export' ? true : false,
      'card-num': buttonType === 'cardNum' ? true : false,
      'import': buttonType === 'import' ? true : false,
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
  @mixin btn-style ($bg-color, $font-color: #fff, $width: 100px) {
    background-color: $bg-color;
    width: $width;
    color: $font-color;
    &:hover, &:focus {
      background-color: $bg-color;
      color: $font-color;
      border-color:$bg-color;
    }
  }
  .add {
    @include btn-style(#00A7FE)
  }
  .move{
    @include btn-style(#FFA94B)
  }
  .back-high-seas {
    @include btn-style(#26C6DA)
  }
  .search {
    @include btn-style(#39C189, #fff, 72px)
  }
  .theme {
    @include btn-style(#4BCF99)
  }
  .grey {
    @include btn-style(#f6f6f6, $font-color-2)
  }
  .delete {
    @include btn-style(#FE5455)
  }
  .export {
    @include btn-style(#4BCF99)
  }
  .import {
    @include btn-style(#FF7700, #fff, 72px)
  }
  .card-num {
    @include btn-style(#39C189, #39C189, 160px);
    background-color: #fff;
    border-color: #39C189;
    &:hover, &:focus {
      background-color: #fff;
      border-color: #39C189;
    }
  }
</style>
