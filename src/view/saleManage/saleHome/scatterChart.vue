<template>
    <div>
      <p class="com-title">最近一个月重点商机</p>
      <div style="width: 100%; height: 310px" id="scatterChart"></div>
    </div>
</template>

<script>
  export default {
    name: 'scatterChart',
    data () {
      return {
        scatterChart: '',
        scatterOption: {
          color: [
            '#39C189', '#fec42c', '#80F1BE'
          ],
          tooltip: {
            trigger: 'item',
            // formatter: '{a} <br/>{b} : {c}',
            formatter: function (obj) {
              // console.log(obj)
              let value = obj.value
              return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
               ' 预算金额：</div>' +
                ' ' + value[1] + ' 元'
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15'],
          },
          yAxis: {},
          dataZoom: [
            {
              type: 'slider',
              show: true,
              xAxisIndex: [0],
              start: 0,
              end: 100
            },
            {
              type: 'slider',
              show: true,
              yAxisIndex: [0],
              left: '93%',
              start: 1,
              end: 100
            },
            {
              type: 'inside',
              xAxisIndex: [0],
              start: 1,
              end: 100
            },
            {
              type: 'inside',
              yAxisIndex: [0],
              start: 0,
              end: 100
            }
          ],
          series: [
            {
              symbolSize: 8,
              data: [
                [0.1, 8.04], [0.2, 6.95], [0.4, 7.58],
                [1.0, 8.04], [1.2, 6.95], [1.4, 7.58],
                [2.0, 9.96], [2.1, 7.24], [2.4, 4.26],
                [3.0, 5.68], [3.2, 7.68], [3.3, 15.68],
                [4.1, 8.44], [4.2, 6.95], [4.4, 5.58],
                [5.1, 8.54], [5.2, 6.95], [5.4, 7.58],
                [6.1, 8.64], [6.2, 6.95], [6.4, 9.58],
                [7.1, 8.74], [7.2, 6.95], [7.4, 7.58],
                [8.1, 8.84], [8.2, 6.95], [8.4, 7.58],
                [9.1, 8.94], [9.2, 6.95], [9.4, 4.58],
                [10.1, 8.104], [10.2, 6.95], [10.4, 7.58],
                [11.1, 8.114], [11.2, 6.95], [11.4, 8.58],
                [12.1, 8.14], [12.2, 6.95], [12.4, 6.58],
                [13.1, 8.134], [13.2, 6.95], [13.4, 7.58],
              ],
              type: 'scatter',
            }],
        },
      }
    },
    methods: {
      drawScatterChart () {
        if (!this.scatterChart) {
          this.scatterChart = this.$echarts.init(document.getElementById('scatterChart'))
        }
        this.scatterChart.setOption(this.scatterOption)
      },
    },
    mounted () {
      this.drawScatterChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
