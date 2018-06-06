<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="意向商品：">
              <el-input type="text" v-model="searchForm.intentProductName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <!--去除了联系人-->
          <el-col :span="8">
            <el-form-item label="销售相关人员：">
              <el-input type="text" v-model="searchForm.team"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row class="el-row-cla">-->
        <!--<el-col :span="8">-->
        <!--<el-form-item label="联系人：">-->
        <!--<el-input type="text" v-model="searchForm.contacterName"></el-input>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--</el-row>-->
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="销售阶段：">
              <el-select v-model="searchForm.stage" placeholder="请选择销售阶段">
                <el-option v-for="item in salesState" :key="item.type" :label="item.value + ' ' + item.percent"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="需求来源：">
              <el-select v-model="searchForm.source" placeholder="请选择需求来源">
                <el-option v-for="item in demandSource" :key="item.type" :label="item.value"
                           :value="item.type"></el-option>
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
          <el-col :span="14">
            <el-form-item label="预计签单金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intentBillAmountStartHandle" type="number" v-model.number="searchForm.intentBillAmountStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intentBillAmountEndHandle" type="number" v-model.number="searchForm.intentBillAmountEnd"></el-input>
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
        salesState: [], // 销售阶段
        demandSource: [], // 需求来源
        searchForm: { // 表单
          intentProductName: null,
          customerName: null,
          team: null, // todo 未知
          stage: null,
          source: null,
          start: null,
          end: null,
          intentBillAmountStart: null, // 签单金额，todo 未知
          intentBillAmountEnd: null,
        },
        timeInterval: '',
      }
    },
    props: ['params'],
    methods: {
      intentBillAmountStartHandle () {
        if (this.searchForm.intentBillAmountStart > this.searchForm.intentBillAmountEnd) {
          this.searchForm.intentBillAmountEnd = null
        }
      }, // todo
      intentBillAmountEndHandle () {
        if (this.searchForm.intentBillAmountStart && this.searchForm.intentBillAmountStart > this.searchForm.intentBillAmountEnd) {
          this.searchForm.intentBillAmountEnd = this.searchForm.intentBillAmountStart
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
      this.salesState = this.params.salesState
      this.demandSource = this.params.demandSource
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
