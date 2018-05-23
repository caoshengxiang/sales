<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
               class="demo-ruleForm">
        <el-form-item label="移动客户至" prop="newSeaId">
          <el-select v-model="moveCustomerForm.newSeaId" placeholder="请选择分组">
            <el-option label="分组1" value="1"></el-option>
            <el-option label="分组2" value="2"></el-option>
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
  export default {
    name: 'moveDialog',
    data () {
      return {
        moveCustomerForm: {
          newSeaId: '',
        },
        rules: {
          newSeaId: [
            {required: true, message: '请选择分组', trigger: 'change'},
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
            API.customerSea.regroup({customerIds: this.params.customerIds, newSeaId: this.moveCustomerForm.newSeaId}, (data) => {
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
