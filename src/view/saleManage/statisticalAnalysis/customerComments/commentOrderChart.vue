<template>
  <div>
    <div class="com-title com-title-no">
      <span></span>
      <el-radio-group v-model="radio2" @change="selectOptionsHandle"  style="margin-left: 20px">
        <el-radio :label="1">统计期评价订单数量趋势</el-radio>
        <el-radio :label="2">统计期订单占比趋势</el-radio>
      </el-radio-group>
      <div class="report-bar">
        <el-button @click="setType(1)" :class="{active: this.type===1}">日</el-button>
        <el-button @click="setType(2)" :class="{active: this.type===2}">周</el-button>
        <el-button @click="setType(3)" :class="{active: this.type===3}">月</el-button>
        <el-button @click="setType(4)" :class="{active: this.type===4}">年</el-button>
      </div>
    </div>
    <el-col :span="24">
      <div id="commentOrderChart" style="width: 100%;height: 340px"></div>
    </el-col>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  import webStorage from 'webStorage'
  // import { arrToStr } from '../../../../utils/utils'

  export default {
    name: 'commentOrderChart',
    data () {
      return {
        currentUserId: null,
        radio2: 1,
        type: 4, // 1:本周 2:本月 3:本季 4:本年
        dateStart: null,
        dateEnd: null,
        option: {
          title: {
            text: '',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            x: 'center',
            y: 'botton',
            data: ['满意', '一般', '不满意', '一星评价', '二星评价', '三星评价', '四星评价', '五星评价', '三星评价（默认）'],
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name: '满意',
              type: 'line',
              stack: '总量',
              data: [120, 132, 101, 134, 90, 230, 210],
            },
            {
              name: '一般',
              type: 'line',
              stack: '总量',
              data: [220, 182, 191, 234, 290, 330, 310],
            },
            {
              name: '不满意',
              type: 'line',
              stack: '总量',
              data: [150, 232, 201, 154, 190, 330, 410],
            },
            {
              name: '一星评价',
              type: 'line',
              stack: '总量',
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: '二星评价',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            }, {
              name: '三星评价',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            }, {
              name: '四星评价',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            }, {
              name: '五星评价',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            }, {
              name: '三星评价（默认）',
              type: 'line',
              stack: '总量',
              data: [820, 932, 901, 934, 1290, 1330, 1320],
            },
          ],
        },
        orderNumChart: '',
        tableData: []
      }
    },
    props: {
      time: {
        default: ''
      }
    },
    watch: {
      time (d) {
        this.dateStart = d[0] || null
        this.dateEnd = d[1] || null
        this.getData()
      }
    },
    methods: {
      drawOrderNumChart () {
        if (!this.orderNumChart) {
          this.orderNumChart = this.$echarts.init(document.getElementById('commentOrderChart'))
        }
        this.orderNumChart.setOption(this.option)
      },
      getData () {
        API.statistical.orderReviewTrend({
          type: this.type,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
        }, da => {
          this.tableData = da.data
          let date = []
          let series = [[], [], [], [], [], [], [], [], []]
          da.data.forEach(item => {
            date.push(item.date)
            series[0].push(item.satisfaction)
            series[1].push(item.normal)
            series[2].push(item.discontent)
            series[3].push(item.oneStar)
            series[4].push(item.twoStar)
            series[5].push(item.threeStar)
            series[6].push(item.fourStar)
            series[7].push(item.fiveStar)
            series[8].push(item.defaultThreeStar)
          })
          this.option.xAxis.data = date
          series.forEach((se, index) => {
            this.option.series[index].data = se
          })
          this.orderNumChart.setOption(this.option)
        })
      },
      setType (type) {
        this.type = type
        this.getData()
      },
      selectOptionsHandle () {
        if (this.radio2 === 1) {
          console.log(1)
        } else {
          console.log(2)
        }
      },
    },
    created () {
      this.getData()
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

  .active {
    color: #fff;
    border-color: #39C189;
    background-color: #39C189;
  }
</style>
