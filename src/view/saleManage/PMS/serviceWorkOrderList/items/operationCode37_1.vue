<!--
  num-operationCode
-->
<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px">
        <el-form-item label="阶段名称" prop="stepName">
          <el-select style="width: 220px;" v-model="ruleForm.stepName" placeholder="请选择阶段名称">
            <el-option label="服务阶段" value="服务阶段"></el-option>
            <el-option label="完成阶段" value="完成阶段"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金额" prop="money">
          <el-input style="width: 220px;" type="age" v-model.number="ruleForm.money" autocomplete="off"></el-input>
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
          remark: '',
          stepName: '', // 存result
          money: '', // 存result
        },
        rules: {
          stepName: [
            {required: true, message: '请选择阶段名称', trigger: 'change'},
          ],
          money: [
            {required: true, message: '金额不能为空'},
            {type: 'number', message: '金额必须为数字值'},
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
                stepName: this.ruleForm.stepName,
                money: this.ruleForm.money,
              }),
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
