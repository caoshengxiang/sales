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
      </div>
      <div class="com-bar-right">
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
            fixed
            type="selection"
            align="center"
            width="40">
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="num"
            label="回访单号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link" :to="{name: 'serviceReturnVisitDetail', query: {id: scope.row.id}}">{{
                scope.row.num }}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="customerName"
            label="服务回访客户"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contactName"
            label="客户联系人"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderId"
            label="订单单号"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="goodsName"
            label="服务商品"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable=""
            prop="serviceManagerNames"
            label="服务管家"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable=""
            prop="serviceManagersAndTypes"
            label="管家类型"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="type"
            label="回访类型"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type === 1">客户主动退单订单回访</span>
              <span v-if="scope.row.type === 2">回款异常订单回访</span>
              <span v-if="scope.row.type === 3">A类产品续费异常订单回访</span>
              <span v-if="scope.row.type === 4">非记账托管业务首次沟通订单回访</span>
              <span v-if="scope.row.type === 5">外勤首次上门回访</span>
              <span v-if="scope.row.type === 6">2-3星评价回访</span>
              <span v-if="scope.row.type === 7">未评价订单回访</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="state"
            label="回访状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.type === 1">待派单</span>
              <span v-if="scope.row.type === 2">待回访</span>
              <span v-if="scope.row.type === 3">已回访</span>
              <span v-if="scope.row.type === 4">拒绝回访</span>
              <span v-if="scope.row.type === 5">待再回访</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="cusserviceName"
            label="回访客服"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="assignTime"
            label="回访派单时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.assignTime && $moment(scope.row.assignTime).format('YYYY-MM-DD HH:mm')}}
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!--分页-->
      <div class="com-pages-box">
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
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import { underscoreName } from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
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
        this.getList()
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      getList () {
        this.getQueryParams()
        this.dataLoading = true
        API.serviceRetVisit.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
    },
    created () {
      this.getList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
