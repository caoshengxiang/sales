<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog" style="padding: 20px 0;">
      <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm" label-width="0px"
               class="demo-ruleForm">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title">回访结果</td>
            <td>
              <el-form-item label="">
                <el-radio-group v-model="dialogRuleForm.resource">
                  <el-radio label="1">完成回访</el-radio>
                  <el-radio label="2">客户拒绝回访</el-radio>
                  <el-radio label="3">客户待再回访</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">回访内容</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">退单原因</label>
                  <el-checkbox-group v-model="dialogRuleForm.type">
                    <el-checkbox label="服务质量未达预期" name="1"></el-checkbox>
                    <el-checkbox label="企业跳单" name="2"></el-checkbox>
                    <el-checkbox label="企业注销" name="3"></el-checkbox>
                    <el-checkbox label="客户购买产品出现错误" name="4"></el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">原因描述</label>
                  <el-input style="margin-left: 8px;" type="textarea" v-model="dialogRuleForm.desc"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title">其他意见</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">意见类型</label>
                  <el-select v-model="dialogRuleForm.id" placeholder="请选择派单坐席客服">
                    <el-option v-for="item in commentsTypes" :key="item.id" :label="item.name"
                               :value="item.id"></el-option>
                  </el-select>
                </div>
                <div class="flex-line">
                  <label class="label-ti" style="margin-top: 10px;">意见描述</label>
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea" v-model="dialogRuleForm.desc"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('dialogRuleForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import { arrToStr } from '../../../../utils/utils'
  import webStorage from 'webStorage'

  export default {
    name: 'returnVisitDialog',
    data () {
      return {
        dataLoading: false,
        dialogRuleForm: {},
        currentUserId: '', // 当前登录用户id
        rules: {
          oldSalerId: [
            {required: true, message: '请选择待转移的销售', trigger: 'change'},
          ],
        },
        commentsTypes: [{
          type: 1,
          value: 'type1'
        }]
      }
    },
    props: ['params'],
    methods: {
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.customer.transfer(this.dialogRuleForm, (data) => {
              if (data.status) {
                if (data.data.fail > 0) {
                  this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
                } else {
                  this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                }
                setTimeout(() => {
                  this.dataLoading = false
                  this.$vDialog.close({type: 'save'})
                }, 500)
              } else {
                setTimeout(() => {
                  this.dataLoading = false
                }, 500)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getUserSearch () { //
        // API.user.userSubordinates({}, (data) => {
        //   this.salerList = data.data
        // })
      },
      getOldSalerList (customerId) { //
        // API.user.toTransferUserList({customerId: customerId}, (data) => {
        //   this.oldSalerList = data.data
        // })
      },
    },
    created () {
      this.getUserSearch()
      this.currentUserId = webStorage.getItem('userInfo').id
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .radio-group-item {
    margin-top: 10px;
  }

  .flex-line {
    display: flex;
    .label-ti {
      margin-right: 20px;
      width: 70px;
    }
  }
</style>
