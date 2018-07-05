<template>
  <div class="sale-home">
    <div class="welcome">欢迎进入销售管理系统 — 系统设置！</div>
    <div class="latest-announcement">
      <!--<p class="com-title"></p>-->
      <p></p>
    </div>
    <div class="home-row">
      <el-row>
        <el-col :span="8" class="top-part">
          <div class="col-box">
            <div class="title">
              <span class="text">客户总量</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.customerCount}}</span>
              <span class="change">
                本月新增：
                <span class="change-up" v-if="dashboard.customerChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.customerChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.customerChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.customerChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part top-part">
          <div class="col-box">
            <div class="title">
              <span class="text">意向客户</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.intentCustomerCount}}</span>
              <span class="change">
                本月下降：
                 <span class="change-up" v-if="dashboard.intentCustomerChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.intentCustomerChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.intentCustomerChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.intentCustomerChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="top-part">
          <div class="col-box">
            <div class="title">
              <span class="text">联系人总量</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.contacterCount}}</span>
              <span class="change">
                本月新增：
                 <span class="change-up" v-if="dashboard.contacterChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.contacterChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.contacterChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.contacterChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <div class="title">
              <span class="text">销售机会总量</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.chanceCount}}</span>
              <span class="change">
                本月新增：
                 <span class="change-up" v-if="dashboard.chanceChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.chanceChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.chanceChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.chanceChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <div class="title">
              <span class="text">销售订单</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.orderCount}}</span>
              <span class="change">
                本月新增：
                 <span class="change-up" v-if="dashboard.orderChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.orderChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.orderChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.orderChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <div class="title">
              <span class="text">跟单记录</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">{{dashboard.followRecordCount}}</span>
              <span class="change">
                本月新增：
                 <span class="change-up" v-if="dashboard.followRecordChangeRate>=0"><i class="iconfont icon-top"></i> {{dashboard.followRecordChangeRate}}%</span>
                <span class="change-down" v-if="dashboard.followRecordChangeRate<0"><i class="iconfont icon-xia"></i> {{dashboard.followRecordChangeRate}}%</span>
              </span>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
        <div class="col-box">
          <order-chart></order-chart>
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
  // import moment from 'moment'
  import orderChart from './orderChart'
  import API from '../../../utils/api'

  export default {
    name: 'saleHome',
    data () {
      return {
        dashboard: {},
      }
    },
    components: {
      orderChart,
    },
    methods: {
      getDashboard () {
        API.home.dashboard({}, da => {
          this.dashboard = da.data
        })
      },
    },
    created () {
      this.getDashboard()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";
  @import "../../../../static/iconFont/iconfont.css";
  .sale-home {
  }

  .welcome {
    font-size: 22px;
    color: $color-1-active;
    margin-left: $page-base-padding;
    margin-top: $page-base-padding;
  }

  .latest-announcement {
    border-bottom: 6px solid $part-color;
    padding: $page-base-padding;
  }

  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      /*border-bottom: 6px solid $part-color;*/
    }
    .lr-part {
      border-left: 6px solid $part-color;
      border-right: 6px solid $part-color;
    }
    .top-part {
      border-bottom: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      /*height: 372px;*/
      .title {
        padding-bottom: 10px;
        border-bottom: 1px solid $part-color;
        .text {
          color: #333E48;
          font-size: 16px;
        }
        .tag {
          color: #FF7700;
          border: 1px solid #FF7700;
          padding: 0px 3px;
          float: right;
        }
      }
      .show {
        height: 50px;
        padding-top: 10px;
        .num {
          font-size: 48px;
          color: #00A7FE;
        }
        .change {
          color: #728395;
          float: right;
          margin-top: 30px;
          .change-up {
            color: #39C189;
            font-weight: bold;
          }
          .change-down {
            color: #FE5455;
            font-weight: bold;
          }
        }
      }
    }
  }

  .col-box-report {
    /*padding-top: 100px;*/
    border-left: 1px solid $part-color;
  }

  .report-bar {
    text-align: center;
    float: right;
  }

  .report-ul {
    padding-top: 30px;
    padding-bottom: 30px;
    li {
      margin-top: 20px;
    }
    .data {
      font-size: 24px;
      color: #1E88E5;
      .money {
        font-size: 14px;
        color: #9CA2A8;
      }
    }
    .detail {
      .tip {
        color: #999999;
      }
      .percent {
        float: right;
        font-size: 16px;
      }
      .percent-plus {
        color: #1FC459;
      }
      .percent-minus {
        color: #FE5455;
      }
      .percent-plat {
        color: #666666;
      }
    }
  }
</style>
