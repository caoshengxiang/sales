<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="130px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="投诉单号：">
              <el-input type="text" v-model="searchForm.num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单单号：">
              <el-input type="text" v-model="searchForm.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input type="text" v-model="searchForm.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务商品：">
              <el-input type="text" v-model="searchForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="被投诉管家：">
              <el-input type="text" v-model="searchForm.managerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客服坐席：">
              <el-input type="text" v-model="searchForm.cusServiceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="一般投诉跟踪人：">
              <el-input type="text" v-model="searchForm.cusName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="升级投诉跟踪人：">
              <el-input type="text" v-model="searchForm.upgradeCusName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--筛选-->
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="投诉状态：">
              <el-select v-model="searchForm.state" placeholder="请选择投诉状态">
                <el-option
                  v-for="(item, index) in stateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="投诉类型：">
              <el-select v-model="searchForm.type" placeholder="请选择投诉类型">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务状态：">
              <el-select v-model="searchForm.orderState" placeholder="请选择服务状态">
                <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="责任认定：">
              <el-select v-model="searchForm.checkResult" placeholder="请选择认定">
                <el-option  label="有责任" value="1"></el-option>
                <el-option  label="无责任" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="一般投诉日期：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'complaintTimeStart', 'complaintTimeEnd')}"
                :unlink-panels="true"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="升级投诉日期：">
              <el-date-picker
                v-model="timeInterval2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'upgradeTimeStart', 'upgradeTimeEnd')}"
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
          checkResult: null,
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
      if (this.searchForm.complaintTimeStart) { // 日期
        this.timeInterval = [this.searchForm.complaintTimeStart, this.searchForm.complaintTimeEnd]
      }
      if (this.searchForm.upgradeTimeStart) { // 日期
        this.timeInterval2 = [this.searchForm.upgradeTimeStart, this.searchForm.upgradeTimeEnd]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
