<!--回款记录-->

<template>
  <div class="com-container" v-loading="dataLoading">
    <!--头部-->
    <div class="com-head">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item v-for="item in $route.meta.pos" :key="item.name" :to="{name: item.toName}">{{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--控制栏-->
    <div class="com-bar">
      <div class="com-bar-left">
        <!--<com-button buttonType="add" @click="addHandle">完成审核</com-button>-->
        <br>
        <br>
      </div>
      <div class="com-bar-right">
        <el-select v-model="value" placeholder="请选择" class="com-el-select" style="width:180px">
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <com-button buttonType="search" @click="searchHandle">搜索</com-button>
        <com-button buttonType="search" @click="advancedSearchHandle" style="">高级搜索</com-button>
      </div>
    </div>
    <!--详细-->
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        stripe
        :data="refundRecordList"
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
          prop=""
          width="40">
        </el-table-column>
        <el-table-column
          fixed
          align="center"
          label="来自订单"
          prop="orderId"
          width="140"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <router-link class="col-link"
                         :to="{name: 'salesOrdersDetail', query: {view:'detail', id: scope.row.preOrderId}}" target='_blank'>
              {{ scope.row.orderId }}
            </router-link>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderSource"
          label="来源渠道"
          width="115px"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.orderSourceName }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerName"
          label="来自客户"
          width="115px"
          sortable="custom"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="contacterName"
          label="客户联系人"
          width="115"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="订单销售商品"
          width="140"
          sortable="custom"
          prop="productName"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="quantity"
          label="商品规格数量"
          width="120"
          sortable="custom"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="款项名称"
          width="100"
          sortable="custom"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="回款金额"
          width="100"
          sortable="custom"
          prop="netReceipts"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="回款生成日期"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.refundDate && $moment(scope.row.refundDate).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="refundStatus"
          label="回款状态"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditStatus"
          label="审核状态"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="auditTime"
          label="回款审核日期"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.auditTime && $moment(scope.row.auditTime).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="orderType"
          label="签单类型"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.orderType === 'FIRST'">首购订单</span>
            <span v-if="scope.row.orderType === 'DERIVE'">复购订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="isRenew"
          label="是否续费"
          width="100"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            <span v-if="scope.row.isRenew == false">新签订单</span>
            <span v-if="scope.row.isRenew == true">续费订单</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="renewTimes"
          label="续费次数"
          width="120"
          sortable="custom"
          show-overflow-tooltip
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="rebateType"
          label="返佣方式"
          width="100"
          sortable="custom"
          show-overflow-tooltip
        >
          <template slot-scope="scope">{{scope.row.rebateType===1?'分子公司独立结':'平台结算'}}</template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="rebateSubjectName"
          label="返佣主体"
          width="100"
          sortable="custom"
          show-overflow-tooltip
        >
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
          prop="recommenderSourceName"
          label="新客推荐来源"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="recommenderName"
          label="新客推荐人"
          width="160"
          show-overflow-tooltip>
        </el-table-column>
        <!--销售人员-->
        <el-table-column
          align="center"
          prop=""
          label="销售人员"
        >
          <el-table-column
            align="center"
            prop=""
            label="需求提供人"
            width="115"
          >
            <el-table-column
              align="center"
              prop="ownerName"
              label="名称"
              width="115"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="ownerCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
          </el-table-column>
          <!---->
          <el-table-column
            align="center"
            prop=""
            label="销售跟进人"
          >
            <el-table-column
              align="center"
              prop="followerName"
              label="名称"
              width="115"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="followerCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
          </el-table-column>
          <!---->
          <el-table-column
            align="center"
            prop=""
            label="销售咨询师"
          >
            <el-table-column
              align="center"
              prop="counselorName"
              label="名称"
              width="115"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="counselorCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
          </el-table-column>
        </el-table-column>
        <!--管理人员-->
        <el-table-column
          align="center"
          prop=""
          label="管理人员"
        >
          <el-table-column
            align="center"
            prop=""
            label="区域经理"
          >
            <el-table-column
              align="center"
              prop="areaManagerName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="areaManagerCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="大区总监"
          >
            <el-table-column
              align="center"
              prop="regionChiefName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              align="center"
              prop="regionChiefCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            ></el-table-column>
          </el-table-column>
          <!---->

          <!---->
          <!--<el-table-column-->
            <!--align="center"-->
            <!--prop="trainerName"-->
            <!--label="培训师"-->
          <!--&gt;-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--prop="trainerName"-->
              <!--label="名称"-->
              <!--width="90"-->
              <!--sortable="custom"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--prop="trainerCommission"-->
              <!--label="金额"-->
              <!--width="90"-->
              <!--sortable="custom"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
          <!--</el-table-column>-->
          <!---->
          <!--<el-table-column-->
            <!--align="center"-->
            <!--prop="assistantName"-->
            <!--label="销售助理"-->
          <!--&gt;-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--prop="assistantName"-->
              <!--label="名称"-->
              <!--width="100"-->
              <!--sortable="custom"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
            <!--<el-table-column-->
              <!--align="center"-->
              <!--prop="assistantCommission"-->
              <!--label="金额"-->
              <!--width="90"-->
              <!--sortable="custom"-->
              <!--show-overflow-tooltip-->
            <!--&gt;-->
            <!--</el-table-column>-->
          <!--</el-table-column>-->
          <!---->
          <el-table-column
            align="center"
            prop=""
            label="营销副总"
          >
            <el-table-column
              align="center"
              prop="deputyManagerName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="deputyManagerCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>

        </el-table-column>
        <el-table-column
          align="center"
          prop=""
          label="">
          <el-table-column
            align="center"
            prop=""
            label="新客推荐人"
          >
            <el-table-column
              align="center"
              prop="referenceOwnerName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="referenceCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="直接招募人"
          >
            <el-table-column
              align="center"
              prop="directFosterOwnerName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="directFosterCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>

          <el-table-column
            align="center"
            prop=""
            label="间接招募人"
          >
            <el-table-column
              align="center"
              prop="indirectFosterOwnerName"
              label="名称"
              width="100"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
            <el-table-column
              align="center"
              prop="indirectFosterCommission"
              label="金额"
              width="90"
              sortable="custom"
              show-overflow-tooltip
            >
            </el-table-column>
          </el-table-column>
        </el-table-column>
      </el-table>
    </div>
    <!--分页-->
    <div class="com-pages-box">
      <el-pagination
        background
        :total="refundRecordListTotal"
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
  import { underscoreName } from '../../../../utils/utils'
  import advancedSearch from './advancedSearch'

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
            value: null,
            label: '全部回款记录',
          }, {
            value: 1,
            label: '我负责的订单回款记录',
          }, {
            value: 2,
            label: '我跟单的订单回款记录',
          }, {
            value: 3,
            label: '我参与的订单回款记录',
          }],
        value: null,
        refundRecordList: [],
        refundRecordListTotal: 0,
        multipleSelection: [],
        currentPage: 1,
        defaultListParams: { // 默认列表请求参数
          page: null,
          pageSize: null,
          type: null,
        },
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
    created () {
      this.getRefundRecord()
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
        // alert('add btn')
      },
      posTableHeight () {
        let h = document.body.clientHeight,
            new_h = h - 260;
        this.posheight = new_h;
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
        this.currentPage = val
        this.getRefundRecord()
        // console.log(`当前页: ${val}`)
      },
      handleRouter (name) {
        this.$router.push({name: 'taskApprovalDetail', params: {end: 'FE'}, query: {view: name}})
      },
      getQueryParams () { // 请求参数配置
        this.defaultListParams = {
          page: this.currentPage - 1,
          pageSize: this.pagesOptions.pageSize,
          type: this.value,
        }
      },
      getRefundRecord () {
        this.getQueryParams()
        this.dataLoading = true
        API.refundRecord.list(Object.assign({}, this.defaultListParams, this.sortObj, this.advancedSearch), da => {
          this.refundRecordList = da.data.content
          this.refundRecordListTotal = da.data.totalElements
          setTimeout(() => {
            this.dataLoading = false
          }, 300)
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
        this.getRefundRecord()
      },
      searchHandle () {
        this.currentPage = 1
        this.getRefundRecord()
      },
      advancedSearchHandle () {
        this.$vDialog.modal(advancedSearch, {
          title: '高级搜索',
          width: 900,
          height: 600,
          params: {
            preAdvancedSearch: this.advancedSearch,
            orderState: this.orderState,
            orderSource: this.orderSource,
          },
          callback: (data) => {
            if (data.type === 'search') {
              console.log('高级搜索数据：', data.params)
              this.advancedSearch = data.params
              this.getRefundRecord()
            }
          },
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
