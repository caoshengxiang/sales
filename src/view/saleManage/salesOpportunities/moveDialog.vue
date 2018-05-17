<template>
  <div>
    <el-dialog title="转移销售机会" :visible.sync="moveDialogVisible" width="700px" :show-close="false">
      <div class="com-dialog">
        <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
                 class="demo-ruleForm">
          <el-form-item label="请选择新的销售人员" prop="salerId">
            <el-select v-model="moveCustomerForm.salerId" placeholder="请选择新的销售人员">
              <el-option label="销售人员1" value="1"></el-option>
              <el-option label="销售人员2" value="2"></el-option>
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
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'moveDialog',
    data () {
      return {
        moveDialogVisible: false,
        moveCustomerForm: {
          salerId: '',
        },
        rules: {
          salerId: [
            {required: true, message: '请选择新的销售人员', trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      moveDialogOpen: {
        default: false,
        type: Boolean,
      },
    },
    watch: {
      moveDialogOpen (open) {
        if (open) {
          this.moveDialogVisible = true
          this.$emit('hasMoveDialogOpen')
        }
      },
    },
    methods: {
      initData () {
        this.moveDialogVisible = false
        this.moveCustomerForm = {
          salerId: '',
        }
      },
      cancelSubmitForm () {
        this.initData()
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            this.initData()
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
