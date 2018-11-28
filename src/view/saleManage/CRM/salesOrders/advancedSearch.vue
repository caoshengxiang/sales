<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="searchForm" ref="searchForm" label-width="120px">
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单编号：">
              <el-input type="text" v-model="searchForm.id"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客户名称：">
              <el-input type="text" v-model="searchForm.customerName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系人：">
              <el-input type="text" v-model="searchForm.contacterName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="购买商品：">
              <el-input type="text" v-model="searchForm.productName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="销售相关人员：">
              <el-input type="text" v-model="searchForm.salerRelName"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="el-row-cla">
          <el-col :span="8">
            <el-form-item label="订单状态：">
              <el-select v-model="searchForm.orderState" placeholder="请选择订单状态">
                <el-option v-for="item in orderState" :key="item.type" :label="item.value"
                           :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="订单来源：">
              <el-cascader
                style="width: 100%"
                :change-on-select="selectLastLevelMode"
                :options="orderSourceType"
                v-model="orderSourceArr"
                @active-item-change="orderSourceChangeHandle"
                @change="orderSourceChangeHandle"
                :props="props"
                :placeholder="searchForm.sourceName"
              >
              </el-cascader>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否续费：">
              <el-select v-model="searchForm.isRenew" placeholder="请选择是否续费">
                <el-option label="续费订单" :value="true"></el-option>
                <el-option label="新签订单" :value="false"></el-option>
              </el-select>
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
          <el-col :span="12">
            <el-form-item label="签单金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number"
                            v-model.number="searchForm.startBillAmount"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number"
                            v-model.number="searchForm.endBillAmount"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="回款金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number"
                            v-model.number="searchForm.startRefundAmount"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number"
                            v-model.number="searchForm.endRefundAmount"></el-input>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="待回款金额：">
              <el-row>
                <el-col :span="10">
                  <el-input @change="intervalStartHandle" type="number"
                            v-model.number="searchForm.startNotRefundAmount"></el-input>
                </el-col>
                <el-col :span="2">
                  <div style="text-align: center">-</div>
                </el-col>
                <el-col :span="10">
                  <el-input @change="intervalEndHandle" type="number"
                            v-model.number="searchForm.endNotRefundAmount"></el-input>
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
        orderState: [], // 订单状态
        orderSource: [], // 订单来源
        searchForm: { // 表单
          id: null,
          customerName: null,
          contacterName: null,
          productName: null,
          salerRelName: null,
          orderState: null,
          source: null,
          isRenew: null,
          startDate: null,
          endDate: null,
          startBillAmount: null, // 签单金额
          endBillAmount: null,
          startRefundAmount: null,
          endRefundAmount: null,
          startNotRefundAmount: null,
          endNotRefundAmount: null,
        },
        timeInterval: [],
        orderSourceType: [], // 客户来源
        orderSourceArr: [],
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
      lastMonthDate () {
        return lastMonthDate()
      },
      intervalStartHandle () {
        if (this.searchForm.startBillAmount > this.searchForm.endBillAmount) {
          this.searchForm.endBillAmount = null
        }
        if (this.searchForm.startRefundAmount > this.searchForm.endRefundAmount) {
          this.searchForm.endRefundAmount = null
        }
        if (this.searchForm.startNotRefundAmount > this.searchForm.endNotRefundAmount) {
          this.searchForm.endNotRefundAmount = null
        }
      },
      intervalEndHandle () {
        if (this.searchForm.startBillAmount && this.searchForm.startBillAmount > this.searchForm.endBillAmount) {
          this.searchForm.endBillAmount = this.searchForm.startBillAmount
        }
        if (this.searchForm.startRefundAmount && this.searchForm.startRefundAmount > this.searchForm.endRefundAmount) {
          this.searchForm.endRefundAmount = this.searchForm.startRefundAmount
        }
        if (this.searchForm.startNotRefundAmount && this.searchForm.startNotRefundAmount >
          this.searchForm.endNotRefundAmount) {
          this.searchForm.endNotRefundAmount = this.searchForm.startNotRefundAmount
        }
      },
      clearForm () {
        this.searchForm = {}
        this.timeInterval = []
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
          this.treeGetName(parseInt(item, 10), this.orderSourceType)
        })
        return this.sourceNameArr.join('-')
      },
      saveSubmitForm () {
        this.searchForm.sourceName = this.traverseTree(this.searchForm.orderSource)
        this.$vDialog.close({type: 'search', params: this.searchForm})
      },
      timeIntervalHandle (value) {
        this.searchForm.startDate = value[0] || ''
        this.searchForm.endDate = value[1] || ''
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
            if (this.orderSourceType.length === 0) {
              this.orderSourceType = arr
            } else {

            }
          }
        })
      },
      // orderSourceChange (va) {
      //   this.searchForm.orderSource = va.join('-')
      // },
      orderSourceChangeHandle (va) {
        this.getLastItem(this.orderSourceType, va, 'id')
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
        this.searchForm.orderSource = va.join('-')
      },
      getLastItem (list, vals, key) { // 获取点击得目标对象, key 对应得 值vals 数组
        let LIST = list || []
        // console.log(LIST, vals, key)
        for (let item of LIST) {
          if (item[key] === vals[vals.length - 1]) {
            this.targetObj = item
            break
          } else {
            this.getLastItem(item.children, vals, key)
          }
        }
      },
    },
    created () {
      this.orderState = this.params.orderState
      this.orderSource = this.params.orderSource
      // 来源
      this.getConfigData(5, 0)
      this.searchForm = this.params.preAdvancedSearch
      if (this.searchForm.startDate) { // 日期
        this.timeInterval = [this.searchForm.startDate, this.searchForm.endDate]
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
