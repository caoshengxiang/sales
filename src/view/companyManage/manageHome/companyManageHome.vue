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
              <span class="num">300</span>
              <span class="change">
                本月新增：<span class="change-up"><i class="el-icon-back" style="transform: rotate(90deg)"></i> 15</span>
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
              <span class="num">300</span>
              <span class="change">
                本月下降：<span class="change-down"><i class="el-icon-back" style="transform: rotate(-90deg)"></i> 15</span>
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
              <span class="num">300</span>
              <span class="change">
                本月新增：<span class="change-up"><i class="el-icon-back" style="transform: rotate(90deg)"></i> 15</span>
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
              <span class="num">300</span>
              <span class="change">
                本月新增：<span class="change-up"><i class="el-icon-back" style="transform: rotate(90deg)"></i> 15</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <div class="title">
              <span class="text">意向客户量</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">300</span>
              <span class="change">
                本月新增：<span class="change-up"><i class="el-icon-back" style="transform: rotate(90deg)"></i> 15</span>
              </span>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <div class="title">
              <span class="text">销售订单</span>
              <span class="tag">当前</span>
            </div>
            <div class="show">
              <span class="num">300</span>
              <span class="change">
                本月新增：<span class="change-up"><i class="el-icon-back" style="transform: rotate(90deg)"></i> 15</span>
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

  export default {
    name: 'saleHome',
    data () {
      return {
      }
    },
    components: {
      orderChart,
    },
    created () {
      // console.log(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'))
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";
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
          }
          .change-down {
            color: #FE5455;
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
