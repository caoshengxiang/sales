<template>
  <div>
    <div class="com-title">
      <span>客户评价星级占比</span>
    </div>
    <div class="">
      <span>统计期客户意见数量合计：{{orderReviewDataTotal}}</span>
    </div>
    <div style="width: 100%;height: 320px" id="pieRate"></div>
  </div>
</template>

<script>
  export default {
    name: 'pieOrigin',
    data () {
      return {
        chart: '',
        option: {
          title: {
            text: '',
            subtext: '',
            x: 'center',
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: [],
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [],
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
              },
            },
          ],
        },
      }
    },
    props: {
      orderReviewData: {
        default () {
          return []
        },
        required: true,
        type: Array,
      },
      orderReviewDataTotal: {
        default: 0,
        required: true,
        type: Number,
      }
    },
    watch: {
      orderReviewData (d) {
        this.option.legend.data = []
        d.forEach(item => {
          this.option.legend.data.push(item.name)
        })
        this.option.series[0].data = d
        this.chart.setOption(this.option)
      }
    },
    methods: {
      drawChart () {
        if (!this.chart) {
          this.chart = this.$echarts.init(document.getElementById('pieRate'))
        }
        this.chart.setOption(this.option)
      },
      getData () {
        // API.home.saleFunnel({type: this.type}, da => {
        //   this.drawChart()
        // }, () => {})
      },
    },
    created () {
      this.getData()
    },
    mounted () {
      this.drawChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
