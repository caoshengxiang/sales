<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="110px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单单号：">
              <el-input type="text" v-model="searchForm.orderId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务管家：">
              <el-input type="text" v-model="searchForm.managerTypeName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务客户：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户联系人：">
              <el-input type="text" v-model="searchForm.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务商品：">
              <el-input type="text" v-model="searchForm.goodsName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约主体：">
              <el-input type="text" v-model="searchForm.contractSubject"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!--筛选-->
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="派单状态：">
              <el-select v-model="searchForm.assignState" placeholder="请选择">
                <el-option
                  v-for="(item, index) in assignStateList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select v-model="searchForm.orderState" placeholder="请选择">
                <el-option v-for="(item, index) in orderStateList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="评价状态：">
              <el-select v-model="searchForm.reviewState" placeholder="请选择评">
                <el-option v-for="(item, index) in reviewStateList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="服务地区：">
              <AreaSelect ref="areaSe"
                          :area="(searchForm.provinceName?searchForm.provinceName:'') + ' ' + (searchForm.cityName?searchForm.cityName:'')  + ' ' + (searchForm.areaName?searchForm.areaName:'')"
                          @change="areaSelectedOptionsHandleChange"
                          :selectLastLevelMode="true"></AreaSelect>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="签约性质：">
              <el-select v-model="searchForm.contractProperty" placeholder="请选择">
                <el-option v-for="(item, index) in contractPropertyList" :key="index" :label="item.label"
                           :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--范围-->
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="签约金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="numberStartHandle('contractAccountStart', 'contractAccountEnd')" type="number"
                            v-model.number="searchForm.contractAccountStart"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="numberEndHandle('contractAccountStart', 'contractAccountEnd')" type="number"
                            v-model.number="searchForm.contractAccountEnd"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="签约时间：">
              <el-date-picker
                v-model="timeInterval"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'contractTimeStart', 'contractTimeEnd')}"
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
            <el-form-item label="生成服务时间：">
              <el-date-picker
                v-model="timeInterval2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="(value) => {this.timeBillDateIntervalHandle(value, 'createdStart', 'createdEnd')}"
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
        assignStateList: [{
          value: 1,
          label: '待派单'
        }, {
          value: 2,
          label: '待部分派单'
        }, {
          value: 3,
          label: '已派单'
        }, {
          value: 4,
          label: '已接单'
        }, ],
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
        }, ],
        reviewStateList: [{
          value: 1,
          label: '未评价'
        }, {
          value: 2,
          label: '已评价'
        } ],
        contractPropertyList: [{
          value: 1,
          label: '新签订单'
        }, {
          value: 2,
          label: '续费订单'
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
