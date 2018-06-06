<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单编号：">
              <el-input type="text" v-model="searchForm.billOrderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input type="text" v-model="searchForm.contracterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="购买商品：">
              <el-input type="text" v-model="searchForm.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售相关人员：">
              <el-input type="text" v-model="searchForm.team"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select v-model="searchForm.orderState" placeholder="请选择订单状态">
                <el-option v-for="item in orderState" :key="item.type" :label="item.value" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单来源：">
              <el-select v-model="searchForm.source" placeholder="请选择订单来源">
                <el-option v-for="item in orderSource" :key="item.type" :label="item.value" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否续费：">
              <el-select v-model="searchForm.isRenew" placeholder="请选择是否续费">
                <el-option label="续费订单" :value="true"></el-option>
                <el-option label="新签订单" :value="false"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="创建日期：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="timestamp"
                @change="timeIntervalHandle"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="12">
            <el-form-item label="签单金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number" v-model.number="searchForm.billAmountStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number" v-model.number="searchForm.billAmountEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回款金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number" v-model.number="searchForm.refund_amountStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number" v-model.number="searchForm.refund_amountEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待回款金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number" v-model.number="searchForm.not_refund_amountStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number" v-model.number="searchForm.not_refund_amountEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import API from '../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        orderState: [], // 订单状态
        orderSource: [], // 订单来源
        searchForm: { // 表单
          billOrderId: null,
          customerName: null,
          contracterName: null,
          productName: null,
          team: null, // todo 位置
          orderState: null,
          source: null,
          isRenew: null,
          start: null,
          end: null,
          billAmountStart: null, // 签单金额，todo 未知
          billAmountEnd: null,
          refund_amountStart: null, // todo
          refund_amountEnd: null,
          not_refund_amountStart: null, // todo
          not_refund_amountEnd: null
        },
        timeInterval: '',
      }
    },
    props: ['params'],
    methods: {
      intervalStartHandle () { // todo
        if (this.searchForm.billAmountStart > this.searchForm.billAmountEnd) {
          this.searchForm.billAmountEnd = null
        }
        if (this.searchForm.refund_amountStart > this.searchForm.refund_amountEnd) {
          this.searchForm.refund_amountEnd = null
        }
        if (this.searchForm.not_refund_amountStart > this.searchForm.not_refund_amountEnd) {
          this.searchForm.not_refund_amountEnd = null
        }
      }, // todo
      intervalEndHandle () {
        if (this.searchForm.billAmountStart && this.searchForm.billAmountStart > this.searchForm.billAmountEnd) {
          this.searchForm.billAmountEnd = this.searchForm.billAmountStart
        }
        if (this.searchForm.refund_amountStart && this.searchForm.refund_amountStart > this.searchForm.refund_amountEnd) {
          this.searchForm.refund_amountEnd = this.searchForm.refund_amountStart
        }
        if (this.searchForm.not_refund_amountStart && this.searchForm.not_refund_amountStart > this.searchForm.not_refund_amountEnd) {
          this.searchForm.not_refund_amountEnd = this.searchForm.not_refund_amountStart
        }
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) { // todo 未知属性名称
        this.searchForm.start = value[0] || ''
        this.searchForm.end = value[1] || ''
      },
    },
    created () {
      this.orderState = this.params.orderState
      this.orderSource = this.params.orderSource
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
