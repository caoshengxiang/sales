<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户联系人：">
              <el-input type="text" v-model="searchForm.contacterName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：">
              <el-input type="text" v-model="searchForm.phone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="公司职务：" prop="position">
              <el-select v-model="searchForm.position" placeholder="请选择公司职务">
                <el-option v-for="item in positionList" :key="item.id" :label="item.name"
                           :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户ID：">
              <el-input type="text" v-model="searchForm.customerId"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="状态：">
              <el-select v-model="searchForm.status" placeholder="请选择状态">
                <el-option v-for="item in contactsStatus" :key="item.type" :label="item.value"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="创建日期：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeIntervalHandle"
                :unlink-panels="true"
                :default-value="lastMonthDate()"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
  import { lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        contactsStatus: [], // 联系人状态
        searchForm: { // 表单
          customerName: null,
          contacterName: null,
          phone: null,
          position: null,
          status: null,
          startDate: null,
          endDate: null,
          customerId: null,
        },
        timeInterval: [],
        positionList: [],
      }
    },
    props: ['params'],
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      clearForm () {
        this.searchForm = {}
        this.timeInterval = []
      },
      saveSubmitForm () {
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
      },
    },
    created () {
      this.contactsStatus = this.params.contactsStatus
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.startDate) { // 日期
        this.timeInterval = [this.searchForm.startDate, this.searchForm.endDate]
      }
      let that = this
      API.common.listPost({deleted: false, status: true}, (data) => {
        console.log(data.data)
        that.positionList = data.data
      })
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
