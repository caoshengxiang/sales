<!--佣金-->
<template>
  <div class="com-container">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <!--<el-breadcrumb-item :to="{ name: 'saleHome' }">销售管理系统</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>财务管理</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>财务支出管理</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <com-button buttonType="add" @click="commissionPaymentConfirm" :disabled="multipleSelection.length<1">佣金确认
        </com-button>
      </div>
      <div class="com-bar-right">
        <com-button buttonType="cardNum" icon="el-icon-plus" @click="addHandle">设置银行卡账户信息</com-button>
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
          prop=""
          reserve-selection=""
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
          <!--<template slot-scope="scope">-->
          <!--<a class="col-link" @click="saleCommission(scope.row)">{{ scope.row.totalAmount }}</a>-->
          <!--</template>-->
        </el-table-column>

        <el-table-column
          align="center"
          label="佣金状态"
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
  import { underscoreName, arrToStr } from '../../../../utils/utils'
  import spendingDetail from '../../../companyManage/financial/commissionExpense/spendingDetail'

  export default {
    name: 'list',
    data () {
      return {
        tableData: [],
        tableDataTotal: 0,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认顾客列表请求参数
          page: null,
          pageSize: null,
        },
        sortObj: {sort: 'created,desc'}, // 排序
        advancedSearch: null, // 高级搜索
        paymentState: [
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
      addHandle () {
        this.$router.push({name: 'personal', query: {view: 'base'}})
      },
      commissionPaymentConfirm () {
        API.financial.commissionPaymentConfirm({ids: arrToStr(this.multipleSelection, 'id')}, (da) => {
          if (da > 0) {
            this.$message.success('操作成功')
          }
        })
      },
      moveHandle () {
        // alert('move')
      },
      handleSelectionChange (val) {
        this.multipleSelection = val
      },
      handleSizeChange (val) {
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        console.log(`当前页: ${val}`)
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
        }
      },
      getCommissionPayment () {
        this.getQueryParams()
        API.financial.queryPaymentListPersonal(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch),
          da => {
            this.tableData = da.data.content
            this.tableDataTotal = da.data.totalElements
          })
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
        this.getCommissionPayment()
      },
      advancedSearchHandle () {
        //   this.$vDialog.modal(advancedSearch, {
        //     title: '高级搜索',
        //     width: 900,
        //     height: 460,
        //     params: {
        //     },
        //     callback: (data) => {
        //       if (data.type === 'search') {
        //         console.log('高级搜索数据：', data.params)
        //         this.advancedSearch = data.params
        //         this.getCommissionPayment()
        //       }
        //     },
        //   })
        // },
      },
      saleCommission (row) {
        var that = this
        that.$vDialog.modal(spendingDetail, {
          title: '管理佣金返佣详情',
          width: 1024,
          height: 800,
          params: {
            id: row.id,
          },
          callback: function (data) {
          },
        })
      },
    },
    created () {
      this.getCommissionPayment()
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
