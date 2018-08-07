<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" ref="addForm" label-width="160px" :rules="rules">
        <el-form-item prop="followDesc" label="请输入跟单记录信息">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="addForm.followDesc">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button class="cancel-button" @click="cancelSubmitForm">取 消</el-button>
        <el-button class="save-button" @click="saveSubmitForm('addForm')">确 定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import API from '../../../../utils/api'
  // import { chartLengthRule } from '../../../utils/const'

  export default {
    name: 'addDialog',
    data () {
      return {
        dataLoading: false,
        addForm: { // 添加表单
          chanceId: '',
          // chanceName: '',
          // customerId: '',
          // customerName: '',
          // creator: '',
          // creatorName: '',
          // stage: '',
          followDesc: '',
        },
        rules: {
          followDesc: [
            {required: true, message: '请输入跟单记录信息', trigger: 'blur'},
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
            API.orderRecords.add(this.addForm, (data) => {
              if (data.status) {
                this.$message.success('添加成功')
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
      this.addForm.chanceId = this.params.detailChanceId
      // if (this.params.detail) {
      // let detail = JSON.parse(JSON.stringify(this.params.detail))
      // this.addForm = { // 添加表单
      //   chanceId: detail.id,
      //   chanceName: detail,
      //   customerId: detail.customerId,
      //   customerName: detail.customerName,
      //   creator: detail.creator,
      //   creatorName: detail.creatorName,
      //   stage: detail.stage,
      // }
      // }
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
    margin: 0;
  }
</style>
