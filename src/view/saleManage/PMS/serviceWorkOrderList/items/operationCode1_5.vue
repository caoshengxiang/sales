<!--
  num-operationCode
  2-1 3-1 复用
-->

<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px">
        <el-form-item label="客户告知书">
          <el-input
            type="textarea"
            placeholder="请输入客户告知书"
            :rows="5"
            resize="none"
            v-model="ruleForm.noticeRemark">
          </el-input>
        </el-form-item>
        <el-form-item label="推送首次交接清单">
          <el-input
            type="textarea"
            placeholder="请输入推送首次交接清单"
            :rows="5"
            resize="none"
            v-model="ruleForm.connectRemark">
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
    name: 'operationCode1_5',
    data () {
      return {
        ruleForm: {
          noticeRemark: '',
          connectRemark: '',
        },
        rules: {},
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        let message = !this.ruleForm.noticeRemark && '请输入客户告知书' ||
                      !this.ruleForm.connectRemark && '请输入推送首次交接清单' || null;
        if(message) return this.$message.info(message);
        API.workOrder.serviceItemOperateAll(Object.assign({}, this.params.baseParam, {
          noticeRemark: this.ruleForm.noticeRemark,
          connectRemark: this.ruleForm.connectRemark,
        }, {operationCode: 2, num: 1,}), (res) => {
          if (res.status) {
            this.$message.success('操作成功')
            this.$vDialog.close({type: 'itemSave'})
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
