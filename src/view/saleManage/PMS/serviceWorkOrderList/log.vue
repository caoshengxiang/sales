<template>
    <div class="com-dialog-container">
        <div class="com-dialog">
            <el-form :model="ruleForm" :rules="rules" ref="formName" label-width="100px" class="demo-ruleForm">
                <el-form-item label="事项名称" prop='recordIds'>
                <el-select v-model="ruleForm.recordIds" placeholder="请选择事项">
                    <el-option
                        v-for="(item, i) in matter"
                        :key="item.i"
                        :label="item.title"
                        :value="item.id">
                    </el-option>
                </el-select>
                </el-form-item>
                <el-form-item label="操作时间" prop='opTimes'>
                    <el-date-picker
                      v-model="ruleForm.opTimes"
                      type="datetime"
                      placeholder="选择操作时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="办理结果" prop='results'>
                    <el-input v-model="ruleForm.results"></el-input>
                </el-form-item>
                <el-form-item label="成果附件">
                    <el-upload
                        class="upload-demo"
                        :action="uploadUrl"
                        :on-remove="onRemoveHandle"
                        :headers="{authKey: userInfo.authKey}"
                        :on-success="onSuccessHandle"
                        :file-list="fileList"
                        :limit="1">
                        <el-button type="success" size="small" class='edit-upload-button'>上传</el-button>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注信息">
                    <el-input type="textarea" v-model="ruleForm.remarks" rows="4" resize="none"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button @click="$vDialog.close({type: 'cancel'})">取消</el-button>
                    <el-button type="primary" @click="submitForm('formName')">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import API from '../../../../utils/api'
    import webStorage from 'webStorage'
    import { uploadUrl } from '../../../../utils/const'
    
    export default {
        name: 'log',
        data () {
            return {
                userInfo: webStorage.getItem('userInfo'),
                fileList: [],
                matter: [],               //所有事项
                ruleForm: {
                    recordIds: '',         //事项名称
                    opTimes: '',             //操作时间
                    results: '',           //办理结果
                    attachments: '',       //附件url
                    attachmentNames: '',   //附件名称
                    remarks: '',           //备注信息
                },
                rules: {
                    recordIds: [
                        { required: true, message: '请输入事项名称', trigger: 'blur' },
                    ],
                    opTimes: [
                        { required: true, message: '请选择操作时间', trigger: 'change' },
                    ],
                    results: [
                        { required: true, message: '请输入办理结果', trigger: 'blur' },
                    ],
                },
            }
        },
        computed: {
            uploadUrl () {
                return uploadUrl
            }
        },
        props: ['params'],
        created () {
            this.matter = this.params.serviceItem;
            if(this.params.detail) {
                this.ruleForm.recordIds = this.params.detail.recordId ? this.params.detail.recordId : '';
                this.ruleForm.opTimes = this.params.detail.opTime ? this.params.detail.opTime : '';
                this.ruleForm.results = this.params.detail.result ? this.params.detail.result : '';
                this.ruleForm.attachments = this.params.detail.attachment ? this.params.detail.attachment : '';
                this.ruleForm.attachmentNames = this.params.detail.attachmentName ? this.params.detail.attachmentName : '';
                this.ruleForm.remarks = this.params.detail.remark ? this.params.detail.remark : '';
                // this.fileList.push(this.params.detail.attachment);
            }
        },
        mounted () {},
        methods: {
            submitForm (formName) {
                this.$refs[formName].validate((valid) => {
                  if (valid) {
                      let _form = {
                        recordId: this.ruleForm.recordIds ? this.ruleForm.recordIds : '',
                        opTime: this.ruleForm.opTimes ? this.ruleForm.opTimes : '',
                        result: this.ruleForm.results ? this.ruleForm.results : '',
                        attachment: this.ruleForm.attachments ? this.ruleForm.attachments : '',
                        attachmentName: this.ruleForm.attachmentNames ? this.ruleForm.attachmentNames : '',
                        remark: this.ruleForm.remarks ? this.ruleForm.remarks : '',
                      };
                      if(this.params.detail) {    //编辑
                            // console.log(_form); return;
                          let _params = {
                              id: this.params.detail.id,
                              params: _form,
                          };
                          API.workOrder.editServiceLog(_params, (data) => {
                              if(data.status) {
                                  this.$message.success('修改成功');
                                  this.$vDialog.close({type: 'itemSave'})
                              }
                          })
                      }else {                     //添加
                          API.workOrder.addServiceLog(_form, (data) => {
                              if(data.status && data.data === 1) {
                                  this.$message.success('添加成功');
                                  this.$vDialog.close({type: 'itemSave'})
                              }
                          })
                      }
                  } else {
                    console.log('error submit!!');
                    return false;
                  }
                });
            },
            // 资料成功上传
            onSuccessHandle (response, file, fileList) {
                this.ruleForm.attachments = response.data.url
                this.ruleForm.attachmentNames = response.data.name
            },
            // 删除已上传文件
            onRemoveHandle () {
                this.ruleForm.attachments = '';
                this.ruleForm.attachmentNames = '';
            },
        }
    }
</script>

<style scoped lang="scss">
  @import "../../../../styles/common";
</style>
