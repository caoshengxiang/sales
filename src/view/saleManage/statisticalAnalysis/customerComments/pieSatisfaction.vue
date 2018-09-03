<template>
  <div>
    <div class="com-title">
      <span>客户评价满意度占比</span>
    </div>
    <div style="width: 100%;height: 320px" id="pieSatisfaction"></div>
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
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'},
              ],
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
    methods: {
      drawChart () {
        if (!this.chart) {
          this.chart = this.$echarts.init(document.getElementById('pieSatisfaction'))
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
