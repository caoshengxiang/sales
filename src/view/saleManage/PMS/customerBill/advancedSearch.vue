<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="业务编号：">
              <el-input type="text" v-model="searchForm.bizNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="上传人：">
              <el-input type="text" v-model="searchForm.uploadUserName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务管家：">
              <el-input type="text" v-model="searchForm.serviceManagerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账期年份：">
              <el-input type="text" v-model="searchForm.accountPeriodYear"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="账期月份：">
              <el-input type="text" v-model="searchForm.accountPeriodMonth"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="审核状态：">
              <el-select v-model="searchForm.auditState" placeholder="请选择审核状态">
                <el-option
                  v-for="(item, index) in auditStateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业务类型：">
              <el-select v-model="searchForm.bizType" placeholder="请选择业务类型">
                <el-option v-for="(item, index) in bizTypeList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="业务金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('startBizAmount', 'endBizAmount')" type="number"
                            v-model.number="searchForm.startBizAmount"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('startBizAmount', 'endBizAmount')" type="number"
                            v-model.number="searchForm.endBizAmount"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="票据数量：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('startBillNum', 'endBillNum')" type="number"
                            v-model.number="searchForm.startBillNum"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('startBillNum', 'endBillNum')" type="number"
                            v-model.number="searchForm.endBillNum"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
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
  import API from '../../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        searchForm: { // 表单
        },
        auditStateList: [{
          value: 1,
          label: '待审核'
        }, {
          value: 2,
          label: '已拒绝'
        }, {
          value: 3,
          label: '已通过'
        }],
        bizTypeList: [{
          value: 1,
          label: '收入'
        }, {
          value: 2,
          label: '支出'
        }, {
          value: 3,
          label: '其他'
        } ],
        timeInterval: [],
        timeInterval2: [],
      }
    },
    props: ['params'],
    methods: {
      clearForm () {
        this.searchForm = {}
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.searchForm.provinceId = value[0] || ''
        this.searchForm.cityId = value[1] || ''
        this.searchForm.areaId = value[2] || ''
        this.searchForm.provinceName = name[0] || ''
        this.searchForm.cityName = name[1] || ''
        this.searchForm.areaName = name[2] || ''
      },
      getCodeConfig () { // 配置接口
        API.baseSetting.getCodeConfig({type: 6}, (res) => { // 6 管家类型
          if (res.status) {
            this.managerTypeList = res.data
          }
        })
      },
      numberStartHandle (start, end) {
        if (this.searchForm[start] > this.searchForm[end]) {
          this.searchForm[end] = null
        }
      },
      numberEndHandle () {
        if (this.searchForm[start] && this.searchForm[start] >
          this.searchForm[end]) {
          this.searchForm[end] = this.searchForm[start]
        }
      },
      timeBillDateIntervalHandle (value, start, end) {
        this.searchForm[start] = value[0] || ''
        this.searchForm[end] = value[1] || ''
      },
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
      this.getCodeConfig()

      /* 日期 */
      if (this.searchForm.contractTimeStart) { // 日期
        this.timeInterval = [this.searchForm.contractTimeStart, this.searchForm.contractTimeEnd]
      }
      if (this.searchForm.createdStart) { // 日期
        this.timeInterval = [this.searchForm.createdStart, this.searchForm.createdEnd]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
