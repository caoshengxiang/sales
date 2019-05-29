<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
               class="demo-ruleForm">
        <el-form-item label="转移至" prop="newWatersId">
          <el-select v-model="moveCustomerForm.newWatersId" placeholder="请选择公海">
            <el-option v-for="item in poolList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
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
  import API from '../../../../utils/api'

  export default {
    name: 'moveDialog',
    data () {
      return {
        moveCustomerForm: {
          newWatersId: '',
        },
        rules: {
          newWatersId: [
            {required: true, message: '请选择公海', trigger: 'change'},
          ],
        },
        poolList: [],
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
            API.customerSea.crossCompanyTransfer({chanceId: ~~this.params.chanceId, chanceSeaId: this.moveCustomerForm.newWatersId},
              (data) => {
                if (data.status && data.data == 1) {
                  this.$message.success(`转移成功`)
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
      getAllCustomerSea () {
        API.customerSea.getAllCustomerSea((data) => {
          this.poolList = data.data
        })
      },
    },
    created () {
      this.getAllCustomerSea();
      console.log(~~this.params.chanceId)
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
