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
  import API from '../../../utils/api'

  export default {
    name: 'barChart',
    data () {
      return {
        type: 1, // 1:本周 2:本月 3:本季 4:本年
        barChart: '',
        barOption: {
          title: {
            // text: '世界人口总量',
            // subtext: '数据来自网络',
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (obj) {
              let data = obj[0].data
              return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">
                ${data.name}</div>金额: ${data.value}<br>预计签单日期: ${data.time}`
            },
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
            // data: ['财务金融产品A', '财务金融产品B', '财务金融产品C', '财务金融产品D', '财务金融产品E'],
            data: []
          },
          series: [
            {
              // name: '本周',
              type: 'bar',
              // data: [2500, 3000, 6000, 7000, 9000],
              data: [],
            },
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
      getData () {
        API.home.topChance({type: this.type}, da => {
          console.log(da.data)
        }, () => {
          let testData = [
            {
              'amount': 55,
              'billDate': 1529596800000,
              'chanceId': 109,
              'productId': 323195,
              'productName': '测试商品的产品选择1',
            }, {
              'amount': 30,
              'billDate': 1529596800000,
              'chanceId': 109,
              'productId': 323195,
              'productName': '测试商品的产品选择2',
            }, {
              'amount': 40,
              'billDate': 1529596800000,
              'chanceId': 109,
              'productId': 323195,
              'productName': '测试商品的产品选择3',
            }, {
              'amount': 80,
              'billDate': 1529596800000,
              'chanceId': 109,
              'productId': 323195,
              'productName': '测试商品的产品选择4',
            }, {
              'amount': 50,
              'billDate': 1529596800000,
              'chanceId': 109,
              'productId': 323195,
              'productName': '测试商品的产品选择5',
            },
          ]
          let showData = []
          let productName = []
          testData.forEach(item => {
            productName.push(item.productName)
            showData.push({value: item.amount, name: item.productName, time: this.$moment(item.billDate).format('YYYY-MM-DD')})
          })
          this.barOption.yAxis.data = productName
          this.barOption.series[0].data = showData
          this.drawBarChart()
        })
      },
    },
    created () {
      this.getData()
    },
    mounted () {
      this.drawBarChart()
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
