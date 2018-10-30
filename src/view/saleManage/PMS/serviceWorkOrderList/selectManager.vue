<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog">
      <el-form :model="addForm" :rules="rules" ref="dialogRuleForm" label-width="180px"
               class="demo-ruleForm">
        <el-form-item label="请选择新的服务管家" prop="managerId">
          <el-select v-model="addForm.managerId" placeholder="请选择新的服务管家">
            <el-option v-for="item in managerList" :key="item.id" :label="item.name" :value="item.id"></el-option>
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

  export default {
    name: 'selectManager',
    data () {
      return {
        dataLoading: false,
        managerList: [],
        workOrderDetail: {},
        addForm: {
          id: '',
          managerId: '',
        },
        rules: {
          managerId: [
            {required: true, message: '请选择新的服务管家', trigger: 'change'},
          ],
        },
      }
    },
    props: ['params'],
    methods: {
      getManagerList (managerType) {
        API.serviceManager.assginOrderManagerList({
          managerType: managerType,
        }, (res) => {
          this.managerList = res.data.content
        })
      },
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      saveSubmitForm (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.workOrder.moveOrder(this.addForm, (data) => {
              if (data.status) {
                this.$message.success('转移成功')
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
      this.workOrderDetail = this.params.workOrder
      this.addForm.id = this.workOrderDetail.id
      this.getManagerList(this.workOrderDetail.managerType)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
