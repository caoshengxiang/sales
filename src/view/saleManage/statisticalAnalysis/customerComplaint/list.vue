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
        <el-button>打印</el-button>
        <el-button>导出</el-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-list-box">
      <div class="home-row">
        <el-row>
          <el-col :span="12">
            <div class="col-box">
              <pie-origin :originData="originData"></pie-origin>
            </div>
          </el-col>
          <el-col :span="12" class="l-border-6">
            <div class="col-box">
              <pie-reason :reasonData="reasonData"></pie-reason>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import pieOrigin from './pieOrigin'
  import pieReason from './pieReason'
  import API from '../../../../utils/api'
  import { lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        defaultListParams: { // 默认顾客列表请求参数
          dateStart: null,
          dateEnd: null,
        },
        sortObj: {}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: {},
        time: '',
        originData: [],
        reasonData: [],
      }
    },
    components: {
      pieOrigin,
      pieReason,
    },
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        this.defaultListParams.dateStart = value[0] || ''
        this.defaultListParams.dateEnd = value[1] || ''
      },
      searchHandle () {
        this.getData()
      },
      getData () {
        API.statistical.serviceCompliaint(this.defaultListParams, (da) => {
          this.tableData = da.data
          this.originData = [
            {
              value: da.data.normal,
              name: '一般投诉',
            }, {
              value: da.data.upgrade,
              name: '升级投诉',
            },
          ]
          let reason = da.data.reason || {}
          this.reasonData = []
          for (let key in reason) {
            this.reasonData.push({
              value: reason[key],
              name: key,
            })
          }
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

  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 320px;
      }
    }
    .l-border-6 {
      border-left: 6px solid $part-color;
    }
    .r-border-6 {
      border-right: 6px solid $part-color;
    }
    .col-box {
      padding: $page-base-padding;
      height: 100%;
    }
  }
</style>
