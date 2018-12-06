<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="100px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="回访单号：">
              <el-input type="text" v-model="searchForm.retVisitNum"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来自客户：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="来自订单：">
              <el-input type="text" v-model="searchForm.orderNum"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="回访人：">
              <el-input type="text" v-model="searchForm.cusServiceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="意见类型：">
              <el-input type="text" v-model="searchForm.suggestionType"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--筛选-->
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="回访类型：">
              <el-select v-model="searchForm.type" placeholder="请选择">
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
            <!--<el-form-item label="意见类型：">-->
              <!--<el-select v-model="searchForm.type" placeholder="请选择">-->
                <!--<el-option-->
                  <!--v-for="(item, index) in typeList"-->
                  <!--:key="index"-->
                  <!--:label="item.label"-->
                  <!--:value="item.value">-->
                <!--</el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="生成日期：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'buildTimeStart', 'buildTimeEnd')}"
                :unlink-panels="true"
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

  export default {
    name: 'advancedSearch',
    data () {
      return {
        searchForm: { // 表单
        },
        typeList: [{
          value: 1,
          label: '客户主动退单订单回访'
        }, {
          value: 2,
          label: '回款异常订单回访'
        }, {
          value: 3,
          label: 'A类产品续费异常订单回访'
        }, {
          value: 4,
          label: '非记账托管业务首次沟通订单回访'
        }, {
          value: 5,
          label: '外勤首次上门回访'
        }, {
          value: 6,
          label: '2-3星评价回访'
        }, {
          value: 7,
          label: '未评价订单回访'
        }, ],
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
      if (this.searchForm.buildTimeStart) { // 日期
        this.timeInterval = [this.searchForm.buildTimeStart, this.searchForm.buildTimeEnd]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
