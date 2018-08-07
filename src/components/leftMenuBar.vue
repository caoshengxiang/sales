<template>
  <div class="left-menu-bar">
    <div class="u-show"
         @click="routePersonal"
         :style="{
            backgroundColor: theme[themeIndex].leftMenuBarBg,
            borderColor: theme[themeIndex].leftMenuBarBorderButtonColor
     }">
      <div class="u-head">
        <img v-if="currentUser.avatar" :src="currentUser.avatar" alt="" style="width: 50px;height: 50px;border-radius: 50px;">
        <img v-else src="../assets/icon/touxiang2.png" alt="">
      </div>
      <div class="u-text">
        <h4 class="username" :style="{color: theme[themeIndex].leftMenuBarUserTextColor}">
          <el-tooltip class="item" effect="dark" :content="currentUser.name" placement="right">
            <span>{{currentUser.name}}</span>
          </el-tooltip>
        </h4>
      </div>
    </div>

    <el-menu
      :default-active="defaultActiveIndex"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened="true"
      :router="true"
      :text-color="theme[themeIndex].leftMenuBarColor"
      :background-color="theme[themeIndex].leftMenuBarBg"
      :active-text-color="theme[themeIndex].leftMenuBarActiveColor">
      <!--<el-menu-item index="saleHome" v-if="listPermissions(menus, 'salerHome')">--><!--去掉两个首页的权限控制-->
      <el-menu-item index="saleHome" v-if="themeIndex === 0">
        <i class="iconfont icon-home"></i>
        <span slot="title">管理中心</span>
      </el-menu-item>
      <el-menu-item index="customersList" v-if="listPermissions(menus, 'customer')">
        <template slot="title">
          <i class="iconfont icon-kehu"></i>
          <span slot="title">客户</span>
        </template>
      </el-menu-item>
      <el-menu-item index="contactsList" v-if="listPermissions(menus, 'contacts')">
        <template slot="title">
          <i class="iconfont icon-qunzu"></i>
          <span slot="title">联系人</span>
        </template>
      </el-menu-item>
      <el-menu-item index="salesOpportunitiesList" v-if="listPermissions(menus, 'salerChance')">
        <template slot="title">
          <i class="iconfont icon-jihui"></i>
          <span slot="title">销售机会</span>
        </template>
      </el-menu-item>
      <el-menu-item index="salesOrdersList" v-if="listPermissions(menus, 'salerOrder')">
        <template slot="title">
          <i class="iconfont icon-myorder"></i>
          <span slot="title">销售订单</span>
        </template>
      </el-menu-item>
      <el-menu-item index="orderRecordsList" v-if="listPermissions(menus, 'followOrder')">
        <i class="iconfont icon-jilu2"></i>
        <span slot="title">跟单记录</span>
      </el-menu-item>
      <el-menu-item index="remittanceRecords" v-if="listPermissions(menus, 'refund')">
        <i class="iconfont icon-shijian-tianchong"></i>
        <span slot="title">回款记录</span>
      </el-menu-item>
      <el-menu-item index="rebateRecordsList" v-if="listPermissions(menus, 'commission')">
        <i class="iconfont icon-ai-wallet"></i>
        <span slot="title">返佣记录</span>
      </el-menu-item>
      <el-menu-item index="customersHighSeasList" v-if="listPermissions(menus, 'customerSea')">
        <i class="iconfont icon-ene_mon_mes_sta"></i>
        <span slot="title">客户公海</span>
      </el-menu-item>
      <el-menu-item index="taskApprovalList" v-if="listPermissions(menus, 'approval')">
        <i class="iconfont icon-shenpi"></i>
        <span slot="title">任务审批</span>
      </el-menu-item>
      <!--后端菜单-->
      <!--后端菜单-->
      <!--<el-menu-item index="companyManageHome" v-if="listPermissions(menus, 'adminHome')">--><!--去掉两个首页的权限控制-->
      <el-menu-item index="companyManageHome" v-if="themeIndex === 1">
        <i class="iconfont icon-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="user" v-if="listPermissions(menus, 'userManagement')">
        <template slot="title">
          <i class="iconfont icon-kehu"></i>
          <span>用戶管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="userList" v-if="listPermissions(menus, 'userManagementSub')">用戶管理</el-menu-item>
          <el-menu-item index="roleList" v-if="listPermissions(menus, 'roleManagement')">角色管理</el-menu-item>
          <el-menu-item index="agentList" v-if="listPermissions(menus, 'agentManagement')">代理商管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="organization" v-if="listPermissions(menus, 'orgManagement')">
        <template slot="title">
          <i class="iconfont icon-qunzu"></i>
          <span>组织管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="organizationList" v-if="listPermissions(menus, 'orgManagementSub')">组织管理</el-menu-item>
          <el-menu-item index="customerPool" v-if="listPermissions(menus, 'customerPool')">客户池管理</el-menu-item>
          <el-menu-item index="organizationProductSetting" v-if="listPermissions(menus, 'orgGoodsConfig')">组织商品配置
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="financial" v-if="listPermissions(menus, 'financialManagement')">
        <template slot="title">
          <i class="iconfont icon-caiwu"></i>
          <span>财务管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="settlementList" v-if="listPermissions(menus, 'commissionClear')">佣金结算管理</el-menu-item>
          <el-menu-item index="spendingList" v-if="listPermissions(menus, 'commissionExpenses')">佣金支出管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="meMessageList" v-if="listPermissions(menus, 'message')">
        <template slot="title">
          <i class="iconfont icon-xiaoxitongzhi"></i>
          <span>消息通知</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="meMessageList" v-if="listPermissions(menus, 'messageHistory')">消息通知</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="customerAreaSetting" v-if="listPermissions(menus, 'configManagement')">
        <template slot="title">
          <i class="iconfont icon-lvzhou_shebeipeizhi"></i>
          <span>配置管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="siteList" v-if="listPermissions(menus, 'siteOnOff')">站点开关</el-menu-item>
          <el-menu-item index="customerAreaSetting">客户地区</el-menu-item>
          <el-menu-item index="customerSource">客户源管理</el-menu-item>
          <el-menu-item index="baseSettingList" v-if="listPermissions(menus, 'paramConfig')">参数配置</el-menu-item>
          <el-menu-item index="settlementRulesList" v-if="listPermissions(menus, 'commissionConfig')">返佣规则
          </el-menu-item>
          <el-menu-item index="productType" v-if="listPermissions(menus, 'orgGoodsConfig')">商品类型设置</el-menu-item>

        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="todo-300" v-if="listPermissions(menus, 'statistics')">
        <template slot="title">
          <i class="iconfont icon-ene_mon_mes_sta"></i>
          <span>统计分析</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="todo-1" v-if="listPermissions(menus, 'statistics')">统计分析</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="log" v-if="listPermissions(menus, 'logManagement')">
        <template slot="title">
          <i class="iconfont icon-rizhi"></i>
          <span>日志管理</span>
        </template>
        <el-menu-item-group>
          <!--<template slot="title">分组一</template>-->
          <el-menu-item index="loglist" v-if="listPermissions(menus, 'logManagement')">日志管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="crm" v-if="listPermissions(menus, 'crmManagement')">
        <template slot="title">
          <i class="iconfont icon-webicon319" style="transform: scale(1.1)"></i>
          <span>CRM管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="customersList" v-if="listPermissions(menus, 'customerManagement')">客户管理</el-menu-item>
          <el-menu-item index="contactsList" v-if="listPermissions(menus, 'contactManagement')">联系人管理</el-menu-item>
          <el-menu-item index="salesOpportunitiesList" v-if="listPermissions(menus, 'salerChanceManagement')">销售机会管理
          </el-menu-item>
          <el-menu-item index="salesOrdersList" v-if="listPermissions(menus, 'salerOrderManagement')">销售订单管理
          </el-menu-item>
          <el-menu-item index="customersHighSeasList" v-if="listPermissions(menus, 'customerSeaManagement')">客户公海管理
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  import utils from '../utils/utils'
  import { serverUrl } from '../utils/const'
  // import webStorage from 'webStorage'

  export default {
    name: 'leftMenuBar',
    data () {
      return {
        userInfo: {},
        menus: [],
        // routeerIndexName: [
        //   'saleHome', 'customersList', 'contactsList', 'salesOpportunitiesList', 'salesOrdersList',
        //   'orderRecordsList', 'remittanceRecords', 'rebateRecordsList', 'customersHighSeasList', 'taskApprovalList',
        //   'companyManageHome',
        //   'userList', 'roleList', 'agentList',
        //   'organizationList', 'customerPool', 'organizationProductSetting',
        //   'settlementList', 'spendingList',
        //   'meMessageList',
        //   'siteList', 'customerAreaSetting', 'baseSettingList', 'settlementRulesList'
        // ],
        defaultActiveIndex: 'saleHome',
      }
    },
    computed: {
      ...mapState('constData', [
        'theme',
        'themeIndex',
      ]),
      ...mapState([
        'currentUser',
        'userHead',
      ]),
      serverUrl () {
        return serverUrl
      },
    },
    created () {
      this.userInfo = utils.loginExamine(this)
      this.menus = this.userInfo.menus
      this.ac_currentUser(this.userInfo)
      // console.log('tetssss', this.listPermissions(this.menus, 'salerHome')) // 测试权限方法
      this.defaultActiveIndex = this.$route.name // 首次进入，或刷新菜单获取active【注意：defaultActiveIndex是path不是name,所以定义路由的时候path名和name名写成一样的】
    },
    methods: {
      ...mapActions([
        'ac_currentUser',
      ]),
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleRouter (name, view) {
        this.$nextTick(() => {
          this.$router.push({name: name, query: {view: view}, params: {end: 'ME'}})
        })
      },
      routePersonal () {
        if (this.themeIndex === 0) {
          this.$router.push({name: 'personal', query: {view: 'base'}, params: {end: 'FE'}})
        } else if (this.themeIndex === 1) {
          this.$router.push({name: 'personal', query: {view: 'base'}, params: {end: 'ME'}})
        }
      },
      listPermissions (m, id) { // menus权限判断，return true和false
        let mus = m || []
        return mus.some(item => {
          return item.id === id || this.listPermissions(item.children, id)
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../static/iconFont/iconfont.css";

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
        span {
          display: inline-block;
          width: 70px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
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

  /*  .child-menu {
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
    }*/

  .el-menu-item {
    padding: 0;
  }

  .iconfont {
    width: 24px;
    display: inline-block;
  }

  .el-submenu .el-menu-item {
    padding-left: 55px !important;
  }
</style>
