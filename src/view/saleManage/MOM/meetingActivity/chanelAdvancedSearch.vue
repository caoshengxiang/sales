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
              <el-input type="text" v-model="searchForm.salerRelName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input type="text" v-model="searchForm.contacter"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话：">
              <el-input type="text" v-model="searchForm.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
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
              <el-cascader
                style="width: 100%"
                :change-on-select="selectLastLevelMode"
                :options="chanceSourceType"
                v-model="chanceSourceArr"
                @active-item-change="chanceSourceChangeHandle"
                @change="chanceSourceChangeHandle"
                :props="props"
                :placeholder="searchForm.sourceName"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item prop="provinceId" label="地区：">
              <AreaSelect ref="areaSe"
                          :area="(searchForm.provinceName?searchForm.provinceName:'') + ' ' + (searchForm.cityName?searchForm.cityName:'')  + ' ' + (searchForm.areaName?searchForm.areaName:'')"
                          @change="areaSelectedOptionsHandleChange"
                          :selectLastLevelMode="true"></AreaSelect>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="14">
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
        <el-row class="el-row-cla">
          <el-col :span="14">
            <el-form-item label="预计签单日期：">
              <el-date-picker
                v-model="timeInterval2"
                type="datetimerange"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="timeBillDateIntervalHandle"
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
            <el-form-item label="预计签单金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intentBillAmountStartHandle" type="number"
                            v-model.number="searchForm.startIntentBillAmount"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intentBillAmountEndHandle" type="number"
                            v-model.number="searchForm.endIntentBillAmount"></el-input>
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
  import { lastMonthDate } from '../../../../utils/utils'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        salesState: [], // 销售阶段
        demandSource: [], // 需求来源
        searchForm: { // 表单
          intentProductName: null,
          customerName: null,
          salerRelName: null,
          stage: null,
          source: null,
          startCreateDate: null,
          endCreateDate: null,
          startIntentBillAmount: null, // 签单金额
          endIntentBillAmount: null,
          startBillDate: null,
          endBillDate: null,
          contactPhone: null,
          contacter: null,
        },
        timeInterval: [],
        timeInterval2: [],
        chanceSourceType: [], // 客户来源
        chanceSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
        sourceNameArr: [],
      }
    },
    props: ['params'],
    methods: {
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.searchForm.provinceId = value[0] || ''
        this.searchForm.cityId = value[1] || ''
        this.searchForm.areaId = value[2] || ''
        this.searchForm.provinceName = name[0] || ''
        this.searchForm.cityName = name[1] || ''
        this.searchForm.areaName = name[2] || ''
      },
      lastMonthDate () {
        return lastMonthDate()
      },
      intentBillAmountStartHandle () {
        if (this.searchForm.startIntentBillAmount > this.searchForm.endIntentBillAmount) {
          this.searchForm.endIntentBillAmount = null
        }
      },
      intentBillAmountEndHandle () {
        if (this.searchForm.startIntentBillAmount && this.searchForm.startIntentBillAmount >
          this.searchForm.endIntentBillAmount) {
          this.searchForm.endIntentBillAmount = this.searchForm.startIntentBillAmount
        }
      },
      clearForm () {
        this.searchForm = {}
        this.timeInterval = []
        this.timeInterval2 = []
      },
      treeGetName (id, node) { // 遍历树获取名称
        if (!node) {
          return ''
        }
        if (node && node.length > 0) {
          var i = 0
          for (i = 0; i < node.length; i++) {
            if (id === node[i].id) {
              this.sourceNameArr.push(node[i].codeName)
              return node[i].codeName
            } else {
              this.treeGetName(id, node[i].children)
            }
          }
        }
      },
      traverseTree (source, node) { // 遍历树
        if (!source) {
          return
        }
        let sourceArr = source.split('-')
        this.sourceNameArr = [] // 初始
        sourceArr.forEach((item, index) => {
          this.treeGetName(parseInt(item, 10), this.chanceSourceType)
        })
        return this.sourceNameArr.join('-')
      },
      saveSubmitForm () {
        this.searchForm.sourceName = this.traverseTree(this.searchForm.chanceSource)
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) {
        this.searchForm.startCreateDate = value[0] || ''
        this.searchForm.endCreateDate = value[1] || ''
      },
      timeBillDateIntervalHandle (value) {
        this.searchForm.startBillDate = value[0] || ''
        this.searchForm.endBillDate = value[1] || ''
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, (data) => {
          if (type === 2) {
            this.levelList = data.data
          } else if (type === 3) {
            this.industryList = data.data
          } else if (type === 5) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            if (this.chanceSourceType.length === 0) {
              this.chanceSourceType = arr
            } else {

            }
          }
        })
      },
      // chanceSourceChange (va) {
      //   this.searchForm.chanceSource = va.join('-')
      // },
      chanceSourceChangeHandle (va) {
        this.getLastItem(this.chanceSourceType, va, 'id')
        API.common.codeConfig({type: 5, pCode: va[va.length - 1]}, (data) => {
          if (data.data.length) {
            let arr = data.data.map((item) => {
              item.children = []
              return item
            })
            this.targetObj.children = arr
          } else {
            this.targetObj.children = null
          }
        })
        this.searchForm.chanceSource = va.join('-')
      },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            // this.selectedBindValue.push(item[key])
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
    },
    created () {
      this.salesState = this.params.salesState
      this.demandSource = this.params.demandSource
      // 来源
      this.getConfigData(5, 0)
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.startCreateDate) { // 日期
        this.timeInterval = [this.searchForm.startCreateDate, this.searchForm.endCreateDate]
      }
      if (this.searchForm.startBillDate) { // 日期
        this.timeInterval2 = [this.searchForm.startBillDate, this.searchForm.endBillDate]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
