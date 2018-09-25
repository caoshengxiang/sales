<template>
  <div class="com-dialog-container">
    <div class="com-dialog">
      <el-form :model="moveCustomerForm" :rules="rules" ref="moveCustomerForm" label-width="160px"
               class="demo-ruleForm">
        <el-form-item label="移动至" prop="newSeaId">
          <el-select v-model="moveCustomerForm.newSeaId" placeholder="请选择分组">
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
          newSeaId: '',
        },
        rules: {
          newSeaId: [
            {required: true, message: '请选择分组', trigger: 'change'},
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
            API.salesOpportunitiesSea.regroup({chanceIds: this.params.chanceIds, newSeaId: this.moveCustomerForm.newSeaId},
              (data) => {
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
      getPoolList () {
        API.salesOpportunitiesSea.listAboutCustomer((data) => {
          this.poolList = data.data
        })
      },
    },
    created () {
      this.getPoolList()
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";
</style>
