<template>
  <div class="com-dialog-container">
      <div class="com-dialog">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px"
                 class="demo-ruleForm">
          <el-form-item label="请选择协同咨询师类型" prop="consultantType">
            <el-radio-group v-model="ruleForm.consultantType">
              <el-radio label="专业咨询师"></el-radio>
              <el-radio label="同部门其他销售人员"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="请选择协同咨询师人员" prop="consultant">
            <el-select v-model="ruleForm.consultant" placeholder="请选择新的销售人员">
              <el-option label="人员1" value="1"></el-option>
              <el-option label="人员2" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
          <el-button class="save-button" @click="saveSubmitForm('ruleForm')">确 定</el-button>
        </div>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'applyDialog',
    data () {
      return {
        ruleForm: {
          consultantType: '',
          consultant: '',
        },
        rules: {
          consultantType: [
            {required: true, message: '请选择协同咨询师类型', trigger: 'change'},
          ],
          consultant: [
            {required: true, message: '请选择协同咨询师人员', trigger: 'change'},
          ],
        },
      }
    },
    methods: {
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!')
            this.$vDialog.close({type: 'save'})
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
