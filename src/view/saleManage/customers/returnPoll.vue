<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="220px"
               class="demo-ruleForm">
        <el-form-item label="请选择待解除跟进关系的销售" prop="oldSalerId">
          <el-select v-model="moveCustomerForm.oldSalerId" placeholder="请选择待解除跟进关系的销售">
            <el-option v-for="item in oldSalerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
        dataLoading: false,
        moveCustomerForm: {
          oldSalerId: '',
          customerIds: '',
        },
        oldSalerList: [],
        rules: {
          oldSalerId: [
            {required: true, message: '请选择待解除跟进关系的销售', trigger: 'change'},
          ],
          // newSalerId: [
          //   {required: true, message: '请选择新的销售人员', trigger: 'change'},
          // ],
          // transferType: [
          //   {required: true, message: '请选择转移业务类型', trigger: 'change'},
          // ],
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
            API.customer.return(this.moveCustomerForm, (data) => {
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
      toReturnList (customerId) { // 待退回销售列表
        API.user.toReturnList({customerId: customerId}, (data) => {
          this.oldSalerList = data.data
        })
      }
    },
    created () {
      this.toReturnList(arrToStr(this.params.customerIds, 'id'))
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
