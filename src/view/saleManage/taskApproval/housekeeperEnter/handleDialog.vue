<!--
 type
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
            <td class="td-title" style="width: 20%">审核结</td>
            <td>
              <el-form-item label="" prop="duty" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="ruleForm2.checkStatus" @change="initRuleForm2">
                  <el-radio :label="4">审核通过</el-radio>
                  <el-radio :label="2">审核拒绝（可修改提交）</el-radio>
                  <el-radio :label="3">审核驳回（不可修改且不能再提交审核）</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">拒绝/驳回原因</td>
            <td>
              <el-form-item label="" disabled>
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="ruleForm2.checkResult"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="com-dialog-table" v-if="params.type === 3">
          <tr>
            <td class="td-title" style="width: 20%">审核结</td>
            <td style="padding-left: 15px;">
              <el-form-item label="" prop="duty" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="ruleForm3.signAuditStatus" @change="initRuleForm3">
                  <el-radio :label="3">面签通过</el-radio>
                  <el-radio :label="2">面签驳回</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">面签形象照</td>
            <td style="padding: 0;">
              <el-form-item label="">
                <p class="up-cut-img">
                  <span class="up-link" style="position: relative;top: 5px;left: 15px;">
                    <el-button class="el-up-img" size="mini" type="success"
                              >上传形象照
                  </el-button>
                  <input type="file" class="upload-input"
                         accept="image/png,image/jpeg,image/gif,image/jpg"
                         @change="uploadImg($event)">
                  </span>
                  <span style="position: relative;top: 5px;left: 20px">{{ruleForm3.name}}</span>
                </p>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">面签评价</td>
            <td>
              <el-form-item label="" disabled>
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="ruleForm3.signEvaluate"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <tr>
            <td class="td-title" style="width: 20%">驳回原因</td>
            <td>
              <el-form-item label="" disabled>
                <div class="flex-line">
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="ruleForm3.signResult"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
        </table>
        <table class="com-dialog-table" v-if="params.type === 5">
          <tr>
            <td class="td-title" style="width: 20%">到账审核</td>
            <td>
              <el-form-item label="" prop="duty" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="ruleForm5.bailAuditStatus" @change="initRuleForm3">
                  <el-radio :label="3">确认到账</el-radio>
                  <el-radio :label="2">未到账</el-radio>
                </el-radio-group>
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
          checkStatus: 4,
          checkResult: '',
        },
        ruleForm3: {
          signAuditStatus: 3,
          signEvaluate: '',
          signResult: '',
          signPhoto: '',
          name: '',
        },
        ruleForm5: {
          bailAuditStatus: 5,
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
        this.ruleForm2.checkResult = ''
      },
      initRuleForm3 () {
        this.ruleForm3.signEvaluate = ''
        this.ruleForm3.signResult = ''
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
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm2)
        API.serviceManager.dataCheck(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle3 () {
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm3)
        API.serviceManager.signAudit(param, (data) => {
          this.requireBack(data)
        })
      },
      apiHandle5 () {
        let param = Object.assign({}, {id: this.params.id}, this.ruleForm5)
        API.serviceManager.bailAudit(param, (data) => {
          this.requireBack(data)
        })
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
              case 5:
                this.apiHandle5()
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
      uploadImg (e) {
        // 上传图片
        // this.option.img
        var file = e.target.files[0]
        // console.log(file)
        if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/.test(e.target.value)) {
          alert('图片类型必须是.gif,jpeg,jpg,png,bmp中的一种')
          return false
        }
        let formData = new FormData()
        // formData.append('filename', files[0].name)
        formData.append('file', file)
        API.common.uploadFile({path: 'avatar', body: formData}, upImg => {
          if (upImg.status) {
            console.log(upImg.data)
            this.ruleForm3.signPhoto = upImg.data.url
            this.ruleForm3.name = upImg.data.name
            this.$message.success('保存成功')
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
  .com-dialog-container {
    padding: 0 20px;
  }
  .com-dialog .dialog-footer {
    margin-top: 20px;
  }

  .upload-input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: inline-block;
    opacity: 0;
  }
</style>
