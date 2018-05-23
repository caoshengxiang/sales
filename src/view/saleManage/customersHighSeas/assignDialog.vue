<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
               class="demo-ruleForm">
        <el-form-item label="请选择分配销售人员" prop="newSalerId">
          <el-select v-model="moveCustomerForm.newSalerId" placeholder="请选择分配销售人员">
            <el-option label="销售人员1" :value="1"></el-option>
            <el-option label="销售人员2" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <!--<el-form-item label="请选择转移业务类型" prop="type">-->
        <!--<el-checkbox v-model="moveCustomerForm.isOnlyCustomer" label="仅转移客户"></el-checkbox>-->
        <!--<div style="margin-left: 26px">-->
        <!--<el-checkbox v-model="moveCustomerForm.isReserveTeam">转移后保留团队成员身份</el-checkbox>-->
        <!--</div>-->
        <!--<el-checkbox v-model="moveCustomerForm.isTransferChance"-->
        <!--label="转移客户相关销售需求，保留团队身份（关联客户、联系人、预下单订单跟随转移）"></el-checkbox>-->
        <!--</el-form-item>-->
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
  export default {
    name: 'moveDialog',
    data () {
      return {
        dataLoading: false,
        moveCustomerForm: {
          newSalerId: '',
        },
        rules: {
          newSalerId: [
            {required: true, message: '请选择分配销售人员', trigger: 'change'},
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
            API.customerSea.allocate({customerIds: this.params.customerIds, newSalerId: this.moveCustomerForm.newSalerId}, (data) => {
              if (data.status) {
                if (data.data.fail > 0) {
                  this.$message.warning(`成功${data.data.success},失败${data.data.fail}`)
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
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
