<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="(item, index) in $route.meta.pos" :key="index" :to="{name: item.toName}">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <span>统计时间: </span>
        <el-date-picker
          v-model="time"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          @change="timeIntervalHandle"
          :unlink-panels="true"
          :default-value="lastMonthDate()"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button @click="searchHandle">查询</el-button>
      </div>
      <div class="com-bar-right">
        <!--<el-button>打印</el-button>-->
        <!--<el-button>导出</el-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div class="home-row">
        <el-row>
          <el-col :span="24">
            <div class="col-box">
              <pie-opinion :tableData="tableData" :tableDataTotal="tableDataTotal"></pie-opinion>
            </div>
          </el-col>
          <el-col class="l-border-6">
            <div class="col-box">
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { lastMonthDate } from '../../../../utils/utils'
  import PieOpinion from './pieOpinion'
  import API from '../../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          timeStart: null,
          timeEnd: null,
        },
        tableData: [],
        tableDataTotal: 0,
        time: '',
      }
    },
    components: {
      PieOpinion
    },
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        this.defaultListParams.timeStart = value[0] || ''
        this.defaultListParams.timeEnd = value[1] || ''
      },
      searchHandle () {
        this.getData()
      },
      getData () {
        API.statistical.suggestion(this.defaultListParams, (da) => {
          this.tableData = da.data.innerCountList
          this.tableDataTotal = da.data.total
        })
      },
    },
    created () {
      this.getData()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
