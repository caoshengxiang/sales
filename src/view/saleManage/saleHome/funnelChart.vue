<template>
  <div>
    <div class="com-title">
      <span>销售漏斗</span>
      <div class="report-bar">
        <el-button size="mini" :class="{active: this.type===1}" style="padding: 3px 3px;margin-left: 0px;margin-top: 3px;"
                   @click="setType(1)">本周
        </el-button>
        <el-button size="mini" :class="{active: this.type===3}" style="padding: 3px 3px;margin-left: 3px"
                   @click="setType(3)">本季
        </el-button>
        <el-button size="mini" :class="{active: this.type===4}" style="padding: 3px 3px;margin-left: 3px"
                   @click="setType(4)">本年
        </el-button>
      </div>
    </div>
    <div style="width: 100%;height: 320px" id="funnelChart"></div>
  </div>
</template>

<script>
  import API from '../../../utils/api'
  import { mapState } from 'vuex'

  export default {
    name: 'funnelChart',
    data () {
      return {
        type: 4, // 1:本周 2:本月 3:本季 4:本年
        funnelChart: '',
        funnelOption: { // 漏斗图
          title: {
            // text: '漏斗图',
            // subtext: '纯属虚构',
          },
          tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>{b} : {c}',
            formatter: function (obj) {
              let data = obj.data
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
                obj.seriesName + '</div>' +
                data.name + '<br>' +
                data.amount + '<br>' +
                data.quantity + '<br>'
            },
          },
          toolbox: {
            // feature: {
            //   dataView: {readOnly: false},
            //   restore: {},
            //   saveAsImage: {},
            // },
          },
          legend: {
            data: ['初步接洽', '销售跟单', '需求确定', '预定下单', '客户签单'],
          },
          calculable: true,
          series: [
            {
              name: '销售漏斗',
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
                {value: 20, name: '客户签单', amount: '金额: 0', quantity: '数量: 0'},
                {value: 40, name: '预定下单', amount: '金额: 0', quantity: '数量: 0'},
                {value: 60, name: '需求确定', amount: '金额: 0', quantity: '数量: 0'},
                {value: 80, name: '销售跟单', amount: '金额: 0', quantity: '数量: 0'},
                {value: 100, name: '初步接洽', amount: '金额: 0', quantity: '数量: 0'},
              ],
            },
          ],
        },
      }
    },
    computed: {
      ...mapState('constData', [
        'salesState',
      ]),
    },
    methods: {
      drawFunnelChart () {
        if (!this.funnelChart) {
          this.funnelChart = this.$echarts.init(document.getElementById('funnelChart'))
        }
        this.funnelChart.setOption(this.funnelOption)
      },
      getData () {
        API.home.saleFunnel({type: this.type}, da => {
          let testData = da.data
          let showData = []
          testData.forEach(item => {
            if (item.stage === 1) {
              this.funnelOption.series[0].data[0] = {
                value: 20,
                name: '客户签单',
                amount: '金额:' + item.amount,
                quantity: '数量:' + item.quantity,
              }
            }
            if (item.stage === 2) {
              this.funnelOption.series[0].data[1] = {
                value: 40,
                name: '预定下单',
                amount: '金额:' + item.amount,
                quantity: '数量:' + item.quantity,
              }
            }
            if (item.stage === 3) {
              this.funnelOption.series[0].data[2] = {
                value: 60,
                name: '需求确定',
                amount: '金额:' + item.amount,
                quantity: '数量:' + item.quantity,
              }
            }
            if (item.stage === 4) {
              this.funnelOption.series[0].data[3] = {
                value: 80,
                name: '销售跟单',
                amount: '金额:' + item.amount,
                quantity: '数量:' + item.quantity,
              }
            }
            if (item.stage === 5) {
              this.funnelOption.series[0].data[4] = {
                value: 100,
                name: '初步接洽',
                amount: '金额:' + item.amount,
                quantity: '数量:' + item.quantity,
              }
            }
          })
          // this.funnelOption.series[0].data = showData
          this.drawFunnelChart()
        }, () => {})
      },
      setType (type) {
        this.type = type
        this.getData()
      },
    },
    created () {
      this.getData()
    },
    mounted () {
      this.drawFunnelChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .report-bar {
    text-align: center;
    float: right;
  }

  .bar-item {

  }

  .active {
    color: #4BCF99;
    border-color: #c9f1e0;
    background-color: #edfaf5;
  }
</style>
