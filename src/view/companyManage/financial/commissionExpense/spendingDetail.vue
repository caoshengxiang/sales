<template>
  <div class="com-container"
       element-loading-text="数据加载中...">
    <div class="com-box com-box-padding com-list-box">
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="orderId"
          label="来自订单"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerName"
          label="来自客户"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="productName"
          label="订单销售商品"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop=" quantity"
          label="商品规格数量"
          show-overflow-tooltip>

          <template slot-scope="scope">
            {{ scope.row.specificationName}}({{ scope.row.quantity }})
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="paymentName"
          label="款项名称"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          prop="netReceipts"
          label="回款金额"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="回款日期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $moment(scope.row.refundDate).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="来源渠道"
          prop=""
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="签约类型"
          prop=""
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          label="是否续费"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.isRenew == 1?'是':'否' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="续费次数"
          prop=""
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          align="center"
          prop="customerName"
          label="结算审核状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="item in clearState" :key="item.type"
                  v-if="scope.row.clearState === item.type">{{item.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="审核日期"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ $moment(scope.row.auditDate).format('YYYY-MM-DD HH:mm') }}
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop=""
          label="实发合计"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          align="center"
          label="需求录入"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.demandAmount }}
            ({{ scope.row.demandPeriod }}/
            {{ scope.row.demandPeriodTotal }}期)
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          label="销售跟进"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.followingAmount }}({{ scope.row.followingPeriod }}/{{ scope.row.followingPeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="销售咨询"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.counselorAmount }}({{ scope.row.counselorPeriod }}/{{ scope.row.counselorPeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="totalAmount"
          label="销售副总"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.vpAmount }}({{ scope.row.vpPeriod }}/{{ scope.row.vpPeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="销售总监"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.zoneDirectorAmount }}({{ scope.row.zoneDirectorPeriod }}/{{ scope.row.zoneDirectorPeriodTotal
            }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="销售经理"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.regionalManagerAmount }}({{ scope.row.regionalManagerPeriod }}/{{
            scope.row.regionalManagerPeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="新客推荐人"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.referenceAmount }}({{ scope.row.referencePeriod }}/{{
            scope.row.referencePeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="直接培训"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.directFosterAmount }}({{ scope.row.directFosterPeriod }}/{{ scope.row.directFosterPeriodTotal }}期)
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="间接培训"
          show-overflow-tooltip>
          <template slot-scope="scope">
            {{ scope.row.indirectFosterAmount }}({{ scope.row.indirectFosterPeriod }}/{{ scope.row.indirectFosterPeriodTotal }}期)
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="paymentMonth"
          label="返佣月度"
          show-overflow-tooltip>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import comButton from '../../../../components/button/comButton'
  import API from '../../../../utils/api'
  import { mapState } from 'vuex'
  // import { underscoreName } from '../../../../utils/utils'

  export default {
    name: 'list',
    data () {
      return {
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
        tableData: [],
      }
    },
    computed: {
      ...mapState('constData', [
        'userTypeOptions',
        'userourceType',
        'usertate',
        'pagesOptions',
      ]),
      ...mapState('user', [
        'userList',
        'userTotal',
      ]),
    },
    components: {
      comButton,
    },
    props: ['params'],
    created () {
      var that = this
      let param = {
        id: that.params.id,
      }
      API.financial.paymentDetail(param, (res) => {
        that.loading = false
        if (res.status) {
          that.tableData = res.data
        }
      })
    },
    methods: {},
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
