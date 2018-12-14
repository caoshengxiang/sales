<template>
  <el-button
    :icon="icon"
    :disabled="disabled"
    @click="handleClick"
    :class="themeBtn">
    <slot></slot>
  </el-button>
</template>
<script>
  import { mapState } from 'vuex'

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

    computed: {
      ...mapState('constData', [
        'themeIndex',
      ]),
      themeBtn () {
        let base = {
          'back-high-seas': this.buttonType === 'backHighSeas',
          'search': this.buttonType === 'search',
          'export': this.buttonType === 'export',
          'card-num': this.buttonType === 'cardNum',
          'import': this.buttonType === 'import',
          'upload-img': this.buttonType === 'uploadImg',
        }
        let btnObj
        if (this.themeIndex === 0) {
          btnObj = Object.assign({}, base, {
            'add': this.buttonType === 'add',
            'delete': this.buttonType === 'delete',
            'grey': this.buttonType === 'grey',
            'theme': this.buttonType === 'theme',
            'orange': this.buttonType === 'orange',
          })
        } else if (this.themeIndex === 1) {
          btnObj = Object.assign({}, base, {
            'm-add': this.buttonType === 'add',
            'm-delete': this.buttonType === 'delete',
            'm-grey': this.buttonType === 'grey',
            'm-theme': this.buttonType === 'theme',
            'm-orange': this.buttonType === 'orange',
          })
        }
        return btnObj
      }
    },

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
    /*padding: 9px 0px;*/
    box-sizing: border-box;
  }

  @mixin btn-style($bg-color, $font-color: #fff, $width: 100px) {
    background-color: $bg-color !important;
    width: $width !important;
    color: $font-color !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
    &:hover, &:focus {
      background-color: $bg-color !important;
      color: $font-color !important;
      border-color: $bg-color !important;
    }
  }

  /* 销售前端 s*/
  .add {
    @include btn-style(#00A7FE)
  }

  .grey {
    @include btn-style(#f6f6f6, $font-color-2);
    &:hover, &:focus {
      border-color: #cdcdcd !important;
    }
  }

  .delete {
    @include btn-style(#FE5455)
  }

  .theme {
    @include btn-style(#4BCF99)
  }

  .orange {
    @include btn-style(#FFA94B)
  }

  /* 销售前端 e*/

  /* 扩展的其他按钮 - 销售前端 */

  .back-high-seas {
    @include btn-style(#26C6DA)
  }

  .search {
    @include btn-style(#39C189, #fff, 72px)
  }

  .export {
    @include btn-style(#FF7700)
  }

  .import {
    @include btn-style(#FF7700, #fff, 72px)
  }

  .card-num {
    @include btn-style(#39C189, #39C189, 160px);
    background-color: #fff !important;
    border-color: #39C189 !important;
    &:hover, &:focus {
      background-color: #fff !important;
      border-color: #39C189 !important;
    }
  }

  .upload-img {
    @include btn-style(#39C189, #fff, 100px);
  }

  /* 扩展的其他按钮 - 销售前端 */

  /* 管理端 s*/
  .m-add {
    border-color: #92DAFF !important;
    color: #00A7FE !important;
    width: 100px;
  }

  .m-delete {
    border-color: #FFB5B5 !important;
    color: #FE5455 !important;
    width: 100px;
  }

  .m-grey {
    border-color: #DDDDDD !important;
    color: #728395 !important;
    width: 100px;
  }

  .m-theme {
    border-color: #83DBB7 !important;
    color: #00A7FE !important;
    width: 100px;
  }
  .m-orange {
    border-color: #FFC593 !important;
    color: #FF7700 !important;
    width: 100px;
  }

  /* 管理端 e*/
</style>
