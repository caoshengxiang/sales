<template>
  <div>
    <div class="com-title com-title-no">
      <span>年度订单数量同比</span>
      <div class="report-bar">
        <el-select placeholder="请选择对比年份" v-model="defaultListParams.year" @change="selectOptionsHandle" style="margin-left: 20px">
          <el-option v-for="item in yearOptions" :key="item" :label="item" :value="item"></el-option>
        </el-select>
        <el-select placeholder="请选择对比数据类型" v-model="defaultListParams.type" @change="selectOptionsHandle" style="margin-left: 20px">
          <el-option label="满意" :value="6"></el-option>
          <el-option label="一般" :value="7"></el-option>
          <el-option label="不满意" :value="8"></el-option>
          <el-option label="一星" :value="1"></el-option>
          <el-option label="二星" :value="2"></el-option>
          <el-option label="三星" :value="3"></el-option>
          <el-option label="四星" :value="4"></el-option>
          <el-option label="五星" :value="5"></el-option>
        </el-select>
      </div>
    </div>
    <el-col :span="24">
      <div id="orderNumChart" style="width: 100%;height: 340px"></div>
    </el-col>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import webStorage from 'webStorage'
  // import { arrToStr } from '../../../../utils/utils'

  export default {
    name: 'orderNumChart',
    data () {
      let colors = ['#5793f3', '#d14a61', '#675bba']
      return {
        currentYear: new Date().getFullYear(),
        defaultListParams: {
          year: new Date().getFullYear() - 1,
          type: 6,
        },
        option: {
          color: colors,

          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['2015 订单数模拟数据', '2016 订单数模拟数据'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[1],
                },
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '订单数  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  },
                },
              },
              data: [
                '2016-1',
                '2016-2',
                '2016-3',
                '2016-4',
                '2016-5',
                '2016-6',
                '2016-7',
                '2016-8',
                '2016-9',
                '2016-10',
                '2016-11',
                '2016-12'],
            },
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: colors[0],
                },
              },
              axisPointer: {
                label: {
                  formatter: function (params) {
                    return '订单数  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                  },
                },
              },
              data: [
                '2015-1',
                '2015-2',
                '2015-3',
                '2015-4',
                '2015-5',
                '2015-6',
                '2015-7',
                '2015-8',
                '2015-9',
                '2015-10',
                '2015-11',
                '2015-12'],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '2015 订单数',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            },
            {
              name: '2016 订单数',
              type: 'line',
              smooth: true,
              data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7],
            },
          ],
        },
        orderNumChart: '',
        selectOptions: [],
        paramsForm: {
          userIds: null,
        },
        orderStat: {},
        tableDataCurrentYear: [],
        tableData: [],
      }
    },
    computed: {
      yearOptions () {
        let y = new Date().getFullYear() - 1
        let interval = 30
        let arr = []
        for (let i = y; i >= y - interval; i--) {
          arr.push(i)
        }
        return arr
      },
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('orderNumChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
      getData () {
        API.statistical.orderReviewYOY(this.defaultListParams, da => {
          this.tableData = da.data
          this.option.legend.data = [this.defaultListParams.year + '评价订单数量', this.currentYear + '评价订单数量']
          let date = []
          let count = []
          da.data.forEach(item => {
            date.push(item.date)
            count.push(item.count)
          })
          this.option.xAxis[1].data = date
          this.option.series[1].name = this.defaultListParams.year + '评价订单数量'
          this.option.series[1].data = count
          this.orderNumChart.setOption(this.option)
        })
      },
      getDataCurrentYear () {
        API.statistical.orderReviewYOY({
          year: this.currentYear,
          type: this.defaultListParams.type
        }, da => {
          this.tableDataCurrentYear = da.data
          let date = []
          let count = []
          da.data.forEach(item => {
            date.push(item.date)
            count.push(item.count)
          })
          console.log(da.data, date)
          this.option.xAxis[0].data = date
          this.option.series[0].name = this.currentYear + '评价订单数量'
          this.option.series[0].data = count
          this.orderNumChart.setOption(this.option)
        })
      },
      selectOptionsHandle () {
        this.getData()
        this.getDataCurrentYear()
      },
    },
    created () {
      this.selectOptionsHandle()
    },
    mounted () {
      this.drawOrderNumChart()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
  @import "../../../../../static/iconFont/iconfont.css";
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
        .num {
          font-weight: bold;
        }
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

  .active {
    color: #fff;
    border-color: #39C189;
    background-color: #39C189;
  }
</style>
