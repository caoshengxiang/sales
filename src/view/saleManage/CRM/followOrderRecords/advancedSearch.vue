<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="4">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName" placeholder="客户名称"></el-input>
            </el-form-item>
          </el-col>
          <!--去除了联系人-->
          <el-col :span="4">
            <el-form-item label="发布人：">
              <el-input type="text" v-model="searchForm.creatorName" placeholder="发布人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="客户ID：">
              <el-input type="text" v-model="searchForm.customerId" placeholder="客户ID"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="销售阶段：">
              <el-select v-model="searchForm.stage" placeholder="请选择销售阶段">
                <el-option v-for="item in salesState" :key="item.type" :label="item.value"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
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
        <!-- <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button> -->
        <el-button class="cancel-button" @click="clearForm">重 置</el-button>
        <el-button class="save-button" @click="saveSubmitForm">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import API from '../../../utils/api'
  import { lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        // salesState: [], // 销售阶段
        searchForm: { // 表单
          customerName: null,
          creatorName: null,
          stage: null,
          startDate: null,
          endDate: null,
          customerId: null,
        },
        timeInterval: [],
      }
    },
    // props: ['params'],
    props: {
      salesState: '',
      preAdvancedSearch: {},
    },
    methods: {
      lastMonthDate () {
        return lastMonthDate()
      },
      clearForm () {
        this.searchForm = {}
        this.timeInterval = []
      },
      saveSubmitForm () {
        // this.$vDialog.close({type: 'search', params: this.searchForm})
        this.$emit('subAdvanced', this.searchForm);
      },
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
      },
    },
    created () {
      this.salesState = this.salesState
      this.searchForm = this.preAdvancedSearch
      if (this.searchForm.startDate) { // 日期
        this.timeInterval = [this.searchForm.startDate, this.searchForm.endDate]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
    .dialog-footer {
      margin-top: 15px !important;
    }
</style>
