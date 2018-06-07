<template>
    <div>
      <div class="com-title">
        <span>进行中的商机TOP5</span>
        <div class="report-bar">
          <el-button size="mini" style="padding: 7px 3px;margin-left: 0px">本周</el-button>
          <el-button size="mini" style="padding: 7px 3px;margin-left: 0px">本季</el-button>
          <el-button size="mini" style="padding: 7px 3px;margin-left: 0px">本年</el-button>
        </div>
      </div>
      <div style="width: 100%; height: 300px" id="barChart"></div>
    </div>
</template>

<script>
  export default {
    name: 'barChart',
    data () {
      return {
        barChart: '',
        barOption: {
          title: {
            // text: '世界人口总量',
            // subtext: '数据来自网络',
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c} 元',
            axisPointer: {
              type: 'shadow',
            },
          },
          legend: {
            data: ['本周'],
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
            data: ['财务金融产品A', '财务金融产品B', '财务金融产品C', '财务金融产品D', '财务金融产品E'],
          },
          series: [
            {
              name: '本周',
              type: 'bar',
              data: [2500, 3000, 6000, 7000, 9000],
            }
          ],
        },
      }
    },
    methods: {
      drawBarChart () {
        if (!this.barChart) {
          this.barChart = this.$echarts.init(document.getElementById('barChart'))
        }
        this.barChart.setOption(this.barOption)
      },
    },
    mounted () {
      this.drawBarChart()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .report-bar {
    text-align: center;
    float: right;
  }
</style>
