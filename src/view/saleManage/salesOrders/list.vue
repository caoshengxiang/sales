<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.toName" :to="{name: item.toName}">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" @click="operateOptions('delete')" :disabled="multipleSelection.length <= 0">删除</com-button>
        <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 0"><!--前端-->
        <el-select v-model="orderTypeOption" placeholder="请选择" class="com-el-select">
          <el-option
            v-for="item in orderTypeOptions"
            :key="item.type"
            :label="item.value"
            :value="item.type">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
      <div class="com-bar-right" v-if="themeIndex === 1"><!--后端-->
        <el-select
          v-model="organizationId"
          @change="searchHandle"
          placeholder="请选择组织" class="com-el-select" style="width: 200px">
          <el-option label="全部组织的销售订单" :value="null"></el-option>
          <el-option
            v-for="item in organizationOptions"
            :key="item.name"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange">
        <el-table-column
          fixed
          type="selection"
          align="center"
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="billOrderId"
          label="订单编号"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <!--<a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.billOrderId }}</a>-->
            <a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.id }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="changeName"
          label="关联销售机会"
          show-overflow-tooltip
          width="120">
          <template slot-scope="scope">
            <router-link class="col-link" :to="{name: 'salesOpportunitiesDetail', query: {view: 'detail', id: scope.row.chanceId}, params: {end: 'FE'}}">{{ scope.row.chanceName }}</router-link></template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="customerName"
          label="关联客户名称"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <router-link class="col-link" :to="{name: 'customersDetail', query: {view: 'detail', customerId: scope.row.customerId}, params: {end: 'FE'}}">{{ scope.row.customerName }}</router-link></template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contracterName"
          label="联系人"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.contacterName }}</template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="productName"
          label="购买商品"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="billAmount"
          label="签单金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="refund_amount"
          label="回款金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="not_refund_amount"
          label="待回款金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="isRenew"
          sortable="custom"
          label="是否续费"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.isRenew?'续费订单':'新签订单'}}</template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderState"
          sortable="custom"
          label="订单状态"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in orderState" :key="item.type"
                  v-if="scope.row.orderState === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="source"
          label="订单来源"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in orderSource" :key="item.type"
                  v-if="scope.row.source === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="creatorName"
          label="创建人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="salerName"
          label="销售员"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="counselorName"
          label="咨询师"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="created"
          label="创建日期"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD')}}
          </template>
        </el-table-column>
        <el-table-column
          v-if="themeIndex === 1"
          show-overflow-tooltip
          align="center"
          sortable="custom"
          prop="organizationName"
          label="所属组织"
          width="160">
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
</template>

<script>
  import { mapState } from 'vuex'
  import comButton from '../../../components/button/comButton'
  import API from '../../../utils/api'
  import addDialog from './addDialog'
  import advancedSearch from './advancedSearch'
  import { underscoreName, arrToStr } from '../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        dataLoading: false,
        options: [
          {
            value: 1,
            label: '全部客户',
          }, {
            value: 2,
            label: '我负责的客户',
          }, {
            value: 3,
            label: '我跟进的客户',
          }, {
            value: 4,
            label: '我参与的客户',
          }],
        orderTypeOption: null,
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
          type: null,
          customerId: null,
          organizationId: null,
        },
        customerId: null, // 路由参数
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
        sortObj: null, // 排序
        advancedSearch: null, // 高级搜索
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'orderTypeOptions',
        'orderState',
        'orderSource',
        'themeIndex',
      ]),
    },
    components: {
      comButton,
    },
    methods: {
      operateOptions (op) {
        switch (op) {
          case 'add':
            this.$vDialog.modal(addDialog, {
              title: '添加订单',
              width: 900,
              height: 380,
              params: {
                // id: '123456',
              },
              callback: (data) => {
                if (data.type === 'save') {
                  this.getSalesOrderList()
                }
              },
            })
            break
          case 'delete':
            this.$confirm('确定删除销售订单, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning',
            }).then(() => {
              API.salesOrder.deleteOrder(arrToStr(this.multipleSelection, 'id'), (da) => {
                if (da.status) {
                  this.$message({
                    type: 'success',
                    message: '删除成功!',
                  })
                  this.getSalesOrderList()
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除',
              })
            })
            break
        }
      },
      searchHandle () {
        this.getSalesOrderList()
      },
      sortChangeHandle (sortObj) {
        // console.log(sortObj)
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getSalesOrderList()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 500,
          params: {
            orderState: this.orderState,
            orderSource: this.orderSource,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getSalesOrderList()
            }
          },
        })
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
        this.getSalesOrderList()
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
        this.currentPage = val
        this.getSalesOrderList()
      },
      handleRouter (name, id) {
        this.$router.push({name: 'salesOrdersDetail', query: {view: name, id: id}, params: {end: 'FE'}})
      },
      getSalesOrderList () {
        this.dataLoading = true
        this.getQueryParams()
        API.salesOrder.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          this.dataLoading = false
        }, (data) => {
          this.tableData = data.data.content
          this.tableDataTotal = data.data.totalElements
          this.dataLoading = false
        })
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.orderTypeOption, // 前端
          organizationId: this.organizationId // 后端
        }
        if (this.customerId) { // 更多
          this.defaultListParams.customerId = this.customerId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
    },
    created () {
      this.getSalesOrderList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
