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
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7', '6.8', '6.9', '6.10', '6.11', '6.12', '6.13', '6.14', '6.15'],
          },
          yAxis: {},
          series: [
            {
              symbolSize: 6,
              data: [
                [0.1, 8.04],
                [0.2, 6.95],
                [0.4, 7.58],
                [0.8, 8.81],
                [0.3, 8.33],
                [1.0, 8.04], [1.2, 6.95], [1.4, 7.58], [1.8, 8.81], [1.3, 8.33],
                [2.0, 9.96], [2.1, 7.24], [2.4, 4.26], [2.5, 10.84], [2.7, 4.82],
                [3.0, 5.68], [3.2, 7.68], [3.3, 15.68], [3.4, 9.68], [3.6, 5.68],
                [4.1, 8.44], [4.2, 6.95], [4.4, 7.58], [4.8, 8.81], [4.3, 8.33],
                [5.1, 8.54], [5.2, 6.95], [5.4, 7.58], [5.8, 8.81], [5.3, 8.33],
                [6.1, 8.64], [6.2, 6.95], [6.4, 7.58], [6.8, 8.81], [6.3, 8.33],
                [7.1, 8.74], [7.2, 6.95], [7.4, 7.58], [7.8, 8.81], [7.3, 8.33],
                [8.1, 8.84], [8.2, 6.95], [8.4, 7.58], [8.8, 8.81], [8.3, 8.33],
                [9.1, 8.94], [9.2, 6.95], [9.4, 7.58], [9.8, 8.81], [9.3, 8.33],
                [10.1, 8.104], [10.2, 6.95], [10.4, 7.58], [10.8, 8.81], [10.3, 8.33],
                [11.1, 8.114], [11.2, 6.95], [11.4, 7.58], [11.8, 8.81], [11.3, 8.33],
                [12.1, 8.14], [12.2, 6.95], [12.4, 7.58], [12.8, 8.81], [12.3, 8.33],
                [13.1, 8.134], [13.2, 6.95], [13.4, 7.58], [13.8, 8.81], [13.3, 8.33],
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
