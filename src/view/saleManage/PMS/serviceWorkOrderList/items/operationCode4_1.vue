<!--
  num-operationCode
-->

<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item label="服务开始时间" prop="startTime">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.startTime"
            type="datetime"
            value-format="timestamp"
            placeholder="服务开始时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="服务完成时间" prop="endTime">
          <el-date-picker
            style="width: 100%"
            v-model="ruleForm.endTime"
            type="datetime"
            value-format="timestamp"
            placeholder="服务完成时间">
          </el-date-picker>
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
    name: 'operationCode4_1',
    data () {
      return {
        ruleForm: {
          remark: '',
          startTime: '', // 存result
          endTime: '', // 存result
        },
        rules: {
          startTime: [
            {required: true, message: '请选择服务开始时间', trigger: 'change'},
          ],
          endTime: [
            {required: true, message: '请选择服务完成时间', trigger: 'change'},
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
              remark: this.ruleForm.remark,
              result: JSON.stringify({
                startTime: this.ruleForm.startTime,
                endTime: this.ruleForm.endTime
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
