<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="110px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="回访单号：">
              <el-input type="text" v-model="searchForm.num"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回访客户：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户联系人：">
              <el-input type="text" v-model="searchForm.contactName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单单号：">
              <el-input type="text" v-model="searchForm.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务商品：">
              <el-input type="text" v-model="searchForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="8">-->
            <!--<el-form-item label="服务管家：">-->
              <!--<el-input type="text" v-model="searchForm.serviceManagerNames"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="8">
            <el-form-item label="回访客服：">
              <el-input type="text" v-model="searchForm.cusserviceName"></el-input>
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
          <el-col :span="8">
            <el-form-item label="回访状态：">
              <el-select v-model="searchForm.state" placeholder="请选择">
                <el-option v-for="(item, index) in stateList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原评价星级：">
              <el-select v-model="searchForm.reviewScore" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="0星" :value="0"></el-option>
                <el-option label="1星" :value="1"></el-option>
                <el-option label="2星" :value="2"></el-option>
                <el-option label="3星" :value="3"></el-option>
                <el-option label="4星" :value="4"></el-option>
                <el-option label="5星" :value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="16">
            <el-form-item label="回访派单时间：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'assginStartTime', 'assginEndTime')}"
                :unlink-panels="true"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="回访评价：">
              <el-select v-model="searchForm.retEvaluation" placeholder="请选择">
                <el-option label="全部" :value="null"></el-option>
                <el-option label="0星" :value="0"></el-option>
                <el-option label="1星" :value="1"></el-option>
                <el-option label="2星" :value="2"></el-option>
                <el-option label="3星" :value="3"></el-option>
                <el-option label="4星" :value="4"></el-option>
                <el-option label="5星" :value="5"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="24">
            <el-form-item label="服务管家：">
              <el-select
                v-model="managerIdList"
                filterable
                multiple
                :multiple-limit="5"
                placeholder="请选择服务管家, 可多选, 数量<=5"
                style="width: 100%"
              >
                <el-option v-for="item in managerList" :key="item.userId" :label="item.name" :value="item.userId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row v-if="searchForm.state === 3 && searchForm.type === 5" class="el-row-cla">
          <el-col :span="24">
            <el-form-item label="是否指导安装并使用APP：">
              <el-select v-model="searchForm.reasonType" placeholder="请选择" style="width: 100%">
                <el-option label="是" :value="30"></el-option>
                <el-option label="否" :value="31"></el-option>
              </el-select>
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
        managerList: [],
        managerIdList: [],
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
        stateList: [{
          value: 1,
          label: '待派单'
        }, {
          value: 2,
          label: '待回访'
        }, {
          value: 3,
          label: '已回访'
        }, {
          value: 4,
          label: '拒绝回访'
        }, {
          value: 5,
          label: '待再回访'
        }],
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
        this.searchForm.managerIds = this.managerIdList.join(',')
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
      getmanagerList () { // 获取管家
        API.baseSetting.getManagerList({}, (res) => { // 6 管家类型
          if (res.status) {
            this.managerList = res.data
          }
        })
      },
    },
    created () {
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.managerIds) {
        this.managerIdList = this.searchForm.managerIds.split(',').map(Number)
      }
      this.getCodeConfig()
      this.getmanagerList()
      /* 日期 */
      if (this.searchForm.assginStartTime) { // 日期
        this.timeInterval = [this.searchForm.assginStartTime, this.searchForm.assginEndTime]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
