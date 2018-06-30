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
        <com-button buttonType="add" @click="addHandle">完成审核</com-button>
        <com-button buttonType="add" @click="addHandle">完成打款</com-button>
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
          prop="totalAmount"
          label="返佣合计金额"
          show-overflow-tooltip>
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


  export default {
    name: 'list',
    data () {
      return {
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
          paymentMonth:new Date(),
          paymentState:1
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
      commissionDetail,
      serviceCommission,
      managementCommission,
      serviceReward,
      serviceAllowance
    },
    created(){
      var that = this;
      that.getCommissionClear(); // 查询列表
      that.getOrganization({pid: 1})

    },
    methods: {
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
        let param = {
          page: that.currentPage - 1,
          pageSize: that.pagesOptions.pageSize,
          paymentMonth: that.searchForm.paymentMonth.getFullYear()+""+('00'+(1+that.searchForm.paymentMonth.getMonth())).slice(-2),
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
