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
              <pie-satisfaction :orderReviewData="orderReviewData" :orderReviewDataTotal="orderReviewDataTotal"></pie-satisfaction>
            </div>
          </el-col>
          <el-col :span="12" class="l-border-6">
            <div class="col-box">
              <pie-rate :orderReviewData="orderReviewData2" :orderReviewDataTotal="orderReviewDataTotal"></pie-rate>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="home-row home-row-2">
        <el-row>
          <el-col :span="24">
            <div class="col-box">
              <div class="com-title">
                <span>统计期管家获得评价明细</span>
              </div>
              <div>
                <el-table
                  ref="multipleTable2"
                  border
                  :data="tableData"
                  tooltip-effect="dark"
                >
                  <el-table-column
                    align="center"
                    prop="managerName"
                    label="管家姓名"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="managerNo"
                    label="管家工号"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="total"
                    label="评价数量合计"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="oneStarStr"
                    label="一星评价及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="twoStarStr"
                    label="二星评价及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="threeStarStr"
                    label="三星评价及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="fourStarStr"
                    label="四星评价及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="fiveStarStr"
                    label="五星评价及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                  <el-table-column
                    align="center"
                    prop="defaultThreeStarStr"
                    label="默认三星及占比"
                    show-overflow-tooltip
                  >
                  </el-table-column>
                </el-table>
              </div>
              <!--分页-->
              <div class="" style="padding-top: 20px;text-align: right;">
                <el-pagination
                  background
                  :total="tableDataTotal"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :layout="pagesOptions.layout"
                  :page-sizes="pagesOptions.pageSizes"
                  :page-size="pagesOptions.pageSize">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="home-row">
        <el-row>
          <el-col :span="24">
            <div class="col-box">
              <comments-order :time="time"></comments-order>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="home-row home-row-2">
        <el-row>
          <el-col :span="24">
            <div class="col-box">
              <order-num></order-num>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName, lastMonthDate } from '../../../../utils/utils'
  import pieRate from './pieRate'
  import pieSatisfaction from './pieSatisfaction'
  import commentsOrder from './commentOrderChart'
  import orderNum from './orderNumChart'
  import API from '../../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          dateStart: null,
          dateEnd: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        time: '',
        tableData: [], // 服务期管家获得评价明细
        tableDataTotal: 0,
        orderReviewData: [], // 订单评价满意度统计
        orderReviewData2: [], // 订单评价满意度统计
        orderReviewDataTotal: 0,
        orderReviewTrend: [], // 客户评价趋势统计
      }
    },
    components: {
      pieRate,
      pieSatisfaction,
      commentsOrder,
      orderNum,
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      timeIntervalHandle (value) {
        this.defaultListParams.dateStart = value[0] || ''
        this.defaultListParams.dateEnd = value[1] || ''
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          dateStart: this.defaultListParams.dateStart,
          dateEnd: this.defaultListParams.dateEnd,
        }
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getData()
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getData()
      },
      getOrderReview () { // 订单评价满意度统计
        API.statistical.orderReview(this.defaultListParams, (da) => {
          this.orderReviewDataTotal = da.data.total
          this.orderReviewData = [
            {
              name: '满意（4-5星）',
              value: da.data.satisfaction
            }, {
              name: '不满意（1-2星）',
              value: da.data.discontent
            }, {
              name: '一般（3星）',
              value: da.data.normal
            },
          ]
          this.orderReviewData2 = [
            {
              name: '一星评价',
              value: da.data.oneStar
            }, {
              name: '二星评价',
              value: da.data.twoStar
            }, {
              name: '三星评价',
              value: da.data.threeStar
            }, {
              name: '四星评价',
              value: da.data.fourStar
            }, {
              name: '五星评价',
              value: da.data.fiveStar
            }, {
              name: '三星评价（默认）',
              value: da.data.defaultThreeStar
            },
          ]
        })
      },
      getData () { // 服务期管家获得评价明细
        this.getQueryParams()
        API.statistical.orderManagerReview(this.defaultListParams, da => {
          this.tableData = da.data.content
          this.tableDataTotal = da.data.totalElements
        })
      },
      searchHandle () {
        this.getOrderReview()
        this.getData()
      },
    },
    created () {
      this.searchHandle()
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .home-row {
    &.home-row-2 {
      border-top: 6px solid $part-color;
      border-bottom: 6px solid $part-color;
      .col-box {
        height: 100%;
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
