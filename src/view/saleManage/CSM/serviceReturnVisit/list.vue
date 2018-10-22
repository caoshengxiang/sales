<template>
  <div class="com-container" v-loading="dataLoading"
       element-loading-text="数据加载中...">
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
      <div class="com-bar-left" style="display: flex">
        <com-button buttonType="add" :disabled="multipleSelection.length === 0" icon="el-icon-plus" @click="orderHandle('assginOrder')">回访派单</com-button>
        <!--<com-button buttonType="add" icon="el-icon-plus" @click="orderHandle('returnVisit')">回访</com-button>-->
        <div>
          <el-dropdown @command="handleCommand" trigger="click" style="margin-left: 10px">
            <el-button type="primary">
              回访<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="item in visitTypes"
                                :key="item.type"
                                :command="item.type"
                                :disabled="returnVisitDisabled(item.type)">
                {{item.value}}
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
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
              <router-link class="col-link" :to="{name: 'serviceReturnVisitDetail', query: {id: scope.row.id, view: 'service'}}">{{
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
          <!--<el-table-column-->
            <!--align="center"-->
            <!--sortable=""-->
            <!--prop="serviceManagerNames"-->
            <!--label="服务管家"-->
            <!--width="160"-->
            <!--show-overflow-tooltip-->
          <!--&gt;-->
          <!--</el-table-column>-->
          <el-table-column
            align="center"
            prop="serviceManagersAndTypes"
            label="管家类型"
            width="180"
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
              <span v-if="scope.row.state === 1">待派单</span>
              <span v-if="scope.row.state === 2">待回访</span>
              <span v-if="scope.row.state === 3">已回访</span>
              <span v-if="scope.row.state === 4">拒绝回访</span>
              <span v-if="scope.row.state === 5">待再回访</span>
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
  import { underscoreName, arrToStr } from '../../../../utils/utils'
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import assginOrder from './assginOrder'
  import returnVisit from './returnVisit'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
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
        'visitTypes',
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
      orderHandle (type) {
        switch (type) {
          case 'assginOrder':
            this.$vDialog.modal(assginOrder, {
              title: '回访派单',
              width: 600,
              height: 260,
              params: {
                ids: arrToStr(this.multipleSelection, 'id')
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getList()
                }
              },
            })
            break
          default:
        }
      },
      handleCommand (command) {
        // this.$message('click on item ' + command)
        let type = parseInt(command, 10)
        this.$vDialog.modal(returnVisit, {
          title: this.visitTypes[type - 1].value,
          width: 950,
          height: 560,
          params: {
            ids: arrToStr(this.multipleSelection, 'id'),
            type: type
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      returnVisitDisabled (type) {
        if (this.multipleSelection.length !== 1) {
          return true
        } else if (this.multipleSelection.length === 1 && this.multipleSelection[0].type === type) {
          return false
        } else {
          return true
        }
      }
    },
    created () {
      this.getList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
