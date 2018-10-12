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
        <span>统计时间</span>
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
        <el-button>查询</el-button>
      </div>
      <div class="com-bar-right">
        <el-button>打印</el-button>
        <el-button>导出</el-button>
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
            prop="test"
            label="名称"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="分配回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="成功回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="拒绝回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="待再回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="未回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="分配抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="已抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="test"
            label="待抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <div>
        <el-table
          ref="multipleTable"
          border
          stripe
          :data="tableData"
          tooltip-effect="dark"
          @sort-change="sortChangeHandle"
          @selection-change="handleSelectionChange"
        >
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="客服"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="分配回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="成功回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="拒绝回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="待在回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="未回访客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="分配抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="已抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="test"
            label="待抽查客户量"
            show-overflow-tooltip
          >
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="com-pages-box">
        <el-pagination
          background
          :total="100"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :layout="pagesOptions.layout"
          :page-sizes="pagesOptions.pageSizes"
          :page-size="pagesOptions.pageSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName, lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [
          {
            test: 'test Data',
          }],
        multipleSelection: [],
        time: '',
      }
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
        // this.searchForm.startDate = value[0] || ''
        // this.searchForm.endDate = value[1] || ''
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        // this.getCustomerList()
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
