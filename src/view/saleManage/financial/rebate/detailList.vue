<template>
  <div>
    <el-table
      ref="multipleTable"
      border
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column
        align="center"
        label="来至订单"
        prop="orderId"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="customerName"
        label="来至客户"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="productName"
        label="订单销售商品"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="specificationName"
        label="订单规格数量"
        show-overflow-tooltip>
        <template slot-scope="scope">{{ scope.row.specificationName }}x {{scope.row.quantity}}</template>
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
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="refundDate"
        label="回款日期"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.refundDate && $moment(scope.row.refundDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="clearState"
        label="结算审核状态"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-for="item in paymentStateData" :key="item.type" v-if="item.type === scope.row.clearState">{{item.value}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="auditDate"
        label="审核日期"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{ scope.row.auditDate && $moment(scope.row.auditDate).format('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="isRenew"
        label="是否续费"
        show-overflow-tooltip
      >
        <template slot-scope="scope">{{scope.row.isRenew?'续费订单':'新签订单'}}</template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="totalAmount"
        label="返佣合计"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="demandAmount"
        label="需求录入"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.demandAmount">{{scope.row.demandAmount}}&nbsp;({{scope.row.demandPeriod}}/{{scope.row.demandPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="followingAmount"
        label="销售跟进"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.followingAmount">{{scope.row.followingAmount}}&nbsp;({{scope.row.followingPeriod}}/{{scope.row.followingPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="counselorAmount"
        label="销售咨询"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.counselorAmount">{{scope.row.counselorAmount}}&nbsp;({{scope.row.counselorPeriod}}/{{scope.row.counselorPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="vpAmount"
        label="营销副总"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.vpAmount">{{scope.row.vpAmount}}&nbsp;({{scope.row.vpPeriod}}/{{scope.row.vpPeriodTotal}}期)</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="zoneDirectorAmount"
        label="大区总监"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.zoneDirectorAmount">{{scope.row.zoneDirectorAmount}}&nbsp;({{scope.row.zoneDirectorPeriod}}/{{scope.row.zoneDirectorPeriodTotal}})期</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="regionalManagerAmount"
        label="区域经理"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.regionalManagerAmount">{{scope.row.regionalManagerAmount}}&nbsp;({{scope.row.regionalManagerPeriod}}/{{scope.row.regionalManagerPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="assistantAmount"
        label="销售助理"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.assistantAmount">{{scope.row.assistantAmount}}&nbsp;({{scope.row.assistantPeriod}}/{{scope.row.assistantPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="trainerAmount"
        label="培训师"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.trainerAmount">{{scope.row.trainerAmount}}&nbsp;({{scope.row.trainerPeriod}}/{{scope.row.trainerPeriodTotal}}期)</span></template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="serviceReward"
        label="服务奖励"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.serviceReward">{{scope.row.serviceReward}}&nbsp;({{scope.row.serviceRewardPeriod}}/{{scope.row.serviceRewardPeriodTotal}}期)</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="serviceAllowance"
        label="服务补贴"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.serviceAllowance">{{scope.row.serviceAllowance}}&nbsp;({{scope.row.serviceAllowancePeriod}}/{{scope.row.serviceAllowancePeriodTotal}}期)</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="serviceCommission"
        label="服务佣金"
        show-overflow-tooltip
      >
        <template slot-scope="scope"><span v-if="scope.row.serviceCommission">{{scope.row.serviceCommission}}&nbsp;({{scope.row.demandPeriod}}/{{scope.row.demandPeriodTotal}}期)</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="paymentMonth"
        label="返佣月度"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import API from '../../../../utils/api'

  export default {
    name: 'detailList',
    data () {
      return {
        tableData: [],
        paymentStateData: [
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
    props: ['params'],
    methods: {
      getCommissionPaymentDetail () {
        API.financial.paymentDetail({id: this.params.id}, da => {
          this.tableData = da.data
        })
      },
    },
    created () {
      this.getCommissionPaymentDetail()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
