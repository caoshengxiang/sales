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
      <div class="com-bar-left">
        <com-button buttonType="add" icon="el-icon-plus" @click="orderHandle" :disabled="multipleSelection.length !== 1">派单</com-button>
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
            prop="orderId"
            label="订单单号"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <router-link class="col-link" :to="{name: 'serviceOrderDetail', query: {id: scope.row.id, view: 'order'}}">{{ scope.row.orderId }}</router-link>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="assignState"
            label="派单状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.assignState === 1">待派单</span>
              <span v-if="scope.row.assignState === 2">待部分派单</span>
              <span v-if="scope.row.assignState === 3">已派单</span>
              <span v-if="scope.row.assignState === 4">已接单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderState"
            label="订单状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orderState === 1">待服务</span>
              <span v-if="scope.row.orderState === 2">服务中</span>
              <span v-if="scope.row.orderState === 3">已完成</span>
              <span v-if="scope.row.orderState === 4">已退单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="managerTypeName"
            label="服务管家"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <!--null-未指派、1-待接收、2-已拒绝、3-进行中、4-已完成、5-退单中、6-已退单-->
              <span v-for="(item, index) in scope.row.workOrderManagers" :key="index">
                <a @click="selectManagerHandle(item, 1, scope.row)" v-if="!item.serviceState" class="col-link">{{ item.managerTypeName }}</a>
                <a @click="selectManagerHandle(item, 2, scope.row)" v-else-if="item.serviceState == 1 || item.serviceState == 2">{{ item.managerName }}</a>
                <!--<a v-else-if="item.serviceState == 3 || item.serviceState == 4">{{ item.managerName }}</a>-->
                <a @click="selectManagerHandle(item, 3, scope.row)" v-else>{{ item.managerName }}</a>
                &nbsp;&nbsp;
              </span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="reviewState"
            label="评价状态"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.reviewState === 1">未评价</span>
              <span v-if="scope.row.reviewState === 2">已评价</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceCustomerName"
            label="服务客户"
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
            prop="goodsName"
            label="服务商品"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="provinceName"
            label="服务所在地"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{ scope.row.provinceName }}
              {{ scope.row.cityName }}
              {{ scope.row.areaName }}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="specificationName"
            label="服务规格"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contractAccount"
            label="签约金额"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contractTime"
            label="签约时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">{{scope.row.contractTime && $moment(scope.row.contractTime).format('YYYY-MM-DD HH:mm')}}</template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderType"
            label="签单类型"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orderType === 'FIRST'">客户首单</span>
              <span v-if="scope.row.orderType === 'DERIVE'">衍生业务</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contractProperty"
            label="签约性质"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.contractProperty === 1 ? '新签订单' : '续费订单'}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="renewTimes"
            label="续费次数"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="contractObject"
            label="签约主体"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="reservationTime"
            label="生成服务时间"
            width="160"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              {{scope.row.reservationTime && $moment(scope.row.reservationTime).format('YYYY-MM-DD HH:mm')}}
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
  import API2 from '../../../../utils/api2'
  import comButton from '../../../../components/button/comButton'
  import orderDialog from './orderDialog'
  import selectManager from './selectManager'

  export default {
    name: 'list',
    data () {
      return {
        currentPage: 1,
        dataLoading: false,
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
      orderHandle () {
        this.$vDialog.modal(orderDialog, {
          title: '派单',
          width: 1100,
          height: 660,
          params: {
            ids: this.multipleSelection[0].id
          },
          callback: (data) => {
            if (data.type === 'save') {
              this.getList()
            }
          },
        })
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getList()
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
        API2.serviceOrder.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            this.tableData = res.data.content
            this.tableDataTotal = res.data.totalElements
            setTimeout(() => {
              this.dataLoading = false
            }, 300)
          })
      },
      selectManagerHandle (item, type, row) { // type 1家类型未指定服务管家 2提示此管家未接单 3进入工单详情
        if (type === 1) {
          this.$vDialog.modal(selectManager, {
            title: '选择管家',
            width: 800,
            height: 400,
            params: {
              managerType: item.managerType,
              serviceType: item.serviceType,
              orderId: row.orderId,
              serviceOrderDetail: row,
              excludeId: null,
              quickList: true, // true 快捷派单
            },
            callback: (data) => {
              if (data.type === 'quickSelectManager') {
                console.log(data.manager)
                this.getList()
              }
            },
          })
        } else if (type === 2) {
          this.$message.warning('此管家未接单')
        } else if (type === 3) {
          // todo 3进入工单详情
        }
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
