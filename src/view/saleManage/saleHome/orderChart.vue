<template>
  <div>
    <div class="com-title com-title-no">
      <span>新增订单数</span>
      <el-select v-model="paramsForm.value" placeholder="请选择" style="margin-left: 20px">
        <el-option label="部门全部" :value="null">
        </el-option>
        <el-option
          v-for="item in selectOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
            <p class="detail"><span class="tip">本年累计新增订单</span><span class="percent percent-plus"><i
              class="el-icon-back" style="transform: rotate(90deg)"></i>27%</span>
            </p>
          </li>
          <li>
            <p class="data">3025</p>
            <p class="detail"><span class="tip">本月累计新增订单</span><span class="percent percent-minus"><i
              class="el-icon-back" style="transform: rotate(-90deg)"></i>27%</span>
            </p>
          </li>
          <li>
            <p class="data">3025</p>
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
  import API from '../../../utils/api'
  export default {
    name: 'orderChart',
    data () {
      return {
        type: 4, // 1:本周 2:本月 3:本季 4:本年
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
              订单数: ${data.value}<br>金额：${data.amount} <br> `
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
              // name: '',
              type: 'line',
              // stack: '总量',
              areaStyle: {normal: {}},
              data: []
            },
          ],
        },
        orderNumChart: '',
        selectOptions: [
          {
            label: '部门人员A',
            value: 1,
          }, {
            label: '部门人员B',
            value: 2,
          }, {
            label: '部门人员C',
            value: 3,
          },
        ],
        paramsForm: {
          value: null,
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
      getData () {
        API.home.orderReport({type: this.type}, da => {
          console.log(da.data)
        }, () => {
          let testData = [
            {
              'amount': 122.07,
              'quantity': 100,
              'statDate': '01',
            }, {
              'amount': 112.07,
              'quantity': 200,
              'statDate': '02',
            }, {
              'amount': 122.07,
              'quantity': 400,
              'statDate': '03',
            }, {
              'amount': 152.07,
              'quantity': 50,
              'statDate': '04',
            }, {
              'amount': 162.07,
              'quantity': 30,
              'statDate': '05',
            }, {
              'amount': 122.07,
              'quantity': 100,
              'statDate': '06',
            }, {
              'amount': 162.07,
              'quantity': 200,
              'statDate': '07',
            }, {
              'amount': 102.07,
              'quantity': 80,
              'statDate': '08',
            }, {
              'amount': 112.07,
              'quantity': 90,
              'statDate': '09',
            }, {
              'amount': 122.07,
              'quantity': 250,
              'statDate': '10',
            }, {
              'amount': 132.07,
              'quantity': 110,
              'statDate': '11',
            }, {
              'amount': 142.07,
              'quantity': 90,
              'statDate': '12',
            },
          ]
          let showData = []
          let xData = []
          testData.forEach(item => {
            showData.push({name: item.statDate, value: item.quantity, amount: item.amount})
            xData.push(item.statDate)
          })
          // console.log(xData)
          this.option.series[0].data = showData
          this.option.xAxis[0].data = xData
          this.drawOrderNumChart()
        })
      },
    },
    created () {
      this.getData()
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
