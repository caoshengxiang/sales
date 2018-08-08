<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人名称：">
              <el-input type="text" v-model="searchForm.contacterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="商品名称：">
              <el-input type="text" v-model="searchForm.productName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="规格名称：">
              <el-input type="text" v-model="searchForm.specificationName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="款项名称：">
              <el-input type="text" v-model="searchForm.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="返佣主体：">
              <el-input type="text" v-model="searchForm.rebateSubjectName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="返佣相关人员：">
              <el-input type="text" v-model="searchForm.rebateRelUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回款审核状态：">
              <el-input type="text" v-model="searchForm.refundStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否续费：">
              <el-select v-model="searchForm.isRenew" placeholder="请选择">
                <el-option label="否" :value="0"></el-option>
                <el-option label="是" :value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="返佣方式：">
              <el-select v-model="searchForm.rebateType" placeholder="请选择">
                <el-option label="分子公司独立结算" :value="1"></el-option>
                <el-option label="平台结算" :value="2"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="24">
            <el-form-item label="回款日期：">
              <el-date-picker
                v-model="timeIntervalRefundDate"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeIntervalRefundDateHandle"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="24">
            <el-form-item label="审核时间：">
              <el-date-picker
                v-model="timeIntervalAuditTime"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeIntervalAuditTimeHandle"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-form-item label="回款金额：">
            <el-row>
              <el-col :span="5">
                <el-input @change="intervalStartHandle" type="number"
                          v-model.number="searchForm.startNetReceipts"></el-input>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center">-</div>
              </el-col>
              <el-col :span="5">
                <el-input @change="intervalEndHandle" type="number"
                          v-model.number="searchForm.endNetReceipts"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="cancel-button" @click="clearForm">清 除</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import API from '../../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        industryList: [], // 行业
        levelList: [], // 级别
        seaList: [], // 公海
        customerSourceType: [], // 客户来源
        customerState: [], // 客户状态
        searchForm: { // 表单
          customerName: null,
          contacterName: null,
          productName: null,
          specificationName: null,
          name: null,
          rebateSubjectName: null,
          rebateRelUserName: null,
          refundStatus: null,
          isRenew: null,
          // 回款
          startNetReceipts: null,
          endNetReceipts: null,
          startRefundDate: null, // 回款日期下限
          endRefundDate: null,
          startAuditTime: null, // 审核时间下限
          endAuditTime: null,
        },
        timeIntervalRefundDate: [],
        timeIntervalAuditTime: [],
      }
    },
    props: ['params'],
    methods: {
      clearForm () {
        this.searchForm = {}
        this.timeIntervalRefundDate = []
        this.timeIntervalAuditTime = []
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalRefundDateHandle (value) {
        this.searchForm.startRefundDate = value[0] || ''
        this.searchForm.endRefundDate = value[1] || ''
      },
      timeIntervalAuditTimeHandle (value) {
        this.searchForm.startAuditTime = value[0] || ''
        this.searchForm.endAuditTime = value[1] || ''
      },
      intervalStartHandle () {
        if (this.searchForm.startNetReceipts > this.searchForm.endNetReceipts) {
          this.searchForm.endNetReceipts = null
        }
      },
      intervalEndHandle () {
        if (this.searchForm.startNetReceipts && this.searchForm.startNetReceipts > this.searchForm.endNetReceipts) {
          this.searchForm.endNetReceipts = this.searchForm.startNetReceipts
        }
      },
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.startRefundDate) { // 日期
        this.timeIntervalRefundDate = [this.searchForm.startRefundDate, this.searchForm.startRefundDate]
      }
      if (this.searchForm.startAuditTime) { // 日期
        this.timeIntervalAuditTime = [this.searchForm.startAuditTime, this.searchForm.startAuditTime]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
