<template>
  <div class="com-dialog-container" v-loading="dataLoading">
    <div class="com-dialog" style="padding: 20px 0;">
      <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm" label-width="0px"
               class="demo-ruleForm">
        <table class="com-dialog-table" style="margin-bottom: -1px;">
          <tr>
            <td class="td-title" style="width: 20%">回访结果</td>
            <td>
              <el-form-item label="" prop="state" style="margin-top: 10px;margin-bottom: 10px;">
                <el-radio-group v-model="dialogRuleForm.state">
                  <el-radio :label="3">完成回访</el-radio>
                  <el-radio :label="4">客户拒绝回访</el-radio>
                  <el-radio :label="5">客户待再回访</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>
        </table>
      </el-form>
      <el-form :model="dialogRuleForm" :rules="rules" ref="dialogRuleForm2" label-width="0px"
               class="demo-ruleForm">
        <table class="com-dialog-table">
					<!-- 回访时间 -->
					<tr v-if='dialogRuleForm.state === 5'>
            <td class="td-title" style="width: 20%">待再回访时间</td>
						<td>
							<el-form-item label="">
								<el-date-picker
									v-model="dialogRuleForm.returnVisitTime"
									type="datetime"
									format="yyyy-MM-dd HH:mm"
									placeholder="选择待再回访时间"
									style="margin-top: 15px;">
								</el-date-picker>
							</el-form-item>
						</td>
					</tr>
          <!-- 客户主动退单回访 -->
          <tr v-if="params.type === 1">
            <td class="td-title" style="width: 20%">回访内容</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">退单原因</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="1" name="type">服务质量未达预期</el-checkbox>
                    <el-checkbox :label="2" name="type">企业跳单</el-checkbox>
                    <el-checkbox :label="3" name="type">企业注销</el-checkbox>
                    <el-checkbox :label="4" name="type">客户购买产品出现错误</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">原因描述</label>
                  <el-input style="margin-left: 8px;" type="textarea" v-model="dialogRuleForm.reasonDesc" :disabled="dialogRuleForm.state != 3"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <!-- 回款异常订单回访 -->
          <tr v-if="params.type === 2">
            <td class="td-title" style="width: 20%">回访内容</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">服务管家责:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="5" name="type">服务成果不满意</el-checkbox>
                    <el-checkbox :label="6" name="type">服务态度不满意</el-checkbox>
                    <el-checkbox :label="7" name="type">专业性不强</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">商务管家责任:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="8" name="type">未及时催收</el-checkbox>
                    <el-checkbox :label="9" name="type">服务态度不满意</el-checkbox>
                    <el-checkbox :label="10" name="type">承诺与实际服务内容不符</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">客户原因责任:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="11" name="type">公司经营问题</el-checkbox>
                    <el-checkbox :label="12" name="type">借故拖欠</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </td>
          </tr>
          <!-- A类产品续签异常订单回访 -->
          <tr v-if="params.type === 3">
            <td class="td-title" style="width: 20%">回访内容</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">服务管家责任:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="13" name="type">服务质量不满意</el-checkbox>
                    <el-checkbox :label="14" name="type">服务效率不满意</el-checkbox>
                    <el-checkbox :label="15" name="type">服务态度不满意</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">商务管家责任:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="16" name="type">未及时跟单</el-checkbox>
                    <el-checkbox :label="17" name="type">增值服务未达标</el-checkbox>
                  </el-checkbox-group>
                </div>
                <div class="flex-line">
                  <label class="label-ti">客户原因责任:</label>
                  <el-checkbox-group v-model="dialogRuleForm.types" :disabled="dialogRuleForm.state != 3">
                    <el-checkbox :label="18" name="type">服务价格不满意</el-checkbox>
                    <el-checkbox :label="19" name="type">公司注销</el-checkbox>
                  </el-checkbox-group>
                </div>
              </el-form-item>
            </td>
          </tr>
          <!-- 非记账托管业务首次沟通回访 -->
          <tr v-if="params.type === 4">
            <td class="td-title" style="width: 20%">回访内容</td>
            <td style="padding: 0;margin: 0;">
              <el-form-item label="">
                <table style="width: 100%;text-align: center">
                  <tr>
                    <td class="td-title">回访内容</td>
                    <td class="td-title">回访结果</td>
                  </tr>
                  <tr>
                    <td>是否按约定时间进行联系与开展服务</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type1" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="20">是</el-radio>
                        <el-radio :label="21">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <td>是否以平台服务管家身份与客户联系</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type2" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="22">是</el-radio>
                        <el-radio :label="23">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <td>是否有推荐或介绍其他服务机构</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type3" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="24">是</el-radio>
                        <el-radio :label="25">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                </table>
              </el-form-item>
            </td>
          </tr>
          <!-- 外勤首次上门回访 -->
          <tr v-if="params.type === 5">
            <td class="td-title" style="width: 20%">回访内容</td>
            <td style="padding: 0;margin: 0;">
              <el-form-item label="">
                <table style="width: 100%;text-align: center">
                  <tr>
                    <td class="td-title">回访内容</td>
                    <td class="td-title">回访结果</td>
                  </tr>
                  <tr>
                    <td>外勤管家对《客户告知书》的介绍是否解释详尽</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type1" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="26">是</el-radio>
                        <el-radio :label="27">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <td>在采集客户信息时外勤管家引导是否恰当</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type2" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="28">是</el-radio>
                        <el-radio :label="29">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                  <tr>
                    <td>外勤管家是否对帮助客户安装APP并指导使用</td>
                    <td>
                      <el-radio-group v-model="dialogRuleForm.type3" :disabled="dialogRuleForm.state != 3">
                        <el-radio :label="30">是</el-radio>
                        <el-radio :label="31">否</el-radio>
                      </el-radio-group>
                    </td>
                  </tr>
                </table>
              </el-form-item>
            </td>
          </tr>
          <!-- 2-3星评价回访 start -->
          <tr v-if="params.type === 6">
            <td class="td-title" style="width: 20%">原评价星级</td>
            <td>
              <el-rate disabled v-model="dialogRuleForm.originStar"></el-rate>
            </td>
          </tr>
          <tr v-if="params.type === 6">
            <td class="td-title" style="width: 20%">回访评价</td>
            <td>
              <el-rate v-model="dialogRuleForm.retEvaluation"></el-rate>
            </td>
          </tr>
          <tr v-if="params.type === 6">
            <td class="td-title" style="width: 20%">评价意见</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">意见类型</label>
                  <el-select v-model="dialogRuleForm.commentSuggestionName" placeholder="请选择其他意见类型" :disabled="dialogRuleForm.state != 3">
                    <el-option v-for="item in commentsTypes" :key="item.id" :label="item.codeName"
                               :value="item.codeName"></el-option>
                  </el-select>
                </div>
                <div class="flex-line">
                  <label class="label-ti" style="margin-top: 10px;">意见描述</label>
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="dialogRuleForm.commentSuggestionDesc" :disabled="dialogRuleForm.state != 3"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <!-- 2-3星评价回访 end -->
          <!-- 未评价回访 start -->
          <tr v-if="params.type === 7">
            <td class="td-title" style="width: 20%">原评价星级</td>
            <td>未评价</td>
          </tr>
          <tr v-if="params.type === 7">
            <td class="td-title" style="width: 20%">回访评价</td>
            <td>
              <el-rate v-model="dialogRuleForm.retEvaluation"></el-rate>
            </td>
          </tr>
          <tr v-if="params.type === 7">
            <td class="td-title" style="width: 20%">评价意见</td>
            <td>
              <el-form-item label="">
                <div class="flex-line">
                  <label class="label-ti">意见类型</label>
                  <el-select v-model="dialogRuleForm.commentSuggestionName" placeholder="请选择其他意见类型" :disabled="dialogRuleForm.state != 3">
                    <el-option v-for="item in commentsTypes" :key="item.id" :label="item.codeName"
                               :value="item.codeName"></el-option>
                  </el-select>
                </div>
                <div class="flex-line">
                  <label class="label-ti" style="margin-top: 10px;">意见描述</label>
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="dialogRuleForm.commentSuggestionDesc" :disabled="dialogRuleForm.state != 3"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
          <!-- 未评价回访 end -->
          <tr>
            <td class="td-title" style="width: 20%">其他意见</td>
            <td>
              <el-form-item label="" disabled>
                <div class="flex-line">
                  <label class="label-ti">意见类型</label>
                  <el-select v-model="dialogRuleForm.otherSuggestionName" placeholder="请选择其他意见类型" :disabled="dialogRuleForm.state != 3">
                    <el-option v-for="item in commentsTypes" :key="item.id" :label="item.codeName"
                               :value="item.codeName"></el-option>
                  </el-select>
                </div>
                <div class="flex-line">
                  <label class="label-ti" style="margin-top: 10px;">意见描述</label>
                  <el-input style="margin-left: 8px;margin-top: 10px;" type="textarea"
                            v-model="dialogRuleForm.otherSuggestionDesc" :disabled="dialogRuleForm.state != 3"></el-input>
                </div>
              </el-form-item>
            </td>
          </tr>
					<!-- 备注信息 -->
					<tr>
            <td class="td-title" style="width: 20%">备注信息</td>
						<td>
              <el-input style="margin: 5px 0;" type="textarea" v-model='dialogRuleForm.revisitRemark' resize='none' rows='4' placeholder="备注信息"></el-input>
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
  import webStorage from 'webStorage'

  export default {
    name: 'returnVisitDialog',
    data () {
      return {
        dataLoading: false,
        dialogRuleForm: {
          state: '',
          types: [],
          type1: '',
          type2: '',
          type3: '',
          reasonDesc: '',
          otherSuggestionName: '',
          otherSuggestionDesc: '',
          retEvaluation: 0,
          originStar: 0,
          commentSuggestionName: '',
          commentSuggestionDesc: '',
					returnVisitTime: '',              //回访时间
					revisitRemark: '',            //回访备注
        },
        currentUserId: '', // 当前登录用户id
        rules: {
          state: [
            {required: true, message: '请选择回访结果', trigger: 'change'},
          ],
        },
        commentsTypes: [],
        detail: {},
      }
    },
    props: ['params'],
    watch: {
      'dialogRuleForm.state' (va) {
        if (va !== 3) {
          this.initDialogRuleForm()
        }
      },
    },
    methods: {
      initDialogRuleForm () {
        this.dialogRuleForm = {
          state: this.dialogRuleForm.state, // 回访状态不初始
          types: [],
          type1: '',
          type2: '',
          type3: '',
          reasonDesc: '',
          otherSuggestionName: '',
          otherSuggestionDesc: '',
          retEvaluation: 0,
          originStar: 0,
          commentSuggestionName: '',
          commentSuggestionDesc: '',
					returnVisitTime: '',              //回访时间
					revisitRemark: '',            //回访备注
        }
      },
      cancelSubmitForm () {
        this.$vDialog.close({type: 'cancel'})
      },
      getParam () {
        let param = {
          commentSuggestion: {},
          innerContent: {},
          otherSuggestion: {},
        }
        param.id = this.params.ids
        param.type = this.params.type
        param.state = this.dialogRuleForm.state
        param.otherSuggestion.otherSuggestionName = this.dialogRuleForm.otherSuggestionName // 其他意见
        param.otherSuggestion.otherSuggestionDesc = this.dialogRuleForm.otherSuggestionDesc
				param.revisitRemark = this.dialogRuleForm.revisitRemark
				if(this.dialogRuleForm.state === 5) {
					param.returnVisitTime = +this.dialogRuleForm.returnVisitTime
				}
        if (this.params.type === 1) {
          param.innerContent.types = this.dialogRuleForm.types.join(',')
          param.innerContent.reasonDesc = this.dialogRuleForm.reasonDesc
        } else if (this.params.type === 2 || this.params.type === 3) {
          param.innerContent.types = this.dialogRuleForm.types.join(',')
        } else if (this.params.type === 4 || this.params.type === 5) {
          param.innerContent.types = this.dialogRuleForm.type1 + ',' + this.dialogRuleForm.type2 + ',' +
            this.dialogRuleForm.type3
        } else if (this.params.type === 6 || this.params.type === 7) {
          param.retEvaluation = this.dialogRuleForm.retEvaluation
          param.commentSuggestion.commentSuggestionName = this.dialogRuleForm.commentSuggestionName // 评价意见
          param.commentSuggestion.commentSuggestionDesc = this.dialogRuleForm.commentSuggestionDesc
        }
        return param
      },
      saveSubmitForm (formName) {
				let yesShow = 1;
				if(this.dialogRuleForm.state === 5) {
					if(!this.dialogRuleForm.returnVisitTime) {
						yesShow = 0;
					}
				};
				if(!yesShow) {
					this.$message('请选择待再回访时间');
					return;
				}
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.getParam())
            if (this.params.type === 6) {
              if (this.dialogRuleForm.state === 3 && this.dialogRuleForm.retEvaluation === 0) { // 完成回访
                this.$message.warning('请对回访进行评价')
                return false
              }
            }
            this.dataLoading = true
            API.serviceRetVisit.revisit(this.getParam(), (data) => {
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
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getDetail () {
        this.dataLoading = true
        API.serviceRetVisit.detail(this.params.ids, (da) => {
          this.detail = da.data
          this.dialogRuleForm.originStar = parseInt(da.data.retvisitContentModel.originStar, 10)
          setTimeout(() => {
            this.dataLoading = false
          }, 500)
        })
      },
      getCodeConfig () {
        var that = this
        API.baseSetting.getCodeConfig({type: 7}, function (res) { // 7 意见类型
          if (res.status) {
            that.commentsTypes = res.data
          }
        })
      },
    },
    created () {
      this.currentUserId = webStorage.getItem('userInfo').id
      this.getCodeConfig() // 意见类型
      if (this.params.type === 6) {
        this.getDetail()
      }
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
