<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-table
        ref="multipleTable"
        :data="orderList"
        border
        tooltip-effect="dark"
        style="width: 100%;margin-bottom: 30px;"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="订单编号"
          prop="id"
          width="180">
          <template slot-scope="scope">{{ scope.row.id + '-' + scope.row.orderId }}</template>
        </el-table-column>
        <el-table-column
          prop="isRenew"
          label="是否续费"
          width="120">
          <template slot-scope="scope">{{ scope.row.isRenew?'续费订单':'新签订单'}}</template>
        </el-table-column>
        <el-table-column
          prop="orderState"
          label="订单状态"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-for="os in orderState" :key="os.type"
                  v-if="scope.row.orderState === os.type">{{os.value}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="购买商品"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="billAmount"
          label="订单金额"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="contacterName"
          label="联系人"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="address"
          label="创建时间"
          show-overflow-tooltip>
          <template slot-scope="scope">{{scope.row.created && $moment(scope.row.created).format('YYYY-MM-DD HH:mm:ss')}}
          </template>
        </el-table-column>
      </el-table>
      <el-form :model="addForm" ref="addForm" label-width="250px" :rules="rules">
        <el-form-item prop="" label="请点击该订单联系人获取手机验证码">
          <div v-if="multipleSelection[0]">
            {{multipleSelection[0].contacterName}}[{{multipleSelection[0].contacterPhone}}]
            <span class="code" v-if="time === 0" @click="getCode">获取验证码</span>
            <span class="code time" v-else>重新发送({{time}})</span>
          </div>
          <label v-else style="color: #ccc;">请选择一个订单</label>
        </el-form-item>
        <el-form-item prop="authCode" label="请输入客户联系人所获取的的验证码" style="margin-top: 20px;">
          <el-input style="width: 200px;" type="age" v-model.number="addForm.authCode"
                    placeholder="请输入短信验证码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button :disabled="multipleSelection.length===1?false:true" class="save-button"
                   @click="saveSubmitForm('addForm')">确 定
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../utils/api'
  // import { arrToStr } from '../../../utils/utils'

  export default {
    name: 'order',
    data () {
      return {
        dataLoading: false, // loading
        salesOpportunitiesDetail: {},
        orderList: [],
        orderTotal: 0,
        addForm: { // 添加表单
          salerOrderId: '',
          mobilePhone: '',
          authCode: '',
        },
        time: 0,
        timer: '',
        rules: {
          authCode: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'},
            {type: 'number', message: '验证码必须为数字值'},
          ],
        },
        multipleSelection: [],
        orderState: [],
      }
    },
    props: ['params'],
    methods: {
      handleSelectionChange (val) {
        this.multipleSelection = val
        // let ids = arrToStr(val, 'id')
        this.addForm.salerOrderId = val[0].id
        this.addForm.mobilePhone = val[0].contacterPhone
      },
      getAppOrderList (id) {
        API.salesOrder.list({chanceId: id, pageSize: 1000000}, (da) => {
          if (da.status) {
            this.orderList = da.data.content.filter(item => {
              return item.orderState === 0 // 只显示预下单得数据
            })
            this.orderTotal = da.data.totalElements
          }
        })
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.salesOrder.appOrder(this.addForm, (da) => {
              setTimeout(() => {
                this.dataLoading = false
                if (da.status) {
                  this.$message.success('APP下单成功成功')
                  this.$vDialog.close({type: 'save'})
                }
              }, 500)
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCode () {
        if (this.addForm.mobilePhone) {
          API.user.userAuthcode({mobile: this.addForm.mobilePhone}, (da) => {
            if (da.data > 0) {
              this.time = 60
              this.timer = setInterval(() => {
                this.time--
                if (this.time <= 0) {
                  clearInterval(this.timer)
                  this.time = 0
                }
              }, 1000)
            }
          })
        } else {
          this.$message.warning('电话不存在！')
        }
      },
    },
    created () {
      if (this.params.salesOpportunitiesDetail) {
        this.salesOpportunitiesDetail = this.params.salesOpportunitiesDetail
        this.orderState = this.params.orderState
        this.getAppOrderList(this.salesOpportunitiesDetail.id)
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }

  .dialog-footer {
    margin-top: 30px;
  }

  .code {
    color: #1E88E5;
    cursor: pointer;
    font-size: 12px;
    border: 1px solid #1E88E5;
    padding: 3px 5px;
    border-radius: 5px;
    &.time {
      cursor: auto;
    }
  }
</style>
