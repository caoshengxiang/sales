<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm" label-width="180px"
               class="demo-ruleForm">
        <el-form-item label="请选择派单坐席客服" prop="cusServiceId">
          <el-select v-model="dialogRuleForm.cusServiceId" placeholder="请选择派单坐席客服">
            <el-option v-for="item in customerServicesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('dialogRuleForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import { arrToStr } from '../../../../utils/utils'
  import webStorage from 'webStorage'

  export default {
    name: 'assginOrderDialog',
    data () {
      return {
        dataLoading: false,
        dialogRuleForm: {
          cusServiceId: '',
          ids: '',
        },
        customerServicesList: [],
        currentUserId: '', // 当前登录用户id
        rules: {
          cusServiceId: [
            {required: true, message: '请选择派单坐席客服', trigger: 'change'},
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
            API.serviceComplaint.assignOrder({batchModel: this.dialogRuleForm}, (data) => {
              if (data.status) {
                if (data.data.fail > 0) {
                  this.$message.warning(`成功${data.data.success}, 失败${data.data.fail}, 失败原因：${data.data.errorMessage}`)
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
      getCustomerServicesList () { // 获取回访派单内的坐席客服列表
        API.serviceRetVisit.customerServicesList(null, (data) => {
          this.customerServicesList = data.data
        })
      },
    },
    created () {
      this.currentUserId = webStorage.getItem('userInfo').id
      let ids = this.params.ids.split(',')
      this.dialogRuleForm.ids = ids.map(item => {
        return parseInt(item, 10)
      })
      this.getCustomerServicesList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .radio-group-item {
    margin-top: 10px;
  }
</style>
