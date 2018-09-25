<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="活动名称：">
              <el-input type="text" v-model="searchForm.meetingName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="主办单位：">
              <el-input type="text" v-model="searchForm.hostUnit"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协办单位：">
              <el-input type="text" v-model="searchForm.coOrganizer"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="承办单位：">
              <el-input type="text" v-model="searchForm.organizer"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责部门：">
              <el-input type="text" v-model="searchForm.meetingCreatorDepartmentName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="负责人：">
              <el-input type="text" v-model="searchForm.meetingCreatorName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="活动地址：">
              <el-input type="text" v-model="searchForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-form-item label="活动经费：">
            <el-row>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(0, 'meetingMoneyStart', 'meetingMoneyEnd')" type="number"
                          v-model.number="searchForm.meetingMoneyStart"></el-input>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center">-</div>
              </el-col>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(1, 'meetingMoneyStart', 'meetingMoneyEnd')" type="number"
                          v-model.number="searchForm.meetingMoneyEnd"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row class="el-row-cla">
          <el-form-item label="活动人数：">
            <el-row>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(0, 'personCountStart', 'personCountEnd')" type="number"
                          v-model.number="searchForm.personCountStart"></el-input>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center">-</div>
              </el-col>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(1, 'personCountStart', 'personCountEnd')" type="number"
                          v-model.number="searchForm.personCountEnd"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row class="el-row-cla">
          <el-form-item label="意向客户数：">
            <el-row>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(0, 'intentCustomerCountStart', 'intentCustomerCountEnd')" type="number"
                          v-model.number="searchForm.intentCustomerCountStart"></el-input>
              </el-col>
              <el-col :span="2">
                <div style="text-align: center">-</div>
              </el-col>
              <el-col :span="6">
                <el-input @change="numberIntervalHandle(1, 'intentCustomerCountStart', 'intentCustomerCountEnd')" type="number"
                          v-model.number="searchForm.intentCustomerCountEnd"></el-input>
              </el-col>
            </el-row>
          </el-form-item>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="16">
            <el-form-item label="活动时间：">
              <el-form-item prop="meetingTimeStart">
                <el-date-picker
                  v-model="meetingTimeInterval"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  @change="timeIntervalHandle"
                  :unlink-panels="true"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
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
  // import API from '../../../utils/api'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        contactsStatus: [], // 联系人状态
        searchForm: { // 表单
          meetingName: '',
          coOrganizer: '',
          hostUnit: '',
          organizer: '',
          meetingCreatorDepartmentName: '',
          meetingCreatorName: '',
          address: '',
          meetingTimeStart2: '', // 活动开始时间
          meetingTimeEnd2: '',
          meetingMoneyStart: '', // 最小经费
          meetingMoneyEnd: '',
          personCountStart: '', // 最小活动人数
          personCountEnd: '',
          intentCustomerCountStart: '', // 最小意向客户数
          intentCustomerCountEnd: '',
        },
        meetingTimeInterval: [],
      }
    },
    props: ['params'],
    methods: {
      clearForm () {
        this.searchForm = {}
        this.meetingTimeInterval = []
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) {
        this.searchForm.meetingTimeStart2 = value[0] || ''
        this.searchForm.meetingTimeEnd2 = value[1] || ''
      },
      numberIntervalHandle (type, start, end) {
        if (type === 0) {
          if (this.searchForm[start] > this.searchForm[end]) {
            this.searchForm[end] = null
          }
        } else {
          if (this.searchForm[start] && this.searchForm[start] >
            this.searchForm[end]) {
            this.searchForm[end] = this.searchForm[start]
          }
        }
      },
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.meetingTimeStart2) { // 日期
        this.meetingTimeInterval = [this.searchForm.meetingTimeStart2, this.searchForm.meetingTimeEnd2]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
