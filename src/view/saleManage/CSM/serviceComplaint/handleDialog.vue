<!--
 type 2-6 投诉调查，投诉处理，投诉回访，升级调查，升级处理
-->

<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog" style="padding: 20px 0;">
      <el-form :model="dialogRuleForm"
               :rules="rules"
               ref="dialogRuleForm"
               label-width="0px"
               class="demo-ruleForm">
        <table class="com-dialog-table" v-if="params.type === 2">
          <tr>
            <td class="td-title" style="width: 20%">调查结果</td>
            <td>
              <el-form-item label="" prop="duty" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="ruleForm2.checkResult.duty" @change="initRuleForm2">
                  <el-radio :label="true">有责任</el-radio>
                  <el-radio :label="false">无责任</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">责任备注</td>
            <td>
              <el-form-item label="">
                <div class="flex-line" v-if="ruleForm2.checkResult.duty === true">
                  <label class="label-ti">有责任</label>
                  <div style="flex: 1;">
                    <div>
                      <el-checkbox-group v-model="ruleForm2.checkResult.dutyTypes">
                        <el-checkbox v-for="item in complaintTypes"
                                     :key="item.id"
                                     :label="item" name="type">{{item.codeName}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div>
                      <el-checkbox v-model="ruleForm2.checkResult.other" @change="changeOther">其他</el-checkbox>
                      <el-input style="" type="textarea" :disabled="!ruleForm2.checkResult.other"
                                v-model="ruleForm2.checkResult.otherContent"></el-input>
                    </div>
                  </div>
                </div>
                <div class="flex-line" v-if="ruleForm2.checkResult.duty === false">
                  <label class="label-ti">无责任</label>
                  <div style="flex: 1;">
                    <div>
                      <el-checkbox v-model="ruleForm2.checkResult.serviceContent">服务内容</el-checkbox>
                      <el-checkbox v-model="ruleForm2.checkResult.servicePrice">服务价格</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox v-model="ruleForm2.checkResult.other" @change="changeOther">其他</el-checkbox>
                      <el-input style="width: 100%;" type="textarea" :disabled="!ruleForm2.checkResult.other"
                                v-model="ruleForm2.checkResult.otherContent"></el-input>
                    </div>
                  </div>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">处理方案</td>
            <td>
              <el-form-item label="" disabled>
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="ruleForm2.handlePlan"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="com-dialog-table" v-if="params.type === 3">
          <el-input style="width: 100%;"
                    type="textarea"
                    :rows="10"
                    placeholder="请输入投诉处理结果"
                    v-model="ruleForm3.handleResult"></el-input>
        </div>
        <table class="com-dialog-table" v-if="params.type === 4">
          <tr>
            <td class="td-title" style="width: 20%">是否满意</td>
            <td>
              <el-form-item label="" prop="duty" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="ruleForm4.state" @change="initRuleForm4">
                  <el-radio :label="1">满意（投诉完成）</el-radio>
                  <el-radio :label="2">不满意（升级投诉）</el-radio>
                </el-radio-group>
                <div style="margin-top: 10px;">
                  <el-input :disabled="ruleForm4.state !== 2" style="width: 100%;"
                            type="textarea"
                            :rows="6"
                            placeholder="请输入不满意原因"
                            v-model="ruleForm4.content"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
        <div class="com-dialog-table" v-if="params.type === 5">
          <el-input style="width: 100%;"
                    type="textarea"
                    :rows="10"
                    placeholder=" 请输入升级投诉处理方案"
                    v-model="ruleForm5.upgradePlan"></el-input>
        </div>
        <table class="com-dialog-table" v-if="params.type === 6">
          <tr>
            <td class="td-title" style="width: 20%">处理结果</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            placeholder="请输入投诉处理结果"
                            v-model="ruleForm6.upgradeReuslt"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">投诉处罚</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <div style="flex: 1;">
                    <div>
                      <el-checkbox v-model="ruleForm6.complaintReuslt.cancelReward">取消该笔订单的服务奖励</el-checkbox>
                      <el-checkbox v-model="ruleForm6.complaintReuslt.stopCooperation">中止服务供应商合作</el-checkbox>
                    </div>
                    <div>
                      <el-checkbox v-model="ruleForm6.complaintReuslt.other" @change="changeOther">其他</el-checkbox>
                      <el-input style="" type="textarea" :disabled="!ruleForm6.complaintReuslt.other"
                                v-model="ruleForm6.complaintReuslt.otherDesc"></el-input>
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
  // import { arrToStr } from '../../../../utils/utils'
  // import webStorage from 'webStorage'

  export default {
    name: 'returnVisitDialog',
    data () {
      return {
        dataLoading: false,
        dialogRuleForm: {},
        ruleForm2: {
          checkResult: {
            duty: true,
            other: false,
            otherContent: '',
            serviceContent: false,
            servicePrice: false,
            dutyTypes: [],
          },
          serviceComplaintTypeModels: [],
          handlePlan: '',
        },
        ruleForm3: {
          handleResult: '',
        },
        ruleForm4: {
          content: '',
          state: 1,
        },
        ruleForm5: {
          upgradePlan: '',
        },
        ruleForm6: {
          upgradeReuslt: '',
          complaintReuslt: {
            cancelReward: false,
            stopCooperation: false,
            other: false,
            otherDesc: '',
          },
        },
        rules: {
          // state: [
          // {required: true, message: '请选择回访结果', trigger: 'change'},
          // ],
        },
        complaintTypes: [],
        detail: {},
      }
    },
    props: ['params'],
    methods: {
      initRuleForm2 () {
        let duty = this.ruleForm2.checkResult.duty
        // console.log(duty)
        this.ruleForm2 = {
          checkResult: {
            duty: duty,
            other: false,
            otherContent: '',
            serviceContent: false,
            servicePrice: false,
            dutyTypes: [],
          },
          serviceComplaintTypeModels: [],
          handlePlan: '',
        }
      },
      initRuleForm4 () {
        this.ruleForm4 = {
          content: '',
          state: this.ruleForm4.state,
        }
      },
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
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
      apiHandle2 () {
        this.ruleForm2.checkResult.dutyTypes.forEach(item => {
          console.log(item.id)
          this.ruleForm2.serviceComplaintTypeModels.push({codeConfigId: item.id})
        })
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm2)
        API.serviceComplaint.inquire(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle3 () {
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm3)
        API.serviceComplaint.handle(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle4 () {
        let param = Object.assign({}, {id: this.params.id}, {handleVisit: this.ruleForm4})
        API.serviceComplaint.visit(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle5 () {
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm5)
        API.serviceComplaint.upInquire(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle6 () {
        if (this.ruleForm6.complaintReuslt.other && !this.ruleForm6.complaintReuslt.otherDesc) {
          this.$message.warning('必须输入处理办法')
          this.dataLoading = false
          return
        }
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm6)
        API.serviceComplaint.upHandle(param, (data) => {
          this.requireBack(data)
        })
      },
      changeOther () {
        this.ruleForm6.complaintReuslt.otherDesc = ''
        this.ruleForm2.checkResult.otherContent = ''
      },
      saveSubmitForm (formName) {
        // let that = this
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.dataLoading = true
            switch (this.params.type) {
              case 2:
                this.apiHandle2()
                break
              case 3:
                this.apiHandle3()
                break
              case 4:
                this.apiHandle4()
                break
              case 5:
                this.apiHandle5()
                break
              case 6:
                this.apiHandle6()
                break
              default:
                break
            }
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getCodeConfig () {
        var that = this
        API.baseSetting.getCodeConfig({type: 8}, function (res) { // 7 意见类型
          if (res.status) {
            that.complaintTypes = res.data
          }
        })
      },
    },
    created () {
      this.getCodeConfig() // 投诉类型
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
