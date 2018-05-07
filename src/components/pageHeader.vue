<template>
  <div class="page-header" v-bind:class="{'font-end-bg': fontEnd, 'manage-bg': !fontEnd}">
    <div class="left">众智联邦销售管理系统</div>
    <div class="right">
      <ul>
        <li class="item cursor">
          <i class="el-icon-picture"></i>
          <a>注销</a>
        </li>
        <li class="item cursor" @click="messageHandle">
          <el-badge :is-dot="false" class="badge">
            <i class="el-icon-picture"></i>
          </el-badge>
          消息通知<span></span>
        </li>
        <li class="item cursor" @click="taskHandle">
          <el-badge is-dot class="badge">
            <i class="el-icon-picture"></i>
          </el-badge>
          提醒事项<span>(2)</span>
        </li>
        <li class="item item-hello">下午好，张三 !</li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'pageHeader',
    data () {
      return {
        fontEnd: true,
        bgColor: '#D7DDE4'
      }
    },
    methods: {
      messageHandle () {
        this.$router.push({name: 'messageList'})
      },
      taskHandle () {
        this.$router.push({name: 'taskApprovalList'})
      }
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/var";
.page-header {
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &.font-end-bg {
    background-color: $page-header-bg;
    .left {
      color: $font-color-0;
    }
    .right {
      color: $font-color-1;
    }
  }
  &.manage-bg {
    background-color: #0BC3C4;
    color: #fff;
  }
  .left {
    font-size: 18px;
    margin-left: 20px;
    font-weight: 600;
  }
  .right {
    margin-right: 20px;
    .item {
      float: right;
      margin: 0 0 0 20px;
      .badge {
        margin-right: 2px;
      }
      &.item-hello {
        margin-right: 30px;
      }
      &.cursor {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
