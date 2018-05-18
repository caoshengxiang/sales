<template>
  <div>
    <el-dialog :title="type === 'apply' ? '申请咨询师协同':'申请替换咨询师'" :visible.sync="moveDialogVisible" width="700px" :show-close="false">
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
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'applyDialog',
    data () {
      return {
        moveDialogVisible: false,
        ruleForm: {
          consultantType: '',
          consultant: '',
        },
        rules: {
          consultantType: [
            {required: true, message: '请选择协同咨询师类型', trigger: 'blur'},
          ],
          consultant: [
            {required: true, message: '请选择协同咨询师人员', trigger: 'blur'},
          ],
        },
      }
    },
    props: {
      dialogOpen: {
        default: false,
        type: Boolean,
      },
      type: {
        default: '',
        type: String
      }
    },
    watch: {
      dialogOpen (open) {
        if (open) {
          this.moveDialogVisible = true
          this.$emit('hasDialogOpen')
        }
      },
    },
    methods: {
      initData () {
        this.moveDialogVisible = false
        this.ruleForm = {
          consultantType: '',
          consultant: '',
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
