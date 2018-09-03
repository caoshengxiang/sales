<template>
  <div>
    <div class="com-title com-title-no">
      <span>年度订单数量同比</span>
      <div class="report-bar">
        <el-select placeholder="请选择" @change="selectOptionsHandle" style="margin-left: 20px">
          <el-option label="11111" value="1"></el-option>
        </el-select>
        <el-select placeholder="请选择" @change="selectOptionsHandle" style="margin-left: 20px">
          <el-option label="22222" value="2"></el-option>
        </el-select>
      </div>
    </div>
    <el-col :span="24">
      <div id="orderNumChart" style="width: 100%;height: 340px"></div>
    </el-col>
  </div>
</template>

<script>
  // import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  // import { arrToStr } from '../../../../utils/utils'

  export default {
    name: 'orderNumChart',
    data () {
      let colors = ['#5793f3', '#d14a61', '#675bba']
      return {
        currentUserId: null,
        type: 4, // 1:本周 2:本月 3:本季 4:本年
        option: {
          color: colors,

          tooltip: {
            trigger: 'none',
            axisPointer: {
              type: 'cross',
            },
          },
          legend: {
            data: ['2015 降水量', '2016 降水量'],
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
                    return '降水量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
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
                    return '降水量  ' + params.value + (params.seriesData.length ? '：' + params.seriesData[0].data : '')
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
              name: '2015 降水量',
              type: 'line',
              xAxisIndex: 1,
              smooth: true,
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            },
            {
              name: '2016 降水量',
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
      }
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('orderNumChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
      getData () {
      },
      getSelectOptions () {
        // API.user.userSubordinates({}, (da) => {
        //   this.selectOptions = da.data
        //   this.selectOptions.unshift({id: this.currentUserId, name: '只看自己'})
        //   this.getData()
        //   this.getOrderStat()
        // })
      },
      getOrderStat () {
        // let userIds = this.paramsForm.userIds
        // if (this.paramsForm.userIds === null) {
        //   userIds = arrToStr(this.selectOptions, 'id')
        // }
        // API.home.orderStat({userIds: userIds}, da => {
        //   this.orderStat = da.data
        // })
      },
      selectOptionsHandle () {},
    },
    created () {
      this.getSelectOptions()
      this.currentUserId = webStorage.getItem('userInfo').id
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
