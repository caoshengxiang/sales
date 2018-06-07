<template>
  <div class="hello">
    <h1>{{ msg }} <span>,你好像迷路了！<a style="color: blue;cursor: pointer" @click="$router.go(-1)">原路返回</a></span></h1>
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>图标test</h1>
    <i class="sprites sprites-arrow-red"></i>
    <br>
    <br>
    <br>
    <br>
    <!-- 为ECharts准备一个具备大小（宽高）的Dom -->
    <div id="main" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {
        /*
        *  全局、系列、数据三个层级去设置数据图形的样式
        *
        *
        *
        * */
        msg: 'Welcome to sales App',
        chart: '',
        option: {
          // 全局调色盘。
          color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
          title: { // 标题
            text: 'ECharts 入门示例', // 标题文本
          },
          tooltip: {},
          legend: {
            data: ['销量', '销量2'],
          },
          xAxis: { // 直角坐标系,x
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
          },
          yAxis: { // 直角坐标系,y
          },
          series: [ // 一个系列的数据
            {
              name: '销量',
              type: 'bar', // 图标类型，bar-柱形图，pie-饼图
              // color: [], // 此系列自己的调色盘。
              data: [5, 20, 36, 10, 10, 20], // [{value: '', name: ''}]
            }, {
              name: '销量2',
              type: 'bar', // 图标类型，bar-柱形图，pie-饼图
              // color: [], // 此系列自己的调色盘。
              data: [5, 20, 36, 10, 10, 20], // [{value: '', name: ''}]
            }],
        },
      }
    },
    methods: {},
    mounted () {
      this.chart = this.$echarts.init(document.getElementById('main'))
      this.chart.showLoading()
      setTimeout(() => {
        this.chart.hideLoading()
        this.chart.setOption(this.option)
      }, 1000)
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" rel="stylesheet/scss">
  @import "../styles/sprites.css";
  @import '../element_ui/element-variables';
  @import '../element_ui/element';
</style>
