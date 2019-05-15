<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'companyManageHome' }">管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>财务管理</el-breadcrumb-item>
        <el-breadcrumb-item>回款结算管理</el-breadcrumb-item>
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
              <el-option v-for="item in clearState" :key="item.type" :label="item.value" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <com-button buttonType="search" @click="getreFundSettlements">搜索</com-button>
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
          prop="orderId"
          label="订单号"
          width="160"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="订单信息"
        >
          <el-table-column
            align="center"
            label="结算状态"
            show-overflow-tooltip
            width="80"
          >
            <template slot-scope="scope">
            <span v-for="item in clearState" :key="item.type"
                  v-if="scope.row.clearState === item.type">{{item.value}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            prop="customerName"
            label="订单客户"
            width="160"
            sortable="custom"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            align="center"
            prop="productName"
            label="销售商品"
            sortable="custom"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="paymentName"
            label="款项名称"
            width="160"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="netReceipts"
            label="回款金额"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderSource"
            label="来源渠道"
            width="100"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="orderType"
            label="签单类型"
            width="100"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.orderType === 'FIRST'">首购订单</span>
              <span v-if="scope.row.orderType === 'DERIVE'">复购订单</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="isRenewState"
            label="是否续费"
            width="100"
            show-overflow-tooltip
          >
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
            label="回款审核时间"
            prop="refundAuditTime"
            sortable="custom"
            width="150"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.refundAuditTime && $moment(scope.row.refundAuditTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column
          align="center"
          label="结算信息"
          show-overflow-tooltip
        >
          <el-table-column
            align="center"
            sortable="custom"
            prop="saleSubjectName"
            label="销售主体"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="签约主体（结算对象）"
            sortable="custom"
            width="170"
            prop="contractSubjectName"
            show-overflow-tooltip
          >
          </el-table-column>
          <el-table-column
            align="center"
            sortable="custom"
            prop="rebateSubjectName"
            label="返佣主体（结算主体）"
            width="170"
            show-overflow-tooltip
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="settlementAmount"
            sortable="custom"
            label="结算收支金额"
            width="120"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="结算生成时间"
            prop="created"
            width="150"
            sortable="custom"
            show-overflow-tooltip>
            <template slot-scope="scope">
              <span>{{ scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="是否生成返佣"
            width="110"
            sortable="custom"
            prop="generateCommission"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span v-if="scope.row.generateCommission === 1">是</span>
              <span v-if="scope.row.generateCommission === 0">否</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="total"
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
        total: 0,
        clearState: [ // 订单状态
          {
            type: 1,
            value: '待审核',
          }, {
            type: 2,
            value: '已作废',
          }, {
            type: 3,
            value: '已审核',
          },
        ],
        organizationOptions: [],
        tableData: [],
        multipleSelection: [],
        currentPage: 1,
        searchForm: {
          organizationId: null,
          clearMonth: null,
          clearState: null,
        },
        defaultListParams: null,
      }
    },
    computed: {
      ...mapState('constData', [
        'pagesOptions',
      ]),
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
    components: {
      comButton,
    },
    created () {
      var that = this
      that.getreFundSettlements() // 查询列表
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
        // alert(query)
        link.setAttribute('href', serverUrl + '/commissionClear/refundSettlements/export?' + query)
        link.setAttribute('download', '导出回款结算')
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
        this.getreFundSettlements()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
            demandSource: this.demandSource,
            type: 0,
            preAdvancedSearch: this.advancedSearch,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.currentPage = 1;
              this.advancedSearch = data.params
              this.getreFundSettlements()
            }else {
                this.advancedSearch = {};
            }
          },
          cancelCallback: (val) => {
              this.advancedSearch = {};
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
          API.financial.audit({ids: that.multipleSelection.map(item => item.id).join()}, (res) => {
            that.loading = false
            if (res.status) {
              that.$message({
                type: 'success',
                message: '审核成功!',
              })
              that.getreFundSettlements()
            } else {
              that.$message({
                message: res.error.message,
                type: 'error',
              })
            }
          })
        }).catch(() => {})
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      getreFundSettlements () {
        var that = this
        that.loading = true
        that.defaultListParams = {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          clearMonth: that.searchForm.clearMonth === null ? '' : (that.searchForm.clearMonth.getFullYear() + '' +
            ('00' + (1 + that.searchForm.clearMonth.getMonth())).slice(-2)),
          clearState: that.searchForm.clearState,
        }
        API.financial.queryList(Object.assign({}, that.defaultListParams, this.sortObj, this.advancedSearch), (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data.content
            that.total = res.data.totalElements
          }
        })
      },

      handleSizeChange (val) {},
      handleCurrentChange (val) {
        this.currentPage = val
        this.getreFundSettlements()
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
