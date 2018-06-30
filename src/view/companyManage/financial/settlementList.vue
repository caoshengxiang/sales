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
            <com-button buttonType="search" @click="getCommissionClear">搜索</com-button>
            <com-button buttonType="export" icon="el-icon-download">导出</com-button>
          </el-form-item>
        </el-form>
        <!--<el-select v-model="queryParam.organizationId" placeholder="请选择" class="com-el-select" style="width:180px">-->
          <!--<el-option label="全部" value=""></el-option>-->
          <!--<el-option-->
            <!--v-for="item in organizationOptions"-->
            <!--:key="item.id"-->
            <!--:label="item.name"-->
            <!--:value="item.id">-->
          <!--</el-option>-->
        <!--</el-select>-->
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
          prop="orderId"
          label="订单号"
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
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="productName"
          label="销售商品"
        >
        </el-table-column>

        <el-table-column
          align="center"
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
            label="合计收支"
          >
          </el-table-column>

          <el-table-column
            align="center"
            label="签约主体"
            prop="contractSubjectName"
          >
          </el-table-column>
          <el-table-column
            align="center"
            label="签约金额"
            prop="contractSubjectAmount"
          >
          </el-table-column>
          <el-table-column
            align="center"
            prop="saleSubjectName"
            label="销售主体"
          >
          </el-table-column>

          <el-table-column
            align="center"
            prop="serviceSubjectName"
            label="服务主体"
          >
          </el-table-column>

          <el-table-column
            align="center"
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
        :total="1000"
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


  export default {
    name: 'list',
    data () {
      return {
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
          organizationId: ""
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
          that.openServiceCommission(row.id);
        }
      },
      openServiceCommission(id){
        var that = this
        that.$vDialog.modal(serviceCommission, {
          title: '管理佣金返佣详情',
          width: 1200,
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
          //clearMonth: that.searchForm.clearMonth.getFullYear()+""+('00'+(1+that.searchForm.clearMonth.getMonth())).slice(-2),
         // clearState: that.searchForm.clearState
        }
        API.financial.queryList(param, (res) => {
          that.loading = false
          if (res.status) {
            that.tableData = res.data.content
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
