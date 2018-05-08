<template>
  <div class="sale-home">
    <div class="welcome">欢迎进入服务商管理系统！</div>
    <div class="latest-announcement">
      <p class="com-title">最新公告</p>
      <p>
        在新的监管模式下，新旧监管主体将重新定位其监管角色，金融机构和市场亦将随之而变。届时，中国运行达15年的“一行三会”分业模式将从历史舞台谢幕。触发这一历史转折的是，资产规模高达百万亿元的中国金融业，近年来突破性的成长、创新、巨变与
        挑战。随后中国金融业在完成国有金融机构改革、利率市场化、全流通股改等一系列市场化改革后，综合经营渐成 势。2006年的“十一五”规划则奠定了我国金融业综合经营的起点。 <br>
        一位研究金融监管体制改革的经济学家向《财经》记者表示，中国金融监管改革源于现有的混业经营，当控股公司成为金融公司主要的存在形式，监管重叠和监管真空以及监管套利相继出现时，分业监管便已不再适应当前金融业的发展。此后，金融监管改革
        呼声渐起，“改革并完善适应现代金融市场发展的金融监管框架”，在2015年10月召开的十八届五中全会上被正式提出。<br>
        去年7月召开的全国金融工作会议提出，要加强金融监管协调、补齐监管短板，设立国务院金融稳定发展委员会，强化人民银行宏观审慎管理和系统性风险防范职责。11月，金稳委成立，办公室设在央行。</p>
    </div>
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">销售漏斗</p>
            <div style="width: 100%;height: 300px" id="funnelChart"></div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <p class="com-title">进击中的商机TOP5</p>
            <div style="width: 100%; height: 300px" id="barChart"></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">最近一个月重点商机</p>
            <div style="width: 100%; height: 300px" id="scatterChart"></div>
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
              <el-button>周报</el-button>
              <el-button>月报</el-button>
              <el-button>年报</el-button>
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
    <div class="home-row">
      <el-row>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">任务审批待办列表</p>
            <ul class="list">
              <li>服务商基本信息完善</li>
              <li>服务商服务内容提交审核</li>
              <li>服务订单派发（30）</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
          </div>
        </el-col>
        <el-col :span="8" class="lr-part">
          <div class="col-box">
            <p class="com-title">销售机会列表</p>
            <ul class="list">
              <li>全部销售机会</li>
              <li>我开发的销售机会</li>
              <li>即将签单销售机会</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="col-box">
            <p class="com-title">最新消息</p>
            <ul class="list">
              <li>关于调整服务商服务内容通知</li>
              <li>您的服务内容调整申请已经通过审核</li>
              <li>您的服务内容调整申请已经通过审核</li>
            </ul>
            <div class="link"><a class="link-all">查看全部 ></a></div>
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
