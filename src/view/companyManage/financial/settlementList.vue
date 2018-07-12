<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>佣金结算管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="auditCheck">完成审核</com-button>
      </div>
      <div class="com-bar-right">
        <el-form :model="searchForm" inline>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.clearMonth"
              type="month"
              placeholder="选择日期"
              :editable="false"
              format="yyyyMM">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.clearState" placeholder="请选择结算状态">
              <el-option v-for="item in clearState"  :key="item.type" :label="item.value" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <com-button buttonType="search" @click="getCommissionClear">搜索</com-button>
            <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
            <com-button buttonType="export" icon="el-icon-download" @click="excelExport">导出</com-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @sort-change="sortChangeHandle"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="selection"
          align="center"
          prop="id"
          reserve-selection=""
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderId"
          label="订单号"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="结算状态"
        >
          <template slot-scope="scope">
            <span v-for="item in clearState" :key="item.type"
                  v-if="scope.row.clearState === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="serviceSubjectName"
          label="订单客户"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="productName"
          label="销售商品"
          sortable="custom"
        >
        </el-table-column>

        <el-table-column
          align="center"
          sortable="custom"
          prop="netReceipts"
          label="回款金额"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="结算类型"
        >
          <el-table-column
            align="center"
            prop="totalAmount"
            sortable="custom"
            label="合计收支"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="签约主体"
            sortable="custom"
            prop="contractSubjectName"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="签约金额"
            sortable="custom"
            prop="contractSubjectAmount"
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="saleSubjectName"
            label="销售主体"
          >
          </el-table-column>

          <el-table-column
            align="center"
            sortable="custom"
            prop="serviceSubjectName"
            label="服务主体"
          >
          </el-table-column>

          <el-table-column
            align="center"
            sortable="custom"
            prop="rebateSubjectName"
            label="返佣主体"
          >
          </el-table-column>

        </el-table-column>


        <el-table-column
          align="center"
          label="销售佣金"
        >
          <el-table-column
            align="center"
            prop="saleCommission"
            sortable="custom"
            label="销售佣金"
          >
            <template slot-scope="scope">
              <a class="col-link" @click="saleCommission(scope.row,1)">{{ scope.row.saleCommission }}</a>
            </template>
          </el-table-column>

          <el-table-column
            align="center"
            label="管理佣金"
          >
            <template slot-scope="scope">
              <a class="col-link" @click="saleCommission(scope.row,2)">{{ scope.row.managementCommission }}</a>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="服务佣金"
        >
          <el-table-column
            align="center"
            label="服务佣金"
            prop="serviceCommission"
            sortable="custom"
          >
            <template slot-scope="scope">
              <a class="col-link" @click="saleCommission(scope.row,3)">{{ scope.row.serviceCommission }}</a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="服务奖励"
          >
            <template slot-scope="scope">
              <a class="col-link" @click="saleCommission(scope.row,4)">{{ scope.row.serviceReward }}</a>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="服务补贴"
          >
            <template slot-scope="scope">
              <a class="col-link" @click="saleCommission(scope.row,5)">{{ scope.row.serviceAllowance }}</a>
            </template>
          </el-table-column>
        </el-table-column>

      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="totle"
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
  import commissionDetail from './commissionDetail'
  import serviceCommission from './serviceCommission'
  import managementCommission from './managementCommission'
  import serviceReward from './serviceReward'
  import serviceAllowance from './serviceAllowance'
  import advancedSearch from './advancedSearch'
  import { underscoreName } from '../../../utils/utils'
  import QS from 'qs'
  import webStorage from 'webStorage'
  import { serverUrl } from '../../../utils/const'


  export default {
    name: 'list',
    data () {
      return {
        sortObj: null, // 排序
        advancedSearch:null, // 高级搜索
        totle:0,
        clearState: [ // 订单状态
          {
            type: 1,
            value: '待审核'
          }, {
            type: 2,
            value: '已作废'
          }, {
            type: 3,
            value: '已审核'
          }
        ],
        organizationOptions: [],
        tableData: [
          {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 1
          }, {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 2
          }, {
            customerName: '成都凡特塞科技有限公司',
            businessLicense: '',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status: 3
          }],
        multipleSelection: [],
        currentPage: 1,
        searchForm:{
          organizationId: "",
          clearMonth:null,
          clearState:null
        },
        defaultListParams:null
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
      commissionDetail,
      serviceCommission,
      managementCommission,
      serviceReward,
      serviceAllowance,
      advancedSearch
    },
  created(){
    var that = this;
    that.getCommissionClear(); // 查询列表
    that.getOrganization({pid: 1})

  },
    methods: {
      excelExport () { // 导出
        let as = {}
        for (let key in this.advancedSearch) { // 去除null
          if (this.advancedSearch[key]) {
            as[key] = this.advancedSearch[key]
          }
        }
        let link = document.createElement('a') // 创建事件对象
        let query = QS.stringify(Object.assign({}, this.defaultListParams, this.sortObj, as,
          {authKey: webStorage.getItem('userInfo').authKey}))
        // console.log('下载参数：', query)
        alert(query)
        link.setAttribute('href', serverUrl + '/commissionClear/export?' + query)
        link.setAttribute('download', '导出结算佣金')
        let event = document.createEvent('MouseEvents') // 初始化事件对象
        event.initMouseEvent('click', true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0,
          null) // 触发事件
        link.dispatchEvent(event)
      },
      sortChangeHandle (sortObj) {
        let order = null
        if (sortObj.order === 'ascending') {
          order = 'asc'
        } else if (sortObj.order === 'descending') {
          order = 'desc'
        }
        this.sortObj = {sort: underscoreName(sortObj.prop) + ',' + order}
        this.getCommissionClear()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
            demandSource: this.demandSource,
            type:0
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getCommissionClear()
            }
          },
        })
      },
      auditCheck(){
        var that = this;
        if(that.multipleSelection.length === 0){
          return
        }

        API.financial.audit({ids:that.multipleSelection.map(item => item.id).join() }, (res) => {
            this.$confirm('确认审核?', '提示', {
              type: 'warning',
            }).then(() => {
          that.loading = false
          if (res.status) {
            that.$message({
              type: 'success',
              message: '审核成功!',
            })
            that.getCommissionClear();
          } else {
            that.$message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          that.$message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
        }).catch(() => {})
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      saleCommission(row,type){
        var that = this
        if(type === 1){
          that.openSaleCommission(row.id);
        } else if(type === 2){
          that.openManagementCommission(row.id);
        } else if(type === 3){
          that.openServiceCommission(row.id);
        } else if(type === 4) {
          that.openServiceReward(row.id);
        }
         else if(type === 5){
          that.openServiceAllowance(row.id);
        }
      },
      openManagementCommission(id){
        var that = this
        that.$vDialog.modal(managementCommission, {
          title: '管理佣金返佣详情',
          width: 1500,
          height: 800,
          params: {
            id: id,
          },
          callback: function (data) {
          },
        })
      },
      openServiceAllowance(id){
        var that = this
        that.$vDialog.modal(serviceAllowance, {
          title: '服务补贴返佣详情',
          width: 1500,
          height: 800,
          params: {
            id: id,
          },
          callback: function (data) {
          },
        })
      },
      openServiceCommission(id){
        var that = this
        that.$vDialog.modal(serviceCommission, {
          title: '服务佣金返佣详情',
          width: 1500,
          height: 800,
          params: {
            id: id,
          },
          callback: function (data) {
          },
        })
      },
      openServiceReward(id){
        var that = this
        that.$vDialog.modal(serviceReward, {
          title: '服务奖励返佣详情',
          width: 1500,
          height: 800,
          params: {
            id: id,
          },
          callback: function (data) {
          },
        })
      },
      openSaleCommission(id){
        var that = this
        that.$vDialog.modal(commissionDetail, {
          title: '销售佣金返佣详情',
          width: 1200,
          height: 800,
          params: {
            id: id,
          },
          callback: function (data) {
          },
        })
      },
      getCommissionClear () {
        var that = this
        that.loading = true
        that.defaultListParams= {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          clearMonth: that.searchForm.clearMonth===null?"":(that.searchForm.clearMonth.getFullYear()+""+('00'+(1+that.searchForm.clearMonth.getMonth())).slice(-2)),
          clearState: that.searchForm.clearState
        }
        API.financial.queryList(Object.assign({}, that.defaultListParams, this.sortObj, this.advancedSearch), (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data.content
            that.totle = res.data.totalElements
          } else {
            Message({
              message: res.error.message,
              type: 'error',
            })
          }
        }, (mock) => {
          that.loading = false
          Message({
            message: '系统繁忙，请稍后再试！',
            type: 'error',
          })
        })
      },

      handleSizeChange (val) {

      },
      handleCurrentChange (val) {
        this.currentPage = val;
      },
      addHandle () {
        alert('add btn')
      },
      getOrganization (pa) {
        API.organization.queryAllList(pa, (data) => {
          this.organizationOptions = data.data
        })
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .link {
    color: #00A7FE;
    text-decoration: underline;
    cursor: pointer;
  }
  .button {
    padding: 5px 10px;
    color: #fff;
    border-radius: 3px;
    background-color: #4BCF99;
    cursor: pointer;
  }
</style>
