<template>
  <div class="left-menu-bar">
    <div class="u-show">
      <div class="u-head">
        <img src="../assets/icon/headDefault.png" alt="">
      </div>
      <div class="u-text">
        <h4 class="username">用户名</h4>
        <div class="tags">
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
      text-color="#9BA1A7"
      background-color="#3A4651"
      active-text-color="#39C189">
      <el-menu-item index="saleHome">
        <i class="el-icon-location"></i>
        <span slot="title">管理中心</span>
      </el-menu-item>
      <el-menu-item index="customersList">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">客户</span>
          <div class="child-menu">
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li @click="handleRouter('detail')">客户相关信息</li>
                <li @click="handleRouter('related')">客户资料信息</li>
              </ul>
            </div>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="contactsList">
        <template slot="title">
          <i class="el-icon-document"></i>
          <span slot="title">联系人</span>
          <div class="child-menu">
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li>联系人相关信息</li>
                <li>联系人资料信息</li>
              </ul>
            </div>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="salesOpportunitiesList">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">销售机会</span>
          <div class="child-menu">
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li>销售机会相关信息</li>
                <li>销售机会资料信息</li>
              </ul>
            </div>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="salesOrdersList">
        <template slot="title">
          <i class="el-icon-setting"></i>
          <span slot="title">销售订单</span>
          <div class="child-menu">
            <i class="el-icon-arrow-right"></i>
            <div class="child-fixed">
              <ul class="child-menu-box">
                <li>销售订单相关信息</li>
                <li>销售订单资料信息</li>
              </ul>
            </div>
          </div>
        </template>
      </el-menu-item>
      <el-menu-item index="documentaryRecordsList">
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
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: 'leftMenuBar',
    data () {
      return {}
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleRouter (name, view) {
        this.$nextTick(() => {
          // this.$router.push({name: name, query: {view: view}})
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .left-menu-bar {
  }
  .u-show {
    height: 160px;
    border-bottom: 2px solid #3A4651;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3A4651;
    .u-head {
      display: inline-block;
    }
    .u-text {
      display: inline-block;
      margin-left: 20px;
      .username {
        font-size: 16px;
        font-weight: normal;
        color: #FEFEFE
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
      position: fixed;
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
