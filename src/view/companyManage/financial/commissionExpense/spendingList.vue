<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>佣金支出管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="auditCheck">完成审核</com-button>
        <com-button buttonType="add" @click="auditPay">完成打款</com-button>
      </div>
      <div class="com-bar-right">
        <el-form :model="searchForm" inline>
          <el-form-item>
            <el-date-picker
              v-model="searchForm.paymentMonth"
              type="month"
              placeholder="选择日期"
              :editable="false"
              format="yyyyMM">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-select v-model="searchForm.paymentState" placeholder="请选择结算状态">
              <el-option v-for="(item,index) in paymentState" :key="index" :label="item.value"
                         :value="item.type"></el-option>
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
        :max-height='posheight'
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
          width="40">
        </el-table-column>
        <el-table-column
          align="center"
          prop="paymentMonth"
          label="返佣月度"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="rebateUserName"
          label="返佣对象"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.rebateUserName }}[{{ scope.row.mobilePhone }}]</span>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="实返金额"
          width="120"
          prop="actualAmount"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="返佣状态"
        >
          <template slot-scope="scope">
            <span v-for="(item, index) in paymentState" :key="index"
                  v-if="scope.row.paymentState === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="saleCommission"
          sortable="custom"
          width="100"
          label="销售佣金"
        >
          <template slot-scope="scope">
            <a class="col-link" @click="saleCommission(scope.row)">{{ scope.row.saleCommission }}</a>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="服务佣金"
          width="100"
          prop="serviceCommission"
          sortable="custom"
        >
          <!--<template slot-scope="scope">-->
            <!--<a class="col-link">{{ scope.row.serviceCommission }}</a>-->
          <!--</template>-->
        </el-table-column>
        <el-table-column
          align="center"
          label="合计应返"
          prop="totalAmount"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="服务押金扣款"
          prop="bailAmountDeduction"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="服务押金"
          prop="bailAmount"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="佣金生成日期"
          prop="created"
          width="150"
          sortable="custom"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
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
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import spendingDetail from './spendingDetail'
  import advancedSearch from '../advancedSearch'
  import { underscoreName } from '../../../../utils/utils'
  import QS from 'qs'
  import webStorage from 'webStorage'
  import { serverUrl } from '../../../../utils/const'

  export default {
    name: 'list',
    data () {
      return {
        h: document.body.clientHeight,
        posheight: 100,
        timer: false,
        sortObj: null, // 排序
        advancedSearch: {}, // 高级搜索
        totle: 0,
        paymentState: [ // 订单状态
          {
            type: 1,
            value: '待审核',
          }, {
            type: 2,
            value: '已审核',
          }, {
            type: 3,
            value: '已确认',
          }, {
            type: 4,
            value: '已打款',
          }, {
            type: 5,
            value: '已作废',
          },
        ],
        organizationOptions: [],
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        searchForm: {
          organizationId: '',
          paymentMonth: null,
          paymentState: null,
        },
        defaultListParams: null,
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
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
    },
    components: {
      comButton,
      spendingDetail,
      advancedSearch,
    },
    created () {
      var that = this
      that.getCommissionClear() // 查询列表
      that.getOrganization({pid: 1})
      this.posTableHeight();            //根据屏幕高度设置table高度
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
    methods: {
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
      },
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
        link.setAttribute('href', serverUrl + '/commissionPayment/export?' + query)
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
            type: 1,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              this.advancedSearch = data.params
              console.log(this.advancedSearch)
              // this.advancedSearch.paymentMonthStart = !this.advancedSearch.paymentMonthStart
              //   ? null
              //   : (this.advancedSearch.paymentMonthStart.getFullYear() + '' +
              //     ('00' + (1 + this.advancedSearch.paymentMonthStart.getMonth())).slice(-2))
              //
              // this.advancedSearch.paymentMonthEnd = !this.advancedSearch.paymentMonthEnd
              //   ? null
              //   : (this.advancedSearch.paymentMonthEnd.getFullYear() + '' +
              //     ('00' + (1 + this.advancedSearch.paymentMonthEnd.getMonth())).slice(-2))
              // alert(this.advancedSearch.paymentMonthEnd)
              this.getCommissionClear()
            }
          },
        })
      },
      auditCheck () {
        var that = this
        if (that.multipleSelection.length === 0) {
          return
        }
        this.$confirm('确认审核?', '提示', {
          type: 'warning',
        }).then(() => {
          API.financial.auditPayment({ids: that.multipleSelection.map(item => item.id).join()}, (res) => {
            that.loading = false
            if (res.status) {
              that.$message({
                type: 'success',
                message: '审核成功!',
              })
              that.getCommissionClear()
            }
          })
        }).catch(() => {})
      },
      auditPay () {
        var that = this
        if (that.multipleSelection.length === 0) {
          return
        }
        this.$confirm('确认付款?', '提示', {
          type: 'warning',
        }).then(() => {
          API.financial.auditPay({ids: that.multipleSelection.map(item => item.id).join()}, (res) => {
            that.loading = false
            if (res.status) {
              that.$message({
                type: 'success',
                message: '付款成功!',
              })
              that.getCommissionClear()
            }
          })
        }).catch(() => {})
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      saleCommission (row) {
        var that = this
        that.$vDialog.modal(spendingDetail, {
          title: '销售返佣详情',
          width: 800,
          height: 500,
          params: {
            id: row.id,
          },
          callback: function (data) {
          },
        })
      },
      getCommissionClear () {
        var that = this
        that.loading = true
        that.defaultListParams = {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          paymentMonth: that.searchForm.paymentMonth === null ? null : (that.searchForm.paymentMonth.getFullYear() +
            '' + ('00' + (1 + that.searchForm.paymentMonth.getMonth())).slice(-2)),
          paymentState: that.searchForm.paymentState,
        }
        API.financial.queryPaymentList(Object.assign({}, that.defaultListParams, this.sortObj, this.advancedSearch),
          (res) => {
            that.loading = false
            if (res.status) {
              that.tableData = res.data.content
              that.totle = res.data.totalElements
            }
          })
      },

      handleSizeChange (val) {

      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getCommissionClear()
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
