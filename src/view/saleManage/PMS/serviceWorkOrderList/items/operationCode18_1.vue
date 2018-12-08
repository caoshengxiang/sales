
<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px">
        <el-form-item label="用户财务资料">
          <a style="cursor: pointer;color:blue;" :href="params.operateItem.attachment">下载用户财务资料</a>
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
      <el-button type="success" @click="saveSubmitForm('ruleForm', 1)">审核通过</el-button>
      <el-button type="danger" @click="saveSubmitForm('ruleForm', 4)">审核拒绝</el-button>
    </div>
  </div>
</template>

<script>
  import API from '../../../../../utils/api'

  export default {
    name: 'operationCode10_1',
    data () {
      return {
        ruleForm: {
          remark: '',
        },
        rules: {},
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName, state) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
              remark: this.ruleForm.remark,
              state: state
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
