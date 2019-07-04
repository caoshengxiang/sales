<template>
  <div class="com-container"
       v-loading="dataLoading"
       element-loading-text="数据加载中...">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-if="themeIndex === 0" v-for="item in $route.meta.pos" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
        <el-breadcrumb-item v-if="themeIndex === 1" v-for="item in $route.meta.pos2" :key="item.name"
                            :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="delete" icon="el-icon-delete" @click="operateOptions('delete')"
                    :disabled="multipleSelection.length <= 0">删除
        </com-button>
        <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出订单数据</com-button>
        <!-- <com-button buttonType="add" icon="el-icon-plus" @click="operateOptions('add')">新增</com-button> -->
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
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!--<com-button buttonType="search" @click="searchHandle">搜索</com-button>-->
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="tableData"
        :max-height='posheight'
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
          fixed
          align="center"
          sortable="custom"
          prop="orderId"
          label="订单编号"
          show-overflow-tooltip
          width="200"
        >
          <template slot-scope="scope">
            <!--<a class="col-link" @click="handleRouter('detail', scope.row.id)">{{ scope.row.billOrderId }}</a>-->
            <a class="col-link" @click="handleRouter('detail', scope.row.id, scope.row.providerName)">{{ scope.row.orderId}} <span
              v-if="!(scope.row.orderId)">-</span></a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="customerId"
          label="关联客户ID"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="chanceName"
          label="关联销售机会"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <router-link class="col-link"
                         :to="{name: 'salesOpportunitiesDetail', query: {view: 'detail', id: scope.row.chanceId}, params: {end: 'FE'}}" target="_blank">
              {{ scope.row.chanceName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="customerName"
          label="关联客户名称"
          show-overflow-tooltip
          width="160">
          <template slot-scope="scope">
            <router-link class="col-link"
                         :to="{name: 'customersDetail', query: {view: 'detail', customerId: scope.row.customerId}, params: {end: 'FE'}}" target="_blank">
              {{ scope.row.customerName }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="contacterName"
          label="联系人"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <router-link class="col-link"
                         :to="{name: 'contactsDetail', query: {view: 'detail', contactsId: scope.row.contacterId}, params: {end: 'FE'}}" target="_blank">
              {{ scope.row.contacterName }}
            </router-link>
          </template>
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
          prop="refundAmount"
          label="回款金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="notRefundAmount"
          label="待回款金额"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="orderType"
          label="签单类型"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-if="scope.row.orderType === 'FIRST'">首购订单</span>
            <span v-if="scope.row.orderType === 'DERIVE'">复购订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="isRenew"
          sortable="custom"
          label="是否续费"
          width="160"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!--{{scope.row.isRenew?'续费订单':'新签订单'}}-->
            <span v-if="scope.row.isRenew == false">新签订单</span>
            <span v-if="scope.row.isRenew == true">续费订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="renewTimes"
          label="续费次数"
          width="160"
          show-overflow-tooltip>
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
          prop="orderSourceName"
          label="需求来源"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="providerName"
          label="需求提供人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="recommenderSourceName"
          label="客户推荐来源"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="recommenderName"
          label="客户推荐人"
          width="160"
          show-overflow-tooltip>
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
        <el-table-column
          align="center"
          sortable="custom"
          prop="chanceSubordinateCompanyName"
          label="需求公司"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          sortable="custom"
          prop="salerSubordinateCompanyName"
          label="销售公司"
          width="160"
          show-overflow-tooltip>
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
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import addDialog from './addDialog'
  import { serverUrl } from '../../../../utils/const'
  import QS from 'qs'
  import webStorage from 'webStorage'
  import advancedSearch from './advancedSearch'
  import { underscoreName, arrToStr } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
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
        chanceId: null, // 路由参数，机会id
        organizationOptions: [], // 组织列表
        organizationId: null, // 选择的组织
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: {}, // 高级搜索
      }
    },
    watch: {
      // 页面高度改变过后改变table的max_height高度
      h (val) {
        if(!this.timer) {
          this.posheight = val - 260
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    mounted() {
      // 监听页面高度
      const that = this
      window.onresize = () => {
        return (() => {
          let a = document.body.clientHeight
          that.h = a
        })()
      }
    },
    created () {
      this.getSalesOrderList()
      if (this.themeIndex === 1) { // 后端， 拉取组织列表
        this.getOrganization({pid: 1})
      }
      this.posTableHeight();            //根据屏幕高度设置table高度
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
        'orderTypeOptions',
        'orderState',
        'orderSource',
        'themeIndex',
        'topSource',
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
              height: 480,
              params: {
                // id: '123456',
                topSource: this.topSource, // 顶级客户来源
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
              API.salesOrder.batchDeleteOrder({salerOrderIds: arrToStr(this.multipleSelection, 'id')}, (da) => {
                if (da.status) {
                  if (da.data.fail > 0) {
                    this.$message.warning(`成功${da.data.success}, 失败${da.data.fail}, 失败原因：${da.data.errorMessage}`)
                  } else {
                    this.$message.success(`成功${da.data.success},失败${da.data.fail}`)
                  }
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
      excelExport () { // 导出
        this.getQueryParams()
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let dlp = {}
        for (let key in this.defaultListParams) { // 去除分页
          if (key !== 'page' && key !== 'pageSize') {
            dlp[key] = this.defaultListParams[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, dlp, this.sortObj, as,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        link.setAttribute('href', serverUrl + '/salerOrder/order/export?' + query)
        link.setAttribute('download', '销售订单数据导出')
        link.setAttribute('target', '_blank')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
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
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getSalesOrderList()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
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
      handleRouter (name, id, providerName) {
        let _url = this.$router.resolve({name: 'salesOrdersDetail', query: {view: name, id: id}, params: {providerName: providerName, end: this.themeIndex === 0 ? 'FE' : 'ME'}})
				window.open(_url.href, '_blank')
      },
      getSalesOrderList () {
        this.dataLoading = true
        this.getQueryParams()
        if (this.themeIndex === 0) {
          API.salesOrder.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
            this.tableData = data.data.content
            this.tableDataTotal = data.data.totalElements
            setInterval(() => {
              this.dataLoading = false
            }, 800)
          })
        } else if (this.themeIndex === 1) {
          API.salesOrder.listAdmin(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), (data) => {
            this.tableData = data.data.content
            this.tableDataTotal = data.data.totalElements
            setInterval(() => {
              this.dataLoading = false
            }, 800)
          })
        }
      },
      getQueryParams () { // 请求参数配置
        this.customerId = this.$route.query.customerId
        this.chanceId = this.$route.query.chanceId
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.orderTypeOption, // 前端
          organizationId: this.organizationId, // 后端
        }
        if (this.customerId) { // 更多[来至客户，联系人]
          this.defaultListParams.customerId = this.customerId
        }
        if (this.chanceId) { // 更多[来至机会]
          this.defaultListParams.chanceId = this.chanceId
        }
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
