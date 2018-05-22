<template>
  <div class="com-dialog-container" v-loading="saveLoading">
      <div class="com-dialog">
        <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
                 class="demo-ruleForm">
          <el-form-item label="请选择新的销售人员" prop="newSalerId">
            <el-select v-model="moveCustomerForm.newSalerId" placeholder="请选择新的销售人员">
              <el-option label="销售人员1" :value="1"></el-option>
              <el-option label="销售人员2" :value="2"></el-option>
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
  export default {
    name: 'moveDialog',
    data () {
      return {
        saveLoading: false,
        moveCustomerForm: {
          customerIds: '',
          transferType: '',
          newSalerId: '',
        },
        rules: {
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
            this.saveLoading = true
            API.customer.transfer(this.moveCustomerForm, (data) => {
              if (data.status) {
                if (data.data.fail > 0) {
                  this.$message.warning(`成功${data.data.success},失败${data.data.fail}`)
                } else {
                  this.$message.success(`成功${data.data.success},失败${data.data.fail}`)
                }
                setTimeout(() => {
                  this.saveLoading = false
                  this.$vDialog.close({type: 'save'})
                }, 500)
              } else {
                setTimeout(() => {
                  this.saveLoading = false
                }, 500)
              }
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      arrToStr (arr) { // 对象数组id属性转为字符串[{id: 1},{id, 2}] to '1,2'
        let tempArr = []
        arr.forEach(item => {
          tempArr.push(item.id)
        })
        return tempArr.join(',')
      }
    },
    created () {
      this.moveCustomerForm.customerIds = arrToStr(this.params.customerIds, 'id')
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
  .radio-group-item {
    margin-top: 10px;
  }
</style>
