<template>
    <div>
      <el-col :span="24">
        <div class="title com-title-no">
          <el-radio v-model="chartRadio" :label="1">新增订单数</el-radio>
          <el-radio v-model="chartRadio" :label="2">销售额</el-radio>
          <div class="report-bar">
            <el-button>周报</el-button>
            <el-button>月报</el-button>
            <el-button>年报</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="18">
        <div id="orderNumChart" style="width: 100%;height: 310px;margin-top: 10px;"></div>
      </el-col>
      <el-col :span="6">
        <div class="col-box col-box-report">
          <ul class="report-ul">
            <li>
              <p class="data">3025 <span class="money">销售额：￥20000</span></p>
              <p class="detail"><span class="tip">本年累计新增订单</span><span class="percent percent-plus"><i
                class="el-icon-back" style="transform: rotate(90deg)"></i>27%</span>
              </p>
            </li>
            <li>
              <p class="data">3025 <span class="money">销售额：￥20000</span></p>
              <p class="detail"><span class="tip">本月累计新增订单</span><span class="percent percent-minus"><i
                class="el-icon-back" style="transform: rotate(-90deg)"></i>27%</span>
              </p>
            </li>
            <li>
              <p class="data">3025 <span class="money">销售额：￥20000</span></p>
              <p class="detail"><span class="tip">本周累计新增订单</span><span class="percent percent-flat"><i
                class="el-icon-minus"></i>持平</span>
              </p>
            </li>
          </ul>
        </div>
      </el-col>
    </div>
</template>

<script>
  export default {
    name: 'orderChart',
    data () {
      return {
        orderNumChart: '',
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
    mounted () {
      this.drawOrderNumChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
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
