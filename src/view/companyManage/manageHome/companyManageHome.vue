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
        <el-col :span="18">
          <div class="col-box">
            <p class="title com-title-no">
              <el-radio v-model="chartRadio" :label="1">新增订单数</el-radio>
              <el-radio v-model="chartRadio" :label="2">销售额</el-radio>
            </p>
            <div id="orderNumChart" style="width: 100%;height: 310px;margin-top: 10px;"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-box col-box-report">
            <div class="report-bar">
              <el-button>周报</el-button>
              <el-button>月报</el-button>
              <el-button>年报</el-button>
            </div>
            <ul class="report-ul">
              <li>
                <p class="data">3025 <span class="money">销售额：￥20000</span></p>
                <p class="detail"><span class="tip">本年累计新增订单</span><span class="percent percent-plus"><i class="el-icon-back" style="transform: rotate(90deg)"></i>27%</span>
                </p>
              </li>
              <li>
                <p class="data">3025 <span class="money">销售额：￥20000</span></p>
                <p class="detail"><span class="tip">本月累计新增订单</span><span class="percent percent-minus"><i class="el-icon-back" style="transform: rotate(-90deg)"></i>27%</span>
                </p>
              </li>
              <li>
                <p class="data">3025 <span class="money">销售额：￥20000</span></p>
                <p class="detail"><span class="tip">本日累计新增订单</span><span class="percent percent-flat"><i class="el-icon-minus"></i>持平</span>
                </p>
              </li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // import moment from 'moment'

  export default {
    name: 'saleHome',
    data () {
      return {
        chartRadio: 1,
        option: { // 订单数
          title: {
            // text: '堆叠区域图',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#39C189',
              },
            },
          },
          legend: {
            // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          },
          toolbox: {
            // feature: {
            //   saveAsImage: {},
            // },
          },
          grid: {
            left: '0%',
            right: '3%',
            bottom: '0%',
            top: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: ['01月', '02月', '03月', '04月', '05月', '06月', '07月', '08月', '09月', '10月', '11月', '12月'],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          color: ['#39C189'],
          series: [
            {
              name: '',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: [120, 132, 141, 154, 170, 190, 210, 200, 180, 160, 150, 110],
            },
          ],
        },
        orderNumChart: '',
      }
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('orderNumChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
    },
    created () {
      // console.log(moment(new Date()).format('YYYY-MM-DD hh:mm:ss'))
    },
    mounted () {
      this.drawOrderNumChart()
      this.drawFunnelChart()
      this.drawBarChart()
      this.drawScatterChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../styles/sprites.css";

  .com-title-no {
    &:after {
      display: none;
    }
  }

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
    margin-top: 57px;
    border-left: 1px solid $part-color;
  }

  .report-bar {
    text-align: center;
  }

  .report-ul {
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
  .list {
    li {
      color: #333333;
      padding: 20px;
      border-bottom: 1px dashed #ccc;
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
  .link {
    padding: 20px;
    text-align: center;
    .link-all {
      color: $color-1-active;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
</style>
