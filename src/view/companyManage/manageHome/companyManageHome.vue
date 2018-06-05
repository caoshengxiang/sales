<template>
  <div class="sale-home">
    <div class="welcome">欢迎进入销售管理系统！</div>
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">跟进客户总量</p>
            <ul class="list">
              <li style="font-size:40px;">300</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增35</label></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">意向客户量</p>
            <ul class="list">
              <li style="font-size:40px;">250</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增30</label></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">服务客户总量</p>
            <ul class="list">
              <li style="font-size:40px;">200</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增25</label></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">销售机会总量</p>
            <ul class="list">
              <li style="font-size:40px;">150</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增20</label></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">销售订单</p>
            <ul class="list">
              <li style="font-size:40px;">100</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增15</label></li>
            </ul>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-boxtop">
            <p class="com-title" style="font-size:20px;">服务订单</p>
            <ul class="list">
              <li style="font-size:40px;">50</li>
              <li style="height: 47px"> <label style="float: right;font-size:20px;padding-top: 10px">本月新增10</label></li>
            </ul>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="home-row home-row-2">
      <el-row>
        <el-col :span="18">
          <div class="col-box">
            <p class="com-title com-title-no">新增订单数</p>
            <div id="orderNumChart" style="width: 100%;height: 300px"></div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="col-box col-box-report">
            <div class="report-bar">
              <el-button>本周</el-button>
              <el-button>本月</el-button>
              <el-button>本年</el-button>
            </div>
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
        data: [],
        data2: [],
        funnelOption: { // 漏斗图
          title: {
            // text: '漏斗图',
            // subtext: '纯属虚构',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c}%',
          },
          toolbox: {
            // feature: {
            //   dataView: {readOnly: false},
            //   restore: {},
            //   saveAsImage: {},
            // },
          },
          legend: {
            // data: ['展现', '点击', '访问', '咨询', '订单'],
          },
          calculable: true,
          series: [
            {
              name: '漏斗图',
              type: 'funnel',
              left: '5%',
              top: 60,
              // x2: 80,
              bottom: 60,
              width: '90%',
              // height: {totalHeight} - y - y2,
              min: 0,
              max: 100,
              minSize: '30%',
              maxSize: '100%',
              sort: 'descending',
              gap: 2,
              label: {
                normal: {
                  show: true,
                  position: 'inside',
                },
                emphasis: {
                  textStyle: {
                    fontSize: 20,
                  },
                },
              },
              labelLine: {
                normal: {
                  length: 10,
                  lineStyle: {
                    width: 1,
                    type: 'solid',
                  },
                },
              },
              itemStyle: {
                normal: {
                  borderColor: '#fff',
                  borderWidth: 1,
                },
              },
              data: [
                {value: 60, name: '访问'},
                {value: 40, name: '咨询'},
                {value: 20, name: '订单'},
                {value: 80, name: '点击'},
                {value: 100, name: '展现'},
              ],
            },
          ],
        },
        funnelChart: '',
        barOption: {
          title: {
            // text: '世界人口总量',
            // subtext: '数据来自网络',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: ['2011年', '2012年'],
          },
          grid: {
            left: '0%',
            right: '3%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: {
            type: 'value',
            boundaryGap: [0, 0.01],
          },
          yAxis: {
            type: 'category',
            data: ['巴西', '印尼', '美国', '印度', '中国', '世界人口(万)'],
          },
          series: [
            {
              name: '2011年',
              type: 'bar',
              data: [18203, 23489, 29034, 104970, 131744, 50000],
            },
          ],
        },
        barChart: '',
        scatterOption: {
          xAxis: {},
          yAxis: {},
          series: [
            {
              symbolSize: 20,
              data: [
                [10.0, 8.04],
                [8.0, 6.95],
                [13.0, 7.58],
                [9.0, 8.81],
                [11.0, 8.33],
                [14.0, 9.96],
                [6.0, 7.24],
                [4.0, 4.26],
                [12.0, 10.84],
                [7.0, 4.82],
                [5.0, 5.68],
              ],
              type: 'scatter',
            }],
        },
        scatterChart: '',
      }
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('orderNumChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
      drawFunnelChart () {
        if (!this.funnelChart) {
          this.funnelChart = this.$echarts.init(document.getElementById('funnelChart'))
        }
        this.funnelChart.setOption(this.funnelOption)
      },
      drawBarChart () {
        if (!this.barChart) {
          this.barChart = this.$echarts.init(document.getElementById('barChart'))
        }
        this.barChart.setOption(this.barOption)
      },
      drawScatterChart () {
        if (!this.scatterChart) {
          this.scatterChart = this.$echarts.init(document.getElementById('scatterChart'))
        }
        this.scatterChart.setOption(this.scatterOption)
      },
      mockData () { // todo
        var base = +new Date(2016, 9, 3)
        var oneDay = 24 * 3600 * 1000
        var valueBase = Math.random() * 300
        var valueBase2 = Math.random() * 50

        for (var i = 1; i < 10; i++) {
          var now = new Date(base += oneDay)
          var dayStr = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-')

          valueBase = Math.round((Math.random() - 0.5) * 20 + valueBase)
          valueBase <= 0 && (valueBase = Math.random() * 300)
          this.data.push([dayStr, valueBase])

          valueBase2 = Math.round((Math.random() - 0.5) * 20 + valueBase2)
          valueBase2 <= 0 && (valueBase2 = Math.random() * 50)
          this.data2.push([dayStr, valueBase2])
        }
      },
    },
    created () {
      this.mockData()
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
      border-bottom: 6px solid $part-color;
    }
    .lr-part {
      border-left: 6px solid $part-color;
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 372px;
    }
    .col-boxtop {
      padding: $page-base-padding;
      height: 200px;
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
      width: 50%;
      float: left;
      display: block;
      color: #333333;
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
