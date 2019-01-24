<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="150px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="服务客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="上传票据资料数量：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('billNumStart', 'billNumEnd')" type="number"
                            v-model.number="searchForm.billNumStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('billNumStart', 'billNumEnd')" type="number"
                            v-model.number="searchForm.billNumEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="通过数量：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('validBillNumStart', 'validBillNumEnd')" type="number"
                            v-model.number="searchForm.validBillNumStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('validBillNumStart', 'validBillNumEnd')" type="number"
                            v-model.number="searchForm.validBillNumEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="未通过数量：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('invalidBillNumStart', 'invalidBillNumEnd')" type="number"
                            v-model.number="searchForm.invalidBillNumStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('invalidBillNumStart', 'invalidBillNumEnd')" type="number"
                            v-model.number="searchForm.invalidBillNumEnd"></el-input>
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
        stateList: [{
          value: 1,
          label: '待派单'
        }, {
          value: 2,
          label: '跟进中'
        }, {
          value: 3,
          label: '待处理'
        }, {
          value: 4,
          label: '待回访'
        }, {
          value: 5,
          label: '升级跟进中'
        }, {
          value: 6,
          label: '升级待处理'
        }, {
          value: 7,
          label: '已完成'
        }, ],
        typeList: [{
          value: 1,
          label: '一般投诉'
        }, {
          value: 2,
          label: '升级投诉'
        }],
        orderStateList: [{
          value: 1,
          label: '待服务'
        }, {
          value: 2,
          label: '服务中'
        }, {
          value: 3,
          label: '已完成'
        }, {
          value: 4,
          label: '已退单'
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
