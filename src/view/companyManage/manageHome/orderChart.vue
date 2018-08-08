<template>
  <div>
    <el-col :span="24">
      <div class="title com-title-no">
        <el-radio-group v-model="chartRadio" @change="getSelectOptions">
          <el-radio :label="1">订单数</el-radio>
          <el-radio :label="2">销售额</el-radio>
        </el-radio-group>
        <div class="report-bar">
          <el-button @click="setType(1)" :class="{active: this.type===1}">周报</el-button>
          <el-button @click="setType(2)" :class="{active: this.type===2}">月报</el-button>
          <el-button @click="setType(4)" :class="{active: this.type===4}">年报</el-button>
        </div>
      </div>
    </el-col>
    <el-col :span="18">
      <div id="orderNumChart" style="width: 100%;height: 310px;margin-top: 10px;"></div>
    </el-col>
    <el-col :span="6">
      <div class="col-box col-box-report">
        <ul class="report-ul" v-if="chartRadio === 1">
          <li>
            <p class="data">{{orderStat.currentYearOrderQuantity}} <span class="money">销售额：￥{{orderStat.currentYearOrderAmount}}</span>
            </p>
            <p class="detail"><span class="tip">本年累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.yearQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.yearQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.yearQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.yearQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.yearQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">{{orderStat.currentMonthOrderQuantity}} <span class="money">销售额：￥{{orderStat.currentMonthOrderAmount}}</span>
            </p>
            <p class="detail"><span class="tip">本月累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.monthQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.monthQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.monthQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.monthQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.monthQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">{{orderStat.currentWeekOrderQuantity}} <span class="money">销售额：￥{{orderStat.currentWeekOrderAmount}}</span>
            </p>
            <p class="detail"><span class="tip">本周累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.weekQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.weekQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.weekQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.weekQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.weekQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
        </ul>
        <ul class="report-ul" v-if="chartRadio === 2">
          <li>
            <p class="data">￥{{orderStat.currentYearOrderAmount}} <span class="money">订单数：{{orderStat.currentYearOrderQuantity}}</span>
            </p>
            <p class="detail"><span class="tip">本年累计新增销售额</span>
              <span class="percent percent-plus" v-if="orderStat.yearAmountChangeRate > 0">
                <i class="iconfont icon-top"></i><span class="num">{{orderStat.yearAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-minus" v-if="orderStat.yearAmountChangeRate < 0">
                <i class="iconfont icon-xia"></i><span class="num">{{orderStat.yearAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-flat" v-if="orderStat.yearAmountChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">￥{{orderStat.currentMonthOrderAmount}} <span class="money">订单数：{{orderStat.currentMonthOrderQuantity}}</span>
            </p>
            <p class="detail"><span class="tip">本月累计新增销售额</span>
              <span class="percent percent-plus" v-if="orderStat.monthAmountChangeRate > 0">
                <i class="iconfont icon-top"></i><span class="num">{{orderStat.monthAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-minus" v-if="orderStat.monthAmountChangeRate < 0">
                <i class="iconfont icon-xia"></i><span class="num">{{orderStat.monthAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-flat" v-if="orderStat.monthAmountChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">￥{{orderStat.currentWeekOrderAmount}} <span class="money">订单数：{{orderStat.currentWeekOrderQuantity}}</span>
            </p>
            <p class="detail"><span class="tip">本周累计新增销售额</span>
              <span class="percent percent-plus" v-if="orderStat.weekAmountChangeRate > 0">
                <i class="iconfont icon-top"></i><span class="num">{{orderStat.weekAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-minus" v-if="orderStat.weekAmountChangeRate < 0">
                <i class="iconfont icon-xia"></i><span class="num">{{orderStat.weekAmountChangeRate}}%</span>
              </span>
              <span class="percent percent-flat" v-if="orderStat.weekAmountChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
        </ul>
      </div>
    </el-col>
  </div>
</template>

<script>
  import API from '../../../utils/api'

  export default {
    name: 'orderChart',
    data () {
      return {
        type: 4, // 1:本周 2:本月 3:本季 4:本年
        orderNumChart: '',
        chartRadio: 1, // 1 新增订单 2 销售额
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
            formatter: function (obj) {
              let data = obj[0].data
              return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px"> ${data.name}</div>
              订单数: ${data.quantity}<br>金额：${data.amount} <br> `
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
              data: [],
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
              data: [],
            },
          ],
        },
        orderStat: {},
      }
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('orderNumChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
      getOrderStat () {
        API.home.orderStat({userIds: null}, da => {
          this.orderStat = da.data
        })
      },
      getSelectOptions () {
        this.getData()
        this.getOrderStat()
      },
      getData () {
        API.home.orderReport({userIds: null, type: this.type}, da => {
          let testData = da.data
          let showData = []
          let xData = []
          testData.forEach(item => {
            if (this.chartRadio === 2) {
              showData.push({name: item.statDate, value: item.amount, quantity: item.quantity, amount: item.amount})
            }
            if (this.chartRadio === 1) {
              showData.push({name: item.statDate, value: item.quantity, quantity: item.quantity, amount: item.amount})
            }
            xData.push(item.statDate)
          })
          // console.log(xData)
          this.option.series[0].data = showData
          this.option.xAxis[0].data = xData
          this.drawOrderNumChart()
        }, () => {})
      },
      setType (type) {
        this.type = type
        this.getSelectOptions()
      },
    },
    created () {
      this.getSelectOptions()
    },
    mounted () {
      this.drawOrderNumChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  @import "../../../../static/iconFont/iconfont.css";

  .com-title-no {
    &:after {
      display: none;
    }
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
        padding-bottom: 30px;
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
        .num {
          font-weight: bold;
        }
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

  .active {
    color: #fff;
    border-color: #39C189;
    background-color: #39C189;
  }
</style>
