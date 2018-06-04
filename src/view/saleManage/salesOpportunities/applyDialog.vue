<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px"
               class="demo-ruleForm">
        <el-form-item label="请选择协同咨询师类型" prop="consultantType">
          <el-radio-group v-model="ruleForm.principalType">
            <el-radio label="专业咨询师"></el-radio>
            <el-radio label="同部门其他销售人员"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="请选择协同咨询师人员" prop="counselorId">
          <el-select v-model.number="ruleForm.counselorId" placeholder="请选择协同咨询师人员">
            <el-option :disabled="exceptUserIds.some((id) => {return id === item.id})" v-for="item in userList"
                       :key="item.id" :label="item.name" :value="item.id"></el-option>
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
  import API from '../../../utils/api'

  export default {
    name: 'applyDialog',
    data () {
      return {
        dataLoading: false,
        ruleForm: {
          businessType: 1, // 关联业务类型 1:销售机会
          type: 0,
          counselorId: '',
          chanceId: '',
        },
        rules: {
          consultantType: [
            // {required: true, message: '请选择协同咨询师类型', trigger: 'change'},
          ],
          counselorId: [
            {required: true, message: '请选择协同咨询师人员', trigger: 'change'},
          ],
        },
        userList: [],
        exceptUserIds: [],
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
            API.task.approvalCounselor(this.ruleForm, (data) => {
              if (data.data) {
                setTimeout(() => {
                  this.dataLoading = false
                  this.$message.success('操作成功')
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
      getUserList (page, pageSize) {
        API.user.userList({
          page: page,
          pageSize: pageSize,
        }, (da) => {
          this.userList = da.data.content
        })
      },
    },
    created () {
      this.getUserList(0, null)
      if (this.params.type === 'apply') {
        this.ruleForm.type = 1
      } else if (this.params.type === 'replace') {
        this.ruleForm.type = 2
      }
      this.ruleForm.chanceId = this.params.chanceId
      this.exceptUserIds = this.params.exceptUserIds
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../styles/common";
</style>
