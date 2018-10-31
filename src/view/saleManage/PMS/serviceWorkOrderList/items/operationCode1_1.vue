<!--
  num-operationCode
-->
<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="选择上门时间" prop="setTime">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.setTime"
            type="datetime"
            value-format="timestamp"
            placeholder="选择上门时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="短信通知内容" prop="message">
          <div>
            <el-checkbox v-model="ruleForm.isSendMsg">发送短信通知</el-checkbox>
          </div>
          <div>
            <el-input
              type="textarea"
              placeholder="请输入短信通知内容"
              :rows="3"
              v-model="ruleForm.message">
            </el-input>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input
            type="textarea"
            placeholder="请输入备注"
            :rows="3"
            v-model="ruleForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="dialog-footer">
      <el-button class="save-button" @click="saveSubmitForm('ruleForm')">确 定</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../../utils/api'

  export default {
    name: 'operationCode1_1',
    data () {
      return {
        ruleForm: {
          setTime: '',
          remark: '',
          isSendMsg: false, // 存result
          message: '', // 存result
        },
        rules: {
          setTime: [
            {required: true, message: '请选择上门时间', trigger: 'change'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
              setTime: this.ruleForm.setTime,
              remark: this.ruleForm.remark,
              result: JSON.stringify({
                isSendMsg: this.ruleForm.isSendMsg,
                message: this.ruleForm.message
              })
            }), (res) => {
              if (res.status) {
                this.$message.success('操作成功')
                this.$vDialog.close({type: 'itemSave'})
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
  @import "../../../../../styles/common";

  .operation-code-box {
    padding: 10px;
  }
</style>
