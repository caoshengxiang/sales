<template>
  <div class="left-menu-bar">
    <div class="u-show"
         :style="{
            backgroundColor: theme[themeIndex].leftMenuBarBg,
            borderColor: theme[themeIndex].leftMenuBarBorderButtonColor
     }">
      <div class="u-head" @click="routePersonal">
        <img src="../assets/icon/headDefault.png" alt="">
      </div>
      <div class="u-text">
        <h4 class="username" :style="{color: theme[themeIndex].leftMenuBarUserTextColor}">用户名</h4>
        <div class="tags" v-if="themeIndex === 1">
          <span class="tag">管理员</span>
        </div>
      </div>
    </div>

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      :router="true"
      :text-color="theme[themeIndex].leftMenuBarColor"
      :background-color="theme[themeIndex].leftMenuBarBg"
      :active-text-color="theme[themeIndex].leftMenuBarActiveColor">
      <el-menu-item index="saleHome">
        <i class="el-icon-location"></i>
        <span slot="title">管理中心</span>
      </el-menu-item>
      <el-menu-item index="customersList">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">客户</span>
          <!--<div class="child-menu">
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li @click="handleRouter('detail')">客户相关信息</li>
                <li @click="handleRouter('related')">客户资料信息</li>
              </ul>
            </div>
          </div>-->
        </template>
      </el-menu-item>
      <el-menu-item index="contactsList">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">联系人</span>
          <!--<div class="child-menu">-->
          <!--<i class="el-icon-arrow-right"></i>-->
          <!--<div class="child-fixed">-->
          <!--<ul class="child-menu-box">-->
          <!--<li>联系人相关信息</li>-->
          <!--<li>联系人资料信息</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </template>
      </el-menu-item>
      <el-menu-item index="salesOpportunitiesList">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">销售机会</span>
          <!--<div class="child-menu">-->
          <!--<i class="el-icon-arrow-right"></i>-->
          <!--<div class="child-fixed">-->
          <!--<ul class="child-menu-box">-->
          <!--<li>销售机会相关信息</li>-->
          <!--<li>销售机会资料信息</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </template>
      </el-menu-item>
      <el-menu-item index="salesOrdersList">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">销售订单</span>
          <!--<div class="child-menu">-->
          <!--<i class="el-icon-arrow-right"></i>-->
          <!--<div class="child-fixed">-->
          <!--<ul class="child-menu-box">-->
          <!--<li>销售订单相关信息</li>-->
          <!--<li>销售订单资料信息</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</div>-->
        </template>
      </el-menu-item>
      <el-menu-item index="orderRecordsList">
        <i class="el-icon-setting"></i>
        <span slot="title">跟单记录</span>
      </el-menu-item>
      <el-menu-item index="remittanceRecords">
        <i class="el-icon-location"></i>
        <span slot="title">回款记录</span>
      </el-menu-item>
      <el-menu-item index="rebateRecordsList">
        <i class="el-icon-location"></i>
        <span slot="title">返佣记录</span>
      </el-menu-item>
      <el-menu-item index="customersHighSeasList">
        <i class="el-icon-location"></i>
        <span slot="title">客户公海</span>
      </el-menu-item>
      <el-menu-item index="taskApprovalList">
        <i class="el-icon-location"></i>
        <span slot="title">任务审批</span>
      </el-menu-item>
      <el-menu-item index="userList">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">用戶管理</span>
          <div class="child-menu"><!--todo 有兼容问题-->
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li @click="handleRouter('userList')">用戶管理</li>
                <li @click="handleRouter('roleList')">角色管理</li>
                <li @click="handleRouter('agentList')">代理商管理</li>
              </ul>
            </div>
          </div>
        </template>
      </el-menu-item>
      <el-submenu index="user">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>用戶管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="userList">用戶管理</el-menu-item>
          <el-menu-item index="roleList">角色管理</el-menu-item>
          <el-menu-item index="agentList">代理商管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'leftMenuBar',
    data() {
      return {}
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      handleRouter(name, view) {
        this.$nextTick(() => {
          this.$router.push({name: name, query: {view: view}, params: {end: 'ME'}})
        })
      },
      routePersonal() {
        this.$router.push({name: 'personal', query: {view: 'base'}, params: {end: 'FE'}})
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .left-menu-bar {
  }

  .u-show {
    height: 160px;
    border-bottom: 2px solid;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    /*background-color: #3A4651;*/
    .u-head {
      display: inline-block;
      cursor: pointer;
    }
    .u-text {
      display: inline-block;
      margin-left: 20px;
      .username {
        font-size: 16px;
        font-weight: normal;
        /*color: #FEFEFE*/
      }
      .tags {
        margin-top: 5px;
      }
      .tag {
        padding: 3px 10px;
        background: rgba(255, 119, 0, 1);
        border-radius: 11px;
        font-size: 12px;
        color: #fff;
      }
    }
  }

  .child-menu {
    float: right;
    display: inline-block;
    line-height: 56px;
    width: 30px;
    position: relative;
    .child-fixed {
      z-index: 199;
      position: absolute;
      height: 0;
    }
    .child-menu-box {
      display: none;
      position: relative;
      top: -55px;
      left: 30px;
      li {
        background-color: #e4e4e4;
        width: 120px;
        padding-left: 20px;
        line-height: 30px;
        color: #2d2d2d;
        &:hover {
          background-color: #f4f6f8;
          color: #333e48;
        }
      }
    }
    &:hover {
      .child-menu-box {
        display: block;
      }
    }
  }

  .el-menu-item {
    padding: 0;
  }
</style>
