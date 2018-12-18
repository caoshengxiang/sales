<!--
  num-operationCode
  2-1 3-1 复用
-->

<template>
  <div class="com-dialog">
    <div class="operation-code-box">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="选择文件" prop="attachment">
          <el-upload
            class="upload-demo"
            :action="uploadUrl"
            :headers="{authKey: userInfo.authKey}"
            :on-success="onSuccessHandle"
            multiple
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
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
  import webStorage from 'webStorage'
  import { uploadUrl } from '../../../../../utils/const'

  export default {
    name: 'operationCode2_1',
    data () {
      return {
        ruleForm: {
          remark: '',
          attachment: '',
        },
        rules: {},
        userInfo: webStorage.getItem('userInfo'),
      }
    },
    computed: {
      uploadUrl () {
        return uploadUrl
      }
    },
    props: ['params'],
    methods: {
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            API.workOrder.serviceItemOperate(Object.assign({}, this.params.baseParam, {
              attachment: this.ruleForm.attachment,
              remark: this.ruleForm.remark,
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
      onSuccessHandle (response, file, fileList) {
        this.ruleForm.attachment = response.data.url
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
