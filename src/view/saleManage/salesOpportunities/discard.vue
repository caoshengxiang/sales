<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
               class="demo-ruleForm">
        <el-form-item label="请输入输单备注信息" prop="discardRemark">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 20}"
            placeholder="请输入内容"
            v-model="moveCustomerForm.discardRemark">
          </el-input>
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
  // import { arrToStr } from '../../../utils/utils'
  import API from '../../../utils/api'

  export default {
    name: 'moveDialog',
    data () {
      return {
        dataLoading: false,
        moveCustomerForm: {
          discardRemark: '',
        },
        rules: {
          discardRemark: [
            {required: true, message: '请输入输单备注信息', trigger: 'blur'},
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
            API.salesOpportunities.discard({path: this.params.detail.id, body: this.moveCustomerForm}, (data) => {
              if (data.status) {
                this.$message.success('输单成功!')
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
    created () {
    }
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
