<template>
  <div class="page-header" v-bind:class="{'font-end-bg': themeIndex === 0, 'manage-bg': themeIndex === 1}">
    <div class="left">众智联邦销售管理系统</div>
    <div class="right">
      <ul>
        <li class="item cursor" @click="logout">
          <i class="iconfont icon-zhuxiao"></i>
          <a>注销</a>
        </li>
        <li class="item cursor" @click="messageHandle" v-if="themeIndex === 0">
          <el-badge :is-dot="false" class="badge">
            <i class="iconfont icon-iconfontunie62c"></i>
          </el-badge>
          消息通知<span></span>
        </li>
        <li class="item cursor" @click="taskHandle" v-if="themeIndex === 0 && listPermissions(menus, 'approval')" >
          <el-badge is-dot class="badge">
            <i class="iconfont icon-tixing"></i>
          </el-badge>
          提醒事项<span>(2)</span>
        </li>
        <li class="item item-hello">您好，{{userInfo.name}}!</li>
      </ul>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import utils from '../utils/utils'
  import API from '../utils/api'
  // import webStorage from 'webStorage'

  export default {
    name: 'pageHeader',
    data () {
      return {
        userInfo: '',
        menus: '',
      }
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
    },
    created () {
      this.userInfo = utils.loginExamine(this)
      this.menus = this.userInfo.menus
    },
    methods: {
      logout () {
        API.login.logout({}, (res) => {
          this.loading = false
          if (res.status) {
            this.$router.push({'path': '/'})
          }
        }, (mock) => {
          this.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },
      messageHandle () {
        this.$router.push({name: 'messageList', params: {end: 'FE'}})
      },
      taskHandle () {
        this.$router.push({name: 'taskApprovalList', params: {end: 'FE'}})
      },
      listPermissions (m, id) { // menus权限判断，return true和false
        let mus = m || []
        return mus.some(item => {
          return item.id === id || this.listPermissions(item.children, id)
        })
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../static/iconFont/iconfont.css";
  @import "../styles/var";

  .page-header {
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &.font-end-bg {
      background-color: #4bcf99;
      .left {
        color: #e4e7ed;
      }
      .right {
        color: #e4e7ed;
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
