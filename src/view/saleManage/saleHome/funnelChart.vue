<template>
  <div>
    <div class="com-title">
      <span>销售漏斗</span>
      <div class="report-bar">
        <el-button size="mini" style="padding: 7px 3px;margin-left: 0px">本周</el-button>
        <el-button size="mini" style="padding: 7px 3px;margin-left: 3px">本季</el-button>
        <el-button size="mini" style="padding: 7px 3px;margin-left: 3px">本年</el-button>
      </div>
    </div>
    <div style="width: 100%;height: 320px" id="funnelChart"></div>
  </div>
</template>

<script>
  export default {
    name: 'funnelChart',
    data () {
      return {
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
                data.name + ':' + data.text
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
                {value: 60, name: '客户签单', text: '3000.00元/14件'},
                {value: 40, name: '预定下单', text: '4000.00元/14件'},
                {value: 20, name: '需求确定', text: '5000.00元/14件'},
                {value: 80, name: '销售跟单', text: '6000.00元/14件'},
                {value: 100, name: '初步接洽', text: '7000.00元/14件'},
              ],
            },
          ],
        },
      }
    },
    methods: {
      drawFunnelChart () {
        if (!this.funnelChart) {
          this.funnelChart = this.$echarts.init(document.getElementById('funnelChart'))
        }
        this.funnelChart.setOption(this.funnelOption)
      },
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
</style>
