<template>
  <div>
    <div class="com-title com-title-no">
      <span>订单数</span>
      <el-select v-model="paramsForm.userIds" placeholder="请选择" @change="selectOptionsHandle" style="margin-left: 20px">
        <el-option label="部门全部" :value="null"></el-option>
        <!--<el-option label="只看自己" :value="currentUserId"></el-option>-->
        <el-option
          v-for="(item, index) in selectOptions"
          :key="index"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <div class="report-bar">
        <el-button @click="setType(1)" :class="{active: this.type===1}">周报</el-button>
        <el-button @click="setType(2)" :class="{active: this.type===2}">月报</el-button>
        <el-button @click="setType(4)" :class="{active: this.type===4}">年报</el-button>
      </div>
    </div>
    <el-col :span="18">
      <div id="orderNumChart" style="width: 100%;height: 300px"></div>
    </el-col>
    <el-col :span="6">
      <div class="col-box col-box-report">
        <ul class="report-ul">
          <li>
            <p class="data">{{orderStat.currentYearOrderQuantity}}</p>
            <p class="detail"><span class="tip">本年累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.yearQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.yearQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.yearQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.yearQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.yearQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">{{orderStat.currentMonthOrderQuantity}}</p>
            <p class="detail"><span class="tip">本月累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.monthQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.monthQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.monthQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.monthQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.monthQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
          <li>
            <p class="data">{{orderStat.currentWeekOrderQuantity}}</p>
            <p class="detail"><span class="tip">本周累计新增订单</span>
              <span class="percent percent-plus" v-if="orderStat.weekQuantityChangeRate > 0">
                <i class="iconfont icon-top"></i>{{orderStat.weekQuantityChangeRate}}%
              </span>
              <span class="percent percent-minus" v-if="orderStat.weekQuantityChangeRate < 0">
                <i class="iconfont icon-xia"></i>{{orderStat.weekQuantityChangeRate}}%
              </span>
              <span class="percent percent-flat" v-if="orderStat.weekQuantityChangeRate === 0">
                <i class="el-icon-minus"></i>&nbsp;&nbsp;&nbsp;持平
              </span>
            </p>
          </li>
        </ul>
      </div>
    </el-col>
  </div>
</template>

<script>
  import API from '../../../utils/api'
  import webStorage from 'webStorage'
  import { arrToStr } from '../../../utils/utils'

  export default {
    name: 'orderChart',
    data () {
      return {
        currentUserId: null,
        type: 4, // 1:本周 2:本月 3:本季 4:本年
        option: { // 订单数
          title: {
            // text: '堆叠区域图',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#39C189',
              },
            },
            formatter: function (obj) {
              let data = obj[0].data
              return `<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px"> ${data.name}</div>
              订单数: ${data.value}<br>金额：${data.amount} <br> `
            },
          },
          legend: {
            // data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
          },
          toolbox: {
            // feature: {
            //   saveAsImage: {},
            // },
          },
          grid: {
            left: '0%',
            right: '3%',
            bottom: '0%',
            top: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          color: ['#39C189'],
          series: [
            {
              // name: '',
              type: 'line',
              // stack: '总量',
              areaStyle: {normal: {}},
              data: [],
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
        let userIds = this.paramsForm.userIds
        if (this.paramsForm.userIds === null) {
          userIds = arrToStr(this.selectOptions, 'id')
        }
        API.home.orderReport({userIds: userIds, type: this.type}, da => {
          let testData = da.data
          let showData = []
          let xData = []
          testData.forEach(item => {
            showData.push({name: item.statDate, value: item.quantity, amount: item.amount})
            xData.push(item.statDate)
          })
          // console.log(xData)
          this.option.series[0].data = showData
          this.option.xAxis[0].data = xData
          this.drawOrderNumChart()
        }, () => {})
      },
      setType (type) {
        this.type = type
        this.getSelectOptions()
      },
      selectOptionsHandle () {
        this.getSelectOptions()
      },
      getSelectOptions () {
        API.user.userSubordinates({}, (da) => {
          this.selectOptions = da.data
          this.selectOptions.unshift({id: this.currentUserId, name: '只看自己'})
          this.getData()
          this.getOrderStat()
        })
      },
      getOrderStat () {
        let userIds = this.paramsForm.userIds
        if (this.paramsForm.userIds === null) {
          userIds = arrToStr(this.selectOptions, 'id')
        }
        API.home.orderStat({userIds: userIds}, da => {
          this.orderStat = da.data
        })
      },
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
  @import "../../../styles/common";
  @import "../../../../static/iconFont/iconfont.css";
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
    color: #4BCF99;
    border-color: #c9f1e0;
    background-color: #edfaf5;
  }
</style>
