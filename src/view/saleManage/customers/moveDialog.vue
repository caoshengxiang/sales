<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="180px"
               class="demo-ruleForm">
        <el-form-item label-width="14px">
            <span style="color: #ccc;">备注：仅部门负责人有权限转移本部门的客户</span>
        </el-form-item>
        <el-form-item label="请选择待转移的销售" prop="oldSalerId">
          <el-select v-model="moveCustomerForm.oldSalerId" placeholder="请选择待转移的销售">
            <el-option v-for="item in oldSalerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择新的下属销售人员" prop="newSalerId">
          <el-select v-model="moveCustomerForm.newSalerId"
                     no-data-text="没有可选的下属"
                     placeholder="请选择新的下属销售人员">
            <!--去除自己和待转移的销售-->
            <el-option :disabled="currentUserId === item.id || item.id === moveCustomerForm.oldSalerId" v-for="item in salerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="请选择转移业务类型" prop="transferType">
          <el-radio-group v-model="moveCustomerForm.transferType">
            <div class="radio-group-item">
              <el-radio :label="1">转移客户，转移销售机会，不保留团队成员身份</el-radio>
            </div>
            <div class="radio-group-item">
              <el-radio :label="2">转移客户，转移销售机会，保留团队成员身份</el-radio>
            </div>
            <div class="radio-group-item">
              <el-radio :label="3">转移客户，不转移销售机会，保留团队成员身份</el-radio>
            </div>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('moveCustomerForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../utils/api'
  import { arrToStr } from '../../../utils/utils'
  import webStorage from 'webStorage'

  export default {
    name: 'moveDialog',
    data () {
      return {
        dataLoading: false,
        moveCustomerForm: {
          oldSalerId: '',
          customerIds: '',
          transferType: '',
          newSalerId: '',
        },
        salerList: [],
        oldSalerList: [],
        currentUserId: '', // 当前登录用户id
        rules: {
          oldSalerId: [
            {required: true, message: '请选择待转移的销售', trigger: 'change'},
          ],
          newSalerId: [
            {required: true, message: '请选择新的销售人员', trigger: 'change'},
          ],
          transferType: [
            {required: true, message: '请选择转移业务类型', trigger: 'change'},
          ],
        },
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
            API.customer.transfer(this.moveCustomerForm, (data) => {
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
      getUserSearch () { // 查询登录用户下属用户列表
        API.user.userSubordinates({}, (data) => {
          this.salerList = data.data
        })
      },
      getOldSalerList (customerId) { // 待转移销售列表
        API.user.toTransferUserList({customerId: customerId}, (data) => {
          this.oldSalerList = data.data
        })
      }
    },
    created () {
      this.getUserSearch()
      this.currentUserId = webStorage.getItem('userInfo').id
      this.getOldSalerList(arrToStr(this.params.customerIds, 'id'))
      this.moveCustomerForm.customerIds = arrToStr(this.params.customerIds, 'id')
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";

  .radio-group-item {
    margin-top: 10px;
  }
</style>
