<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="250px" :rules="rules">
        <el-form-item prop="" label="请点击该订单联系人获取手机验证码">
          {{addForm.contracterName}}[12345678912]
          <span class="code" v-if="time === 0" @click="getCode">获取验证码</span>
          <span class="code time" v-else>重新发送({{time}})</span>
        </el-form-item>
        <el-form-item prop="authCode" label="请输入客户联系人所获取的的验证码" style="margin-top: 20px;">
          <el-input type="age" v-model="addForm.authCode" placeholder="请输入短信验证码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="$vDialog.close({type: 'cancel'})">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // import { mapState } from 'vuex'
  import API from '../../../../utils/api'

  export default {
    name: 'order',
    data () {
      return {
        dataLoading: false, // loading
        addForm: { // 添加表单
          salerOrderId: '',
          authCode: '',
        },
        time: 0,
        timer: '',
        rules: {
          authCode: [
            {required: true, message: '请输入短信验证码', trigger: 'blur'},
            // {type: 'number', message: '验证码必须为数字值'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
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
        this.time = 60
        this.timer = setInterval(() => {
          this.time--
          if (this.time <= 0) {
            clearInterval(this.timer)
            this.time = 0
          }
        }, 1000)
      },
    },
    created () {
      if (this.params.orderDetail) {
        this.addForm.salerOrderId = this.params.orderDetail.id
      }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

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
    padding: 0px 5px;
    border-radius: 5px;
    display: inline-block;
    &.time {
      cursor: auto;
    }
  }
</style>
