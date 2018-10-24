<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog" style="padding: 20px 0;">
      <el-form :model="dialogRuleForm"
               :rules="rules"
               ref="dialogRuleForm"
               label-width="0px"
               class="demo-ruleForm">
        <table class="com-dialog-table">
          <tr>
            <td class="td-title" style="width: 20%">抽查结果</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            placeholder="请输入抽查结果"
                            v-model="dialogRuleForm.assignResult"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">抽查处理</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <div style="flex: 1;">
                    <div>
                      <el-checkbox-group v-model="dialogRuleForm.types">
                        <el-checkbox :label="1" name="type">取消该笔订单的服务奖励</el-checkbox>
                        <el-checkbox :label="2" name="type">中止服务供应商合作</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div>
                      <el-checkbox name="typeOther" v-model="dialogRuleForm.typeOther" @change="changeOther">其他
                      </el-checkbox>
                      <el-input style="" type="textarea" :disabled="!dialogRuleForm.typeOther"
                                v-model="dialogRuleForm.otherPunish"></el-input>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
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
    name: 'checkHandle',
    data () {
      return {
        dataLoading: false,
        dialogRuleForm: {
          assignResult: '',
          otherPunish: null,
          types: [],
          typeOther: false,
        },
        rules: {
          // state: [
          // {required: true, message: '请选择回访结果', trigger: 'change'},
          // ],
        },
      }
    },
    props: ['params'],
    methods: {
      requireBack (data) {
        if (data.status) {
          this.$message.success('操作成功')
          setTimeout(() => {
            this.dataLoading = false
            this.$vDialog.close({type: 'save'})
          }, 500)
        } else {
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        }
      },
      changeOther () {
        this.dialogRuleForm.otherPunish = null
      },
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      saveSubmitForm (formName) {
        let param = {
          id: this.params.ids,
          types: this.dialogRuleForm.types.join(','),
          assignResult: this.dialogRuleForm.assignResult,
          otherPunish: this.dialogRuleForm.otherPunish,
        }

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            API.serviceSpotCheck.check(param, (data) => {
              this.requireBack(data)
            })
          }
        })
      },
    },
  }
</script>

<style scoped lang="scss" rel="stylesheet/scss">
  @import "../../../../styles/common";

  .radio-group-item {
    margin-top: 10px;
  }

  .flex-line {
    display: flex;
    .label-ti {
      margin-right: 20px;
      width: 90px;
    }
  }
</style>
