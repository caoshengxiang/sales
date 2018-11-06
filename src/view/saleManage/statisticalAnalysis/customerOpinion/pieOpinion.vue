<template>
  <div>
    <div class="">
      <span>统计期客户意见数量合计：{{tableDataTotal}}</span>
    </div>
    <div style="width: 100%;height: 320px" id="pieOpinion"></div>
  </div>
</template>

<script>
  export default {
    name: 'pieOpinion',
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
      tableData: {
        default () {
          return []
        },
        type: Array,
        required: true
      },
      tableDataTotal: {
        default: 0,
        type: Number,
        required: true,
      }
    },
    watch: {
      tableData (d) {
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
          this.chart = this.$echarts.init(document.getElementById('pieOpinion'))
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
