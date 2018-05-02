<template>
  <div>
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
      active-text-color="#0BC3C4">
      <el-menu-item index="saleHome">
        <i class="el-icon-location"></i>
        <span slot="title">概览</span>
      </el-menu-item>
      <el-menu-item index="customersList">
        <i class="el-icon-menu"></i>
        <span slot="title">客户</span>
      </el-menu-item>
      <el-menu-item index="contactsList">
        <i class="el-icon-document"></i>
        <span slot="title">联系人</span>
      </el-menu-item>
      <el-menu-item index="salesOpportunitiesList">
        <i class="el-icon-setting"></i>
        <span slot="title">销售机会</span>
      </el-menu-item>
      <el-menu-item index="salesOrdersList">
        <i class="el-icon-setting"></i>
        <span slot="title">销售订单</span>
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
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  .u-show {
    height: 160px;
    border-bottom: 2px solid #F0F3F6;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .u-head {
      display: inline-block;
    }
    .u-text {
      display: inline-block;
      margin-left: 20px;
      .username {
        font-size:16px;
        color:rgba(51,62,72,1);
      }
      .tags {
        margin-top: 5px;
      }
      .tag {
        padding: 3px 10px;
        background:rgba(255,119,0,1);
        border-radius: 11px;
        font-size: 12px;
        color: #fff;
      }
    }
  }
</style>
