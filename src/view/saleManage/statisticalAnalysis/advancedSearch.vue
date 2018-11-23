<template lang='pug'>
  div.com-dialog-container
    div.com-dialog
      el-form(:model="searchForm" ref="searchForm" label-width="120px")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(label="订单编号：")
              el-input(type="text" v-model="searchForm.orderSn" placeholder="订单编号")
          el-col(:span="8")
            el-form-item(label="客户名称：")
              el-input(type="text" v-model="searchForm.customerName" placeholder='客户名称')
          el-col(:span="8")
            el-form-item(label="联系电话：")
              el-input(type="text" v-model="searchForm.contactPhone" placeholder="联系电话")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(label="联系人：")
              el-input(type="text" v-model="searchForm.contacterName" placeholder="联系人")
          el-col(:span="8")
            el-form-item(label="购买商品：")
              el-input(type="text" v-model="searchForm.productName" placeholder="购买商品")
          el-col(:span="8")
            el-form-item(label="需求提供人：")
              el-input(type="text" v-model="searchForm.providerName" placeholder="需求提供人")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(label="订单创建人：")
              el-input(type="text" v-model="searchForm.creatorName" placeholder="订单创建人")
          el-col(:span="8")
            el-form-item(label="销售员：")
              el-input(type="text" v-model="searchForm.salerName" placeholder="销售员")
          el-col(:span="8")
            el-form-item(label="咨询师：")
              el-input(type="text" v-model="searchForm.counselorName" placeholder="咨询师")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(prop="provinceId" label="所属区域：")
              AreaSelect(ref="areaSe" area="所属区域" @change="areaSelectedOptionsHandleChange" :selectLastLevelMode="true")
          el-col(:span="8")
            el-form-item(label="所属行业：")
              el-select(v-model="searchForm.industry" clearable placeholder="请选择所属行业")
                el-option(v-for="(item, index) in industryList" :key="index" :label="item.codeName" :value="item.codeName")
          el-col(:span="8")
            el-form-item(label="商品类型：")
              el-select(v-model="searchForm.billingType" clearable placeholder="请选择商品类型")
                el-option(v-for="item in salesState" :key="item.type" :label="item.value" :value="item.type")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(label="签单类型：")
              el-select(v-model="searchForm.orderType" clearable placeholder="请选择签单类型")
                el-option(v-for="item in billState" :key="item.type" :label="item.value" :value="item.type")
          el-col(:span="8")
            el-form-item(label="是否续费：")
              el-select(v-model="searchForm.isRenew" clearable placeholder="请选择是否续费")
                el-option(v-for="item in renewState" :key="item.value" :label="item.label" :value="item.value")
          el-col(:span="8")
            el-form-item(label="订单状态：")
              el-select(v-model="searchForm.orderState" clearable placeholder="请选择订单状态")
                el-option(v-for="item in orderState" :key="item.type" :label="item.value" :value="item.type")
        el-row.el-row-cla
          el-col(:span="8")
            el-form-item(label="订单推荐来源：")
              el-cascader(style="width: 100%" clearable :change-on-select="selectLastLevelMode" :options="chanceSourceType" v-model="chanceSourceArr" @active-item-change="chanceSourceChangeHandle" @change="chanceSourceChangeHandle" :props="props" :placeholder="searchForm.source_name")
        el-row.el-row-cla
          el-col(:span="12")
            el-form-item(label="服务年度：")
              el-row
                el-col(:span="8")
                  el-input(@change="intentServerYearStartHandle" type="number" placeholder="年度开始" v-model.number="searchForm.startServiceYear")
                el-col(:span="2")
                  div(style="text-align: center") -
                el-col(:span="8")
                  el-input(@change="intentServerYearEndHandle" type="number" placeholder="年度结束" v-model.number="searchForm.endServiceYear")
          el-col(:span="12")
            el-form-item(label="付费次数：")
              el-row
                el-col(:span="8")
                  el-input(@change="intentPayNumStartHandle" type="number" placeholder="次数开始" v-model.number="searchForm.startPayNum")
                el-col(:span="2")
                  div(style="text-align: center") -
                el-col(:span="8")
                  el-input(@change="intentPayNumEndHandle" type="number" placeholder="次数结束" v-model.number="searchForm.endPayNum")
        el-row.el-row-cla
          el-col(:span="12")
            el-form-item(label="定价金额：")
              el-row
                el-col(:span="8")
                  el-input(@change="intentPosMoneyStartHandle" type="number" placeholder="定价开始" v-model.number="searchForm.startPriceAmount")
                el-col(:span="2")
                  div(style="text-align: center") -
                el-col(:span="8")
                  el-input(@change="intentPosMoneyEndHandle" type="number" placeholder="定价结束" v-model.number="searchForm.endPriceAmount")
          el-col(:span="12")
            el-form-item(label="签单金额：")
              el-row
                el-col(:span="8")
                  el-input(@change="intentBillMoneyStartHandle" type="number" placeholder="金额开始" v-model.number="searchForm.startBillAmount")
                el-col(:span="2")
                  div(style="text-align: center") -
                el-col(:span="8")
                  el-input(@change="intentBillMoneyEndHandle" type="number" placeholder="金额结束" v-model.number="searchForm.endBillAmount")
        el-row(class="el-row-cla")
          el-col(:span="12")
            el-form-item(label="待回款金额：")
              el-row
                el-col(:span="8")
                  el-input(@change="intentReturnMoneyStartHandle" type="number" placeholder="金额开始" v-model.number="searchForm.startNoReceivedAmount")
                el-col(:span="2")
                  div(style="text-align: center") -
                el-col(:span="8")
                  el-input(@change="intentReturnMoneyEndHandle" type="number" placeholder="金额结束" v-model.number="searchForm.endNoReceivedAmount")
        el-row.el-row-cla
          el-col(:span="14")
            el-form-item(label="订单创建日期：")
              el-date-picker(v-model="timeInterval" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" @change="timeIntervalHandle" :unlink-panels="true" :default-value="lastMonthDate()" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期")
        el-row.el-row-cla
          el-col(:span="14")
            el-form-item(label="需求来源日期：")
              el-date-picker(v-model="timeInterval2" type="datetimerange" value-format="yyyy-MM-dd HH:mm:ss" @change="timeBillDateIntervalHandle" :unlink-panels="true" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期")
      div.dialog-footer(slot="footer")
        el-button.cancel-button(@click="$vDialog.close({type: 'cancel'})") 取 消
        el-button.cancel-button(@click="clearForm") 清 除
        el-button.save-button(@click="saveSubmitForm") 确 定
</template>

<script>
  import API from '../../../utils/api'
  import { lastMonthDate } from '../../../utils/utils'

  export default {
    name: 'advancedSearch',
    data () {
      return {
        salesState: [],                   // 商品类型集合
        billState: [],                    //签单类型集合
        industryList: [],                 //所属行业集合
        renewState: [
          {value: '是', label: '是'},
          {value: '否', label: '否'}
        ],                                //是否续费集合
        orderState: [],                   //订单状态集合

        billingType: null,               //选择的商品类型
        orderType: null,                 //选择的签单类型
        isRenew: null,                   //选择的是否续费
        orderState: null,                //选择的订单状态

        demandSource: [],                 // 需求来源

        searchForm: {                     // 表单
          orderSn: null,                 //订单编号
          customerName: null,            //客户名称
          contactPhone: null,            //联系电话
          contacterName: null,           //联系人
          productName: null,             //购买商品
          industry: null,                 //选择的所属行业
          providerName: null,            //需求提供人
          creatorName: null,             //订单创建人
          salerName: null,               //销售员
          counselorName: null,           //咨询师
          startServiceYear: null,       //服务年度开始
          endServiceYear: null,         //服务年度结束
          startPayNum: null,            //付费次数开始
          endPayNum: null,              //付费次数结束
          startPriceAmount: null,       //定价金额开始
          endPriceAmount: null,         //定价金额结束
          startBillAmount: null,        //签单金额开始
          endBillAmount: null,          //签单金额结束
          startNoReceivedAmount: null, //待回款金额开始
          endNoReceivedAmount: null,   //待回款金额结束
          salerRelName: null,
          source: null,
          startCreated: null,            //开始订单创建日期
          endCreated: null,              //结束订单创建日期
          startChanceSourceDate: null, //开始订单来源日期
          endChanceSourceDate: null,   //结束订单来源日期
        },
        timeInterval: [],
        timeInterval2: [],
        chanceSourceType: [],              //订单推荐来源
        chanceSourceArr: [],
        props: {
          value: 'id',
          label: 'codeName',
        },
        targetObj: null,
        // selectedBindValue: [],
        selectLastLevelMode: true,
        selectIdyMode: true,
        sourceNameArr: [],
      }
    },
    props: ['params'],
    methods: {
      // 选择所属地区
      areaSelectedOptionsHandleChange (value) {
        let name = this.$refs.areaSe.getSelectedName(value)
        this.searchForm.provinceId = value[0] || ''          //省id
        this.searchForm.cityId = value[1] || ''              //市id
        this.searchForm.areaId = value[2] || ''              //区县id
        this.searchForm.provinceName = name[0] || ''         //省名称
        this.searchForm.cityName = name[1] || ''             //市名称
        this.searchForm.areaName = name[2] || ''             //区县名称
      },
      lastMonthDate () {
        return lastMonthDate()
      },
      // 服务年度开始
      intentServerYearStartHandle() {
        if (this.searchForm.startServiceYear > this.searchForm.endServiceYear && this.searchForm.endServiceYear) {
          this.searchForm.startServiceYear = null
        }
      },
      // 服务年度结束
      intentServerYearEndHandle () {
        if (this.searchForm.startServiceYear && this.searchForm.startServiceYear >
          this.searchForm.endServiceYear) {
          this.searchForm.endServiceYear = this.searchForm.startServiceYear
        }
      },
      // 付费次数开始
      intentPayNumStartHandle() {
        if (this.searchForm.startPayNum > this.searchForm.endPayNum && this.searchForm.endPayNum) {
          this.searchForm.startPayNum = null
        }
      },
      // 付费次数结束
      intentPayNumEndHandle () {
        if (this.searchForm.startPayNum && this.searchForm.startPayNum >
          this.searchForm.endPayNum) {
          this.searchForm.endPayNum = this.searchForm.startPayNum
        }
      },
      // 定价金额开始
      intentPosMoneyStartHandle() {
        if (this.searchForm.startPriceAmount > this.searchForm.endPriceAmount && this.searchForm.endPriceAmount) {
          this.searchForm.startPriceAmount = null
        }
      },
      // 定价金额结束
      intentPosMoneyEndHandle () {
        if (this.searchForm.startPriceAmount && this.searchForm.startPriceAmount >
          this.searchForm.endPriceAmount) {
          this.searchForm.endPriceAmount = this.searchForm.startPriceAmount
        }
      },
      // 签单金额开始
      intentBillMoneyStartHandle() {
        if (this.searchForm.startBillAmount > this.searchForm.endBillAmount && this.searchForm.endBillAmount) {
          this.searchForm.startBillAmount = null
        }
      },
      // 定价金额结束
      intentBillMoneyEndHandle () {
        if (this.searchForm.startBillAmount && this.searchForm.startBillAmount >
          this.searchForm.endBillAmount) {
          this.searchForm.endBillAmount = this.searchForm.startBillAmount
        }
      },
      // 待回款金额开始
      intentReturnMoneyStartHandle() {
        if (this.searchForm.startNoReceivedAmount > this.searchForm.endNoReceivedAmount && this.searchForm.endNoReceivedAmount) {
          this.searchForm.startNoReceivedAmount = null
        }
      },
      // 待回款金额结束
      intentReturnMoneyEndHandle () {
        if (this.searchForm.startNoReceivedAmount && this.searchForm.startNoReceivedAmount >
          this.searchForm.endNoReceivedAmount) {
          this.searchForm.endNoReceivedAmount = this.searchForm.startNoReceivedAmount
        }
      },
      // 清楚显示数据
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
      traverseTree (source, node) {         // 遍历树
        if (!source) {
          return
        }
        let sourceArr = source.split('-')
        this.sourceNameArr = []             // 初始
        sourceArr.forEach((item, index) => {
          this.treeGetName(parseInt(item, 10), this.chanceSourceType)
        })
        return this.sourceNameArr.join('-')
      },
      saveSubmitForm () {
        this.searchForm.source_name = this.traverseTree(this.searchForm.chanceSource)
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) {
        this.searchForm.startCreated = value[0] || ''
        this.searchForm.endCreated = value[1] || ''
      },
      timeBillDateIntervalHandle (value) {
        this.searchForm.startChanceSourceDate = value[0] || ''
        this.searchForm.endChanceSourceDate = value[1] || ''
      },
      getConfigData (type, pCode) {
        API.common.codeConfig({type: type, pCode: pCode}, ({data}) => {
          if (type === 2) {
            this.levelList = data
          } else if (type === 3) {          //所属行业
            this.industryList = data
          } else if (type === 5) {
            let arr = data.map((item) => {
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
      this.salesState = this.params.productClass             //初始化商品类型
      this.billState = this.params.salesState                //初始化签单类型
      // this.renewState = this.params.renewState            //初始化是否续费
      this.orderState = this.params.orderState               //初始化订单状态
      this.demandSource = this.params.demandSource

      // 来源
      this.getConfigData(5, 0)
      // 所属行业
      this.getConfigData(3)
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.startCreated) { // 日期
        this.timeInterval = [this.searchForm.startCreated, this.searchForm.endCreated]
      }
      if (this.searchForm.startChanceSourceDate) { // 日期
        this.timeInterval2 = [this.searchForm.startChanceSourceDate, this.searchForm.endChanceSourceDate]
      }
    },
    mounted () {
      this.clearForm();
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
