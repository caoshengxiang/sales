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
              <el-option v-for="item in paymentState"  :key="item.type" :label="item.value" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <com-button buttonType="search" @click="getCommissionClear">搜索</com-button>
            <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
            <com-button buttonType="export" icon="el-icon-download">导出</com-button>
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
          prop="paymentMonth"
          label="返佣月度"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="rebateUserName"
          label="返佣对象"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="返佣合计金额"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <a class="col-link" @click="saleCommission(scope.row)">{{ scope.row.totalAmount }}</a>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="返佣状态"
        >
          <template slot-scope="scope">
            <span v-for="item in paymentState" :key="item.type"
                  v-if="scope.row.paymentState === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="created"
          label="返佣结算日期"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="销售佣金"
        >
          <el-table-column
            align="center"
            label="销售佣金"
             prop="saleCommission"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="管理佣金"
            prop="managementCommission"
          >
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
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="服务奖励"
            prop="serviceReward"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="服务补贴"
            prop="serviceAllowance"
          >
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
  import spendingDetail from './spendingDetail'
  import advancedSearch from './advancedSearch'



  export default {
    name: 'list',
    data () {
      return {
        advancedSearch:null, // 高级搜索
        totle:0,
        paymentState: [ // 订单状态
          {
            type: 1,
            value: '待审核'
          }, {
            type: 2,
            value: '已审核'
          }, {
            type: 3,
            value: '已确认'
          }, {
            type: 4,
            value: '已打款'
          }, {
            type: 5,
            value: '已作废'
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
          paymentMonth:null,
          paymentState:null
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
      advancedSearch
    },
    created(){
      var that = this;
      that.getCommissionClear(); // 查询列表
      that.getOrganization({pid: 1})

    },
    methods: {
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 460,
          params: {
            salesState: this.salesState,
            demandSource: this.demandSource,
            type:1
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getuserList()
            }
          },
        })
      },
      auditCheck(){
        var that = this;
        if(that.multipleSelection.length === 0){
          return
        }
        API.financial.auditPayment({ids:that.multipleSelection.map(item => item.id).join() } , (res) => {
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
      auditPay(){
        var that = this;
        if(that.multipleSelection.length === 0){
          return
        }
        this.$confirm('确认付款?', '提示', {
          type: 'warning',
        }).then(() => {
        API.financial.auditPay({ids:that.multipleSelection.map(item => item.id).join() }, (res) => {
          that.loading = false
          if (res.status) {
            that.$message({
              type: 'success',
              message: '付款成功!',
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
      saleCommission(row){
        var that = this
        that.$vDialog.modal(spendingDetail, {
          title: '管理佣金返佣详情',
          width: 1900,
          height: 800,
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
        let param = {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          paymentMonth: that.searchForm.paymentMonth===null?"":(that.searchForm.paymentMonth.getFullYear()+""+('00'+(1+that.searchForm.paymentMonth.getMonth())).slice(-2)),
          paymentState: that.searchForm.paymentState
        }
        API.financial.queryPaymentList(param, (res) => {
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
