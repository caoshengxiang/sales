<template>
  <div class="page-header" v-bind:class="{'font-end-bg': themeIndex === 0, 'manage-bg': themeIndex === 1}">
    <div class="left">众智联邦销售管理系统</div>
    <div class="right">
      <ul>
        <li class="item cursor">
          <i class="el-icon-picture"></i>
          <a>注销</a>
        </li>
        <li class="item cursor" @click="messageHandle" v-if="themeIndex === 0">
          <el-badge :is-dot="false" class="badge">
            <i class="el-icon-picture"></i>
          </el-badge>
          消息通知<span></span>
        </li>
        <li class="item cursor" @click="taskHandle" v-if="themeIndex === 0">
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
  import { mapState } from 'vuex'

  export default {
    name: 'pageHeader',
    data () {
      return {
      }
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
    },
    methods: {
      messageHandle () {
        this.$router.push({name: 'messageList', params: {end: 'FE'}})
      },
      taskHandle () {
        this.$router.push({name: 'taskApprovalList', params: {end: 'FE'}})
      },
    },
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
