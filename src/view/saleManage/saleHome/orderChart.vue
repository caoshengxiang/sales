<template>
    <div>
      <div class="com-title com-title-no">
        <span>新增订单数</span>
        <div class="report-bar">
          <el-button>周报</el-button>
          <el-button>月报</el-button>
          <el-button>年报</el-button>
        </div>
      </div>
      <el-col :span="18">
        <div id="orderNumChart" style="width: 100%;height: 300px"></div>
      </el-col>
      <el-col :span="6">
        <div class="col-box col-box-report">
          <ul class="report-ul">
            <li>
              <p class="data">3025</p>
              <p class="detail"><span class="tip">本年累计新增订单</span><span class="percent percent-plus"><i class="el-icon-back" style="transform: rotate(90deg)"></i>27%</span>
              </p>
            </li>
            <li>
              <p class="data">3025</p>
              <p class="detail"><span class="tip">本月累计新增订单</span><span class="percent percent-minus"><i class="el-icon-back" style="transform: rotate(-90deg)"></i>27%</span>
              </p>
            </li>
            <li>
              <p class="data">3025</p>
              <p class="detail"><span class="tip">本日累计新增订单</span><span class="percent percent-flat"><i class="el-icon-minus"></i>持平</span>
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
    mounted () {
      this.drawOrderNumChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  /*.com-title-no {*/
    /*&:after {*/
      /*display: none;*/
    /*}*/
  /*}*/
  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 300px;
      }
    }
    .lr-part {
      border-left: 6px solid $part-color;
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 362px;
    }
  }
  .report-bar {
    text-align: center;
    float: right;
  }
  .col-box-report {
    /*margin-top: 57px;*/
    border-left: 1px solid $part-color;
  }
  .report-ul {
    li {
      margin-top: 20px;
    }
    .data {
      font-size: 24px;
      color: #1E88E5;
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
